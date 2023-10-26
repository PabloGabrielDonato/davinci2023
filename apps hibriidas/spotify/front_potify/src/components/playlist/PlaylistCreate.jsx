import { useState } from 'react'
import * as playlistService from '../../services/playlist.service'
import './PlaylistCreate.css'
import { toast } from 'react-toastify'

function PlaylistCreate() {
    const [playlistName, setPlaylistName] = useState('')

    function handleOnChange(event) {
        setPlaylistName(event.target.value)
    }

    function handleOnSubmit(event) {
        event.preventDefault()
        playlistService.create(playlistName)
            .then(data => {
                console.log(data)
                window.location.reload()
            })
            .catch(error => {
                console.log(error)
                error.errors.forEach(e => {
                    toast.error(e, {theme: 'dark'})
                })
            })
    }

    return (
        <div className='playlist-create'>
            <form onSubmit={handleOnSubmit}>
                <input type="text" name="playlistName" placeholder="Nombre de la playlist"  onChange={handleOnChange}/>
                <button type="submit">Crear Playlist</button>
            </form>
        </div>
    )
}

export default PlaylistCreate