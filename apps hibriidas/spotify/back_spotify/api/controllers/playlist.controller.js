import { playList } from '../../schemas/song.shema.js';
import * as service from '../../services/playlist.services.js'

async function getAllPLayLists(req, res) {
    const accountId = req.account._id
    return service.getAllPlaylists(accountId)
        .then((playLists) => {
            res.status(200).json(playLists)
        })
        .catch((err) => {
            res.status(400).json({ error: { message: err.message } })
        })
}

async function createPlayList(req, res) {
    return service.createPlaylist(req.body)
        .then((result) => {
            res.status(201).json(result)
        })
        .catch((err) => {
            res.status(400).json({ error: { message: err.message } })
        })
}

async function getPlayListById(req, res) {
    return service.getPlaylistById(req.params.playListId)
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            res.status(400).json({ error: { message: err.message } })
        })
}

async function addSongToPlaylist(req, res){
    const playlistId = req.params.playListId
    const songId = req.params.songId
    try{
        await service.addSongToPlaylist(playlistId, songId)
        return res.status(200).json({mensaje:'Cancion agregada a la playlist'})    
    }catch(err){
        return res.status(400).json({error: {message: err.message}})
    }
}

async function deletePlayListById(req, res) {
    return service.deletePlayListById(req.params.playListId)
        .then((result) => {
            res.status(200).json({mensaje:'Playlist eliminada'})
        })
        .catch((err) => {
            res.status(400).json({ error: { message: err.message } })
        })
}

async function deleteSongFromPlaylist(req, res) {
    const playlistId = req.params.playListId
    const songId = req.params.songId

    return service.deleteSongFromPlaylist(playlistId, songId )
        .then((result) => {
            res.status(200).json({mensaje:'Cancion eliminada de la playlist'})
        })
        .catch((err) => {
            res.status(400).json({ error: { message: err.message } })
        })
}

async function updatePlayListById(req, res) {
    return service.updatePlayListById(req.params.id, req.body)
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            res.status(400).json({ error: { message: err.message } })
        })
}    


export {
    getAllPLayLists,
    createPlayList,
    getPlayListById,
    updatePlayListById,
    addSongToPlaylist,
    deletePlayListById,
    deleteSongFromPlaylist
}