import { useSong } from '../../contexts/session.context'
import Player from './Player'
import './footer.css'

function Footer() {

    const {song} = useSong()
    return(
        <footer className="footer">
            {song && <Player />}
            <p>@copy rigth 2023</p>
        </footer>
    )
}

export default Footer