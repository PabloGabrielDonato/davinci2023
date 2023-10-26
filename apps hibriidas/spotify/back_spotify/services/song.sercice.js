import * as db from '../db.js'
import { ObjectId } from 'mongodb'
 

const songColllection = db.COLLECTION.SONGS

async function getAllSongs() {
    const collection = await db.getCollection(songColllection)
    return await collection.find().toArray()
}

async function createSong(song){
    const collection = await db.getCollection(songColllection)
    const result = await collection.insertOne(song)
    return result
}

async function getSongById(id){
    const collection = await db.getCollection(songColllection)
    return await collection.findOne({ _id: new ObjectId(id) })
}

export {
    getAllSongs,
    createSong,
    getSongById,
}