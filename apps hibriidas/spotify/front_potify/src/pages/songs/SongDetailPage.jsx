import * as playlistService from "../../services/playlist.service";
import { useEffect, useState } from "react";
import * as songService from "../../services/songs.service";
import { useParams } from "react-router-dom";
import SongPlayer from "../../components/song/SongPlayer";
import "./SongDetailPage.css";

function SongDetailPage() {
  const [song, setSong] = useState({});
  const [playlist, setPlaylist] = useState([]);
  const [playlistIdSelected, setPlaylistIdSelected] = useState("");

  const { idSong } = useParams();

  useEffect(() => {
    playlistService.getAll().then((playlistsData) => {
      setPlaylist(playlistsData);
      if (playlist.length > 0) {
        setPlaylistIdSelected(playlist[0]._id);
      }
    });
    songService.getById(idSong).then((data) => {
      if (data) {
        setSong(data);
      }
    });
  }, []);

  function agregarAplaylist(event) {
    event.preventDefault();
    playlistService
      .addSong(playlistIdSelected, song._id)
      .then(() => {
        alert("Cancion agregada a la playlist");
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  function durationSecondsToMinutes(seconds = 0) {
    const minutes = Math.floor(seconds / 60);
    const secondsRest = seconds % 60;
    return `${minutes}:${secondsRest}`;
  }

  console.table(song);
  return (
    <>
      {song && (
        <div className="detail">
          <header>
            <h3 className="song-name">{song?.name} </h3>
            <p>
              codigo <span className="song-code">{song._id}</span>
            </p>
          </header>
          <div className="song-info">
            <img className="song-info-image" src={`http://localhost:3000/images/songs/${song.image}`} />
            <SongPlayer key={song._id} song={song} />
            <p className="song-info-data">
                Duracion: {durationSecondsToMinutes(song.duration)}min
            </p>
          </div>
          <div className="song-actions">
            <form onSubmit={agregarAplaylist}>
              <select
                name="playlists"
                onChange={(e) => setPlaylistIdSelected(e.target.value)}
              >
                {playlist.map((playlist) => (
                  <option key={playlist._id} value={playlist._id}>
                    {playlist.name}
                  </option>
                ))}
              </select>
              <button type="submit">Agregar a playlist</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default SongDetailPage;
