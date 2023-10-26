import SongListItem from "./SongListItem"
import * as songService from "../../services/songs.service"
import './SongList.css'
import { useCallback, useEffect, useState } from "react"

function SongList(){
    const [songs, setSongs] = useState([])
    const [filter, setFilter] = useState('')

    const songFilter = songs.filter((song)=> song.name.toLowerCase().includes(filter))

    const onChangeFilter = useCallback((event) => {
        setFilter(event.target.value.toLowerCase())
    }, [setFilter])

    // ejercutar la funcion cuando se monta el componente
    useEffect(()=>{
        songService.getAll()
        .then(data =>{
            setSongs(data)
        })
        .catch(err =>{
            console.log(err)
        })
    }, [])


    return (
        <div className='song-list'>
            <form>
                Filtro: <input id="filtro" className='song-list__filter' type='text' onChange={onChangeFilter} value={filter} />
            </form>
            <ul className='container'>
                {songFilter.map(song => <SongListItem key={song._id} song={song}  />) }
            </ul>
        </div>
    )
}


export default SongList