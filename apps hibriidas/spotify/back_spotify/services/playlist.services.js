import * as db from '../db.js'
import { ObjectId } from 'mongodb'
import * as songService from './song.sercice.js'

const playlistCollection = db.COLLECTION.PLAYLISTS

async function getAllPlaylists(accountId) {
    const collection = await db.getCollection(playlistCollection)
    const result = await collection.find({ 
        'account._id': accountId
    }).toArray()
    return result
}

async function createPlaylist(playlist){
    const collection = await db.getCollection(playlistCollection)
    const result = await collection.insertOne(playlist)
    return result
}


async function getPlaylistById(id){
    const collection = await db.getCollection(playlistCollection)
    const result = await collection.findOne({ _id: new ObjectId(id) })
    return result
}

async function addSongToPlaylist(playlistId, songId){
    const collectionPlaylist = await db.getCollection(db.COLLECTION.PLAYLISTS)

    const playlist = await getPlaylistById(playlistId)

    const song = await songService.getSongById(songId)
    
    if(playlist.songs.find(s => s.file === song.file)){
        throw new Error('La cancion ya esta en la playlist')
    }
    playlist.songs.push(song)

    await collectionPlaylist.updateOne(
        { _id: new ObjectId(playlistId) },
        { $set: { songs: playlist.songs } }
    )
}

async function deletePlayListById(id){
    const collection = await db.getCollection(playlistCollection)
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    return result
}

async function deleteSongFromPlaylist(playlistId, songId){
    const collectionPlaylist = await db.getCollection(db.COLLECTION.PLAYLISTS)
    const playlist = await getPlaylistById(playlistId)

    let updatedSongs = []
    for(let i = 0; i < playlist.songs.length; i++){
        if(playlist.songs[i]._id != songId){
            updatedSongs.push(playlist.songs[i])
        }
    }
    
    collectionPlaylist.updateOne(
        {_id: new ObjectId(playlistId)},
        {$set: {songs: updatedSongs}}
    )
}

export {
    getAllPlaylists,
    createPlaylist,
    getPlaylistById,
    addSongToPlaylist,
    deletePlayListById,
    deleteSongFromPlaylist,
}