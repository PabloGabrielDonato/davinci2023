import { ObjectId } from 'mongodb'
import { getCollection } from '../db.js'

const profileCollection = 'profile'

async function createProfile(account, profile) {
    const profileData = {
        ...profile,
        userName: account.userName,
        _id: new ObjectId(account._id)
    }
    const collection = await getCollection(profileCollection)

    const isExist = await collection.findOne({ _id: new ObjectId(account._id) })

    if (isExist) {
        throw new Error("La cuenta ya tiene un perfil asociado.")
    }

    await collection.insertOne(profileData)
}

async function getProfile(idProfile) {
    const collection = await getCollection(profileCollection)

    const profile = await collection.findOne({ _id: new ObjectId(idProfile) })

    if (!profile) {
        throw new Error('La cuenta no tiene un perfil asociado.')
    }

    return profile
}


export {
    createProfile,
    getProfile
}