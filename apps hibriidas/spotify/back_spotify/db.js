import { MongoClient } from "mongodb"

// localhost IPv6 IPv4

const client = new MongoClient('mongodb+srv://pablodonato:pablodonato@cluster0.omtjbnh.mongodb.net/spotify?retryWrites=true&w=majority')

async function getDb() {
    await client.connect()
    return client.db("SPOTIFY")
}

async function getCollection(collectionName) {
    return (await getDb()).collection(collectionName)
}

const COLLECTION = {
    SONGS: "songs",
    ARTISTS: "artists",
    GENRES: "genres",
    PLAYLISTS: "playlists",
    ACCOUNTS: "accounts",
    PROFILE: "profile",
    TOKENS: "tokens",
}

export {
    getCollection,
    COLLECTION
}