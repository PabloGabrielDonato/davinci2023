import PlaylistCreate from "../../components/playlist/PlaylistCreate"
import PlaylistList from "../../components/playlist/PlaylistList"


function PlaylistPage() {
    return (
        <div>
            <h2 className="subtitle">Playlist</h2>
            <PlaylistCreate />
            <PlaylistList />
        </div>
    )
}

export default PlaylistPage