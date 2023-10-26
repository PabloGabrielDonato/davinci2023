import { useEffect } from 'react'
import { useSong } from '../../contexts/session.context'
import './player.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Player = () => {

    useEffect(() => {
        play()
    }, [])
    
    const {song, onClearSong} = useSong()
    
    function play() {
        const player = document.getElementById('player')
        player.play()
    }

    function pause() {
        const player = document.getElementById('player')
        player.pause()
    }


    return (
        <section className='player'>
            <h2>{song.name}</h2>
            <audio src={`http://localhost:3000/songs/${song.file}`}  id="player">

            </audio>
            <menu>
                <button  className="player-button play" onClick={play}><FontAwesomeIcon icon="fa-solid fa-play" /></button>
                <button  className="player-button" onClick={pause}><FontAwesomeIcon icon="fa-solid fa-pause" /></button>
                <button className="player-button" onClick={onClearSong}><FontAwesomeIcon icon="fa-solid fa-stop" /></button>
            </menu>
        </section>
    )
}

export default Player