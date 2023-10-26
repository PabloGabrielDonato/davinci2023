import * as db from '../db.js'
import { ObjectId } from 'mongodb'

const artistColllection = 'artists'

async function getAllArtists() {
    const collection = await db.getCollection(artistColllection)
    return await collection.find().toArray()
} 

async function createArtist(artist){
    const collection = await db.getCollection(artistColllection)
    const result = await collection.insertOne(artist)
    return result
}


async function getArtistById(id){
    const collection = await db.getCollection(artistColllection)
    const result = await collection.findOne({ _id: new ObjectId(id) })
    return result
}

export {
    getAllArtists,
    createArtist,
    getArtistById,
}