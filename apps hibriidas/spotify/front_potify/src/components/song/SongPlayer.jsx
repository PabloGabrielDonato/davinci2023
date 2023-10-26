import './songPlayer.css'
import { PropTypes } from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSong } from '../../contexts/session.context'


function SongPlayer({song}) {
    const {onSetSong} = useSong()

    
    function onPlay() {
        onSetSong(song)
    }
    return (
        <div className='song-player-container'>
            <button onClick={onPlay}>
                <FontAwesomeIcon icon="fa-solid fa-play"/>
            </button>
        </div>
    )
}

SongPlayer.propTypes = {
    song: PropTypes.object.isRequired,
}

export default SongPlayer