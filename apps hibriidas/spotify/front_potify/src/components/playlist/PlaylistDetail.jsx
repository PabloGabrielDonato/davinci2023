import PropTypes from 'prop-types'
import PlaylistListItem from './PlaylistItem'

function PlaylistDetail ({playlist, onDeleteFromPlaylist}) {
    return (
        <div>
            <h2 className='subtitle'>Playlist: {playlist.name}</h2>
            <ul className='container flex'>
                {playlist.songs.map((song, index) => <PlaylistListItem 
                key={index} 
                playListId={playlist._id} 
                onDeleteFromPlaylist={onDeleteFromPlaylist} 
                song={song}
                />
            )}
            </ul>
        </div>
    )
}

PlaylistDetail.propTypes = {
    playlist: PropTypes.object.isRequired,
    onDeleteFromPlaylist: PropTypes.func.isRequired
}

export default PlaylistDetail