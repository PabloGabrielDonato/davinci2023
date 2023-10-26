import { Link } from 'react-router-dom'
import * as playlistService from '../../services/playlist.service'
import PropTypes from 'prop-types'
import './SongListItem.css'
import { useEffect, useState } from 'react'
import SongPlayer from './SongPlayer'
import { toast } from 'react-toastify'



function SongListItem({song}){

    const [playlists, setPlaylists] = useState([])
    const [playlistSelected, setPlaylistSelected] = useState()

    function durationSecondsToMinutes(seconds){
        const minutes = Math.floor(seconds / 60)
        const secondsRest = seconds % 60
        return `${minutes}:${secondsRest}`
    }

    useEffect(() => {
        playlistService.getAll()
            .then(data => {
                console.log('playlist', data);
                setPlaylists(data)
                if(data.length > 0){
                    setPlaylistSelected(data[0]._id)
                }
            })
            .catch(error => {
                alert(error.message)
            })
    }, [])
    

    function agregarAplaylist(event) {
        event.preventDefault()
       
        playlistService.addSong(playlistSelected, song._id)
            .then(() => {
                toast.success('Cancion agregada a la playlist 🤟', {theme: 'dark'})
            })
            .catch(error => {
                console.log(error);
                toast.error(`ERROR: 💣${error.error.message}`, {theme: 'dark'})
            })
       
    }

    return <li className="card song-list-item">
            <img className='song-image' src={`http://localhost:3000/images/songs/${song.image}`} />
            <div className='song-details'>
                <h3 className='song-name'>{song.name} <span className="song-code">Codigo: {song._id}</span></h3>
                <span className='song-price'>Duracion: {durationSecondsToMinutes(song.duration)}min</span>
                <SongPlayer key={song._id} song={song} />
                <div className='song-actions'>
                    
                    <form onSubmit={agregarAplaylist}>
                        <select name="playlists" onChange={e => setPlaylistSelected(e.target.value)}>
                            {playlists.map(playlist => (
                            <option 
                                key={playlist._id} 
                                value={playlist._id}
                                >{playlist.name}</option>
                        ))}
                        </select>
                        <button type="submit">Agregar a playlist</button>
                    </form>
                    
                    <Link to={`/songs/${song._id}`} className='song-view'>Detalle</Link>
                </div>
            </div>
        </li>
}

SongListItem.propTypes = {
    song: PropTypes.object.isRequired
}

export default SongListItem