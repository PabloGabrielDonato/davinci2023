import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'
import * as db from '../db.js'

const tokens = 'tokens'

async function createToken(account) {
    const collection = await db.getCollection(tokens)
    const token = jwt.sign(account, 'CLAVE SERCRETA')
    await collection.insertOne({ token, account: new ObjectId(account._id) })
    return token
}

async function verifyToken(token) {

    try {
        const account = jwt.verify(token, 'CLAVE SERCRETA')
        console.log(account)
        const collection = await db.getCollection(tokens)
        const tokenFind = await collection.findOne({ token, account: new ObjectId(account._id) })

        if (!tokenFind) {
            return false
        }

        return account
    }
    catch (err) {
        return false
    }
}

async function removeToken(token, account) {
    const collection = await db.getCollection(tokens)
    return collection.deleteOne({ token, account: new ObjectId(account._id) })
}

export {
    createToken,
    verifyToken,
    removeToken
}