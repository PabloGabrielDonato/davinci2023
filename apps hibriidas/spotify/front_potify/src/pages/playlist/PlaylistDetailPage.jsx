import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as playlistService from '../../services/playlist.service'
import PlaylistDetail from "../../components/playlist/PlaylistDetail";
import { toast } from "react-toastify";


function PlaylistDetailPage() {
    const {id} = useParams()
    const [playlist, setPlaylist] = useState() // inicialmente undefined

    function loadPlaylist(){
        playlistService.getById(id)
            .then(data => {
                setPlaylist(data)
            })
            .catch(error => {
                alert(error.message)
            })
    }

    function onDeleteFromPlaylist(playListId, song){

        playlistService.removeSong(playListId, song._id)
            .then(function(){
                toast.success('Cancion eliminada de la playlist', {theme: 'dark'})
                loadPlaylist()
            })
            .catch(function(error){
                console.log('error', error.message)
                toast.error("Fallo al eliminar", {theme: 'dark'})
            })
    }

    console.log(playlist);
    useEffect(() => {
        loadPlaylist()    
    }, [])

    return (
        <>
        {playlist ?
            <div>
                    {playlist.songs.length > 0? 
                        <PlaylistDetail playlist={playlist} onDeleteFromPlaylist={onDeleteFromPlaylist} />
                        :
                        <p>No hay canciones en la playlist 😵‍💫</p>
                    }
            </div>
            :
            <p>Cargando...</p>
        }
        </>   
    )

}

export default PlaylistDetailPage