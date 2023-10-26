import bcrypt from 'bcrypt'
import * as db from '../db.js'

const accounts = 'accounts'

async function getAllAccounts() {
    const collection = await db.getCollection(accounts)
    return await collection.find({}).toArray()
}

async function createAccount(account) {
    const collection = await db.getCollection(accounts)
    const accountExist = await collection.findOne({ userName: account.userName })

    if (accountExist) {
        throw new Error('El nombre usuario ya se encuentra en uso.')
    }

    const newAccoutn = {
        ...account
    }

    const salt = await bcrypt.genSalt(10)

    newAccoutn.password = await bcrypt.hash(account.password, salt)

    await collection.insertOne(newAccoutn)
}


async function login(account) {
    const collection = await db.getCollection(accounts)
    const accountExist = await collection.findOne({ userName: account.userName })

    if (!accountExist) {
        throw new Error('El usuario no existe')
    }

    const isMatch = await bcrypt.compare(account.password, accountExist.password)

    if (!isMatch) {
        throw new Error('Password incorrecto')
    }

    return { ...accountExist, password: undefined }
}

async function recuperarPassword(username, newPassword) {
    const collection = await db.getCollection(accounts)
    const accountExist = await collection.findOne({ userName: username })

    if(!accountExist) {
        throw new Error('El usuario no existe')
    }

    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(newPassword, salt)

    await collection.updateOne({userName: username}, {$set:{password: password}})
}

export {
    getAllAccounts,
    createAccount,
    recuperarPassword,
    login
}