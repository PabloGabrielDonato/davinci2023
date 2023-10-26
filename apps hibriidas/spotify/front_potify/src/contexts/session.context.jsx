import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom'
import profileService from '../services/profile.service'

// SessionProvider es un componente generado por un context

// creacion  del contexto 
const SessionContext = createContext()


// creacion del componente provider
function SessionProvider({children}){
    const navigate = useNavigate()
    const [profile, setProfile] = useState({})
    const [song, setSong] = useState();

    const onSetSong = useCallback(s => {
        setSong(s)
    }, [])
    
    const onClearSong = useCallback(() => {
        setSong('')
    }, [])

    const onLogout = useCallback(() =>{
        localStorage.removeItem('token')
        navigate('/login', {replace: true})
    }, [navigate])

    const onSetProfile = useCallback((avatar, name, email) => {
        profileService.createProfile(avatar, name, email)
        .then(data => {
            setProfile(data)
        })
        .catch(() => {
            setProfile({})
        })
    },[])

    useEffect(()=>{
        profileService.getCurrent()
        .then(profileFromDatabase =>{
            setProfile(profileFromDatabase)
        })
        .catch(() => {
            setProfile({})
        })
    }, [])

    return (
        // en value cargamos las variables y funciones al context
    <SessionContext.Provider value={{
        profile, 
        onLogout, 
        onSetProfile, 
        onSetSong, 
        onClearSong, 
        song
    }}>
        {children}
    </SessionContext.Provider>
    )
}


// creacion de hooks personalizados
function useProfile(){
    const {profile } = useContext(SessionContext)
    return profile
}

function useLogout(){
    const {onLogout} = useContext(SessionContext)
    return onLogout
}

function useSetProfile() {
    const {onSetProfile} = useContext(SessionContext)
    return onSetProfile
}

function useSession(){
    const {profile, onLogout, onSetProfile} = useContext(SessionContext)
    return {profile, onLogout, onSetProfile}
}

function useSong() {
    const {song, onSetSong, onClearSong} = useContext(SessionContext)
    return {song, onSetSong, onClearSong}
}

export {
    SessionProvider,
    useProfile,
    useLogout,
    useSession,
    useSetProfile,
    useSong
}

export default {
    SessionProvider,
    useProfile,
    useLogout,
    useSession,
    useSong,
}