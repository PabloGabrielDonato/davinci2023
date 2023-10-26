import * as service from '../../services/account.services.js'
import * as tokenService from '../../services/token.services.js'
import * as profileService from '../../services/profile.services.js'

async function createAccount(req, res) {
    return service.createAccount(req.body)
        .then(() => {
            res.status(201).json({ message: 'La cuenta fue creado correctamente' })
        })
        .catch((err) => {
            console.log('error', err.message);
            res.status(400).json({ error: { message: err.message } })
        })
}

async function getAllAccounts(req, res) {
    return service.getAllAccounts()
        .then((accounts) => {
            res.status(200).json(accounts)
        })
        .catch((err) => {
            res.status(400).json({ error: { message: err.message } })
        })
}

async function createProfile(req, res) {
    return profileService.createProfile(req.account, req.body)
        .then(() => {
            res.status(201).json({ message: "Perfil actualizado correctamente." })
        })
        .catch((err) => {
            console.log('error', err.message);
            res.status(400).json({ error: { message: err.message } })
        })
}

async function getProfile(req, res) {
    return profileService.getProfile(req.account._id)
        .then((profile) => {
            res.status(200).json(profile)
        })
        .catch((err) => {
            console.log('error', err);
            res.status(400).json({ error: { message: err.message } })
        })
}

async function login(req, res) {
    return service.login(req.body)
        .then(async (account) => {
            return { token: await tokenService.createToken(account), account }
        })
        .then((token) => {
            res.status(200).json(token)
        })
        .catch((err) => {
            console.log('error', err.message);
            res.status(400).json({ error: { message: err.message } })
        })
}

async function logout(req, res) {
    const token = req.headers['auth-token']
    const account = req.account

    return tokenService.removeToken(token, account)
        .then(() => {
            res.status(200).json({ message: 'La cuenta fue cerrada correctamente' })
        })
        .catch((err) => {
            res.status(400).json({ error: { message: err.message } })
        })
}

async function recuperarPassword(req, res) {
    const usuario = req.body.userName
    const newPassword = req.body.newPassword

    service.recuperarPassword(usuario, newPassword)
    .then(() => {
        res.status(200).json({message: 'Password actualizado correctamente'})
    })
    .catch((error) => {
        res.status(400).json({error: {message: error.message}})
    })

}

export {
    getAllAccounts,
    createAccount,
    login,
    logout,
    createProfile,
    recuperarPassword,
    getProfile
}
