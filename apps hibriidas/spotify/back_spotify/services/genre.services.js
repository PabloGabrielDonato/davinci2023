import * as db from '../db.js'
import { ObjectId } from 'mongodb'

const genreCollection = 'genres'

async function getAllGenres() {
    const collection = await db.getCollection(genreCollection)
    return await collection.find().toArray()
}

async function createGenre(genre){
    const collection = await db.getCollection(genreCollection)
    const result = await collection.insertOne(genre)
    return result
}

async function getGenreById(id){
    const collection = await db.getCollection(genreCollection)
    const result = await collection.findOne({ _id: new ObjectId(id) })
    return result
}

export {
    getAllGenres,
    createGenre,
    getGenreById,
}
