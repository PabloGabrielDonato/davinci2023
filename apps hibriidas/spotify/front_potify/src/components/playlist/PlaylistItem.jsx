import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import '../song/SongListItem.css'
import SongPlayer from '../song/SongPlayer'



function PlaylistListItem({playListId, song, onDeleteFromPlaylist}){

    function durationSecondsToMinutes(seconds){
        const minutes = Math.floor(seconds / 60)
        const secondsRest = seconds % 60
        return `${minutes}:${secondsRest}`
    }

    function handleOnDelete(){
        onDeleteFromPlaylist(playListId, song)
    }

    return (
        <li className="card song-list-item">
            <img className='song-image' src={`http://localhost:3000/images/songs/${song.image}`} />
            <div className='song-details'>
                <h3 className='song-name'>{song.name} <span className="song-code">Codigo: {song._id}</span></h3>
                <span className='song-price'>Duracion: {durationSecondsToMinutes(song.duration)}min</span>
                <SongPlayer key={song._id} song={song} />
                <div className='song-actions'>          
                    <Link to={`/songs/${song._id}`} className='song-view'>Detalle</Link>
                    <button className='button eliminar'onClick={handleOnDelete}>Eliminar de la Playlist</button>
                </div>
            </div>
        </li>
    )
}

PlaylistListItem.propTypes = {
    song: PropTypes.object.isRequired,
    playListId: PropTypes.string.isRequired,
    onDeleteFromPlaylist: PropTypes.func.isRequired
}

export default PlaylistListItem