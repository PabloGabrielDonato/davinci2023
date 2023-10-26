import { useState, useEffect } from 'react';
import * as playlistService from '../../services/playlist.service';
import { Link } from 'react-router-dom';
import './PlaylistList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
function PlaylistList() {

    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        playlistService.getAll()
            .then(data => {
                setPlaylists(data)
            })
        }, [])

    function handleDeletePlaylist(id) {
        playlistService.remove(id).then(() => {
            playlistService.getAll()
            .then(data => {
                setPlaylists(data)
                toast.success('Playlist eliminada', {theme: 'dark'})
            })
            .catch(error => {
                toast.error(error.message, {theme: 'dark'})
            })
        })
    }

  return (
    <div>

        {playlists.length === 0? <h2>No hay canciones en la playlist</h2> 
        : 
        <ul className='container flex'>
            {playlists.map(playlist => (
            <li className='card' key={playlist._id}>
                <Link to={'/playlist/' + playlist._id}>{playlist.name}</Link>
                <button onClick={() => {handleDeletePlaylist(playlist._id)}} className='link'><FontAwesomeIcon icon="fa-regular fa-circle-xmark" size="lg" style={{color: "#e25563",}} /> </button> 
            </li>
            ))}
        </ul>
        }
    </div>
  );
}

export default PlaylistList;