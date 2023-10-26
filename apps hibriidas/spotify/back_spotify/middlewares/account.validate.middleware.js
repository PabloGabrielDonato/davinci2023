import * as scheme from '../schemas/account.schemas.js'
import * as tokenService from '../services/token.services.js'
import * as playlistService from '../services/playlist.services.js'

async function validateAccount(req, res, next) {
    return scheme.account.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then((account) => {
            req.body = account
            next();
        })
        .catch((err) => {
            res.status(400).json(err)
        })
}


async function validateProfile(req, res, next) {
    const profile = {
        email: req.body.email,
        name: req.body.name,
        avatar: "http://localhost:3000/images/users/" + req.file.filename
    }
    return scheme.profile.validate(profile, { abortEarly: false, stripUnknown: true })
        .then((p) => {
            req.body = p
            next();
        })
        .catch((err) => {
            res.status(400).json(err)
        })
}

async function isOwner(req, res, next){
    if(!req.account) {
        return res.status(401).json({error: {message: 'usuario no autorizado :('}})
    }
    const playListId = req.params.playListId

    playlistService.getPlaylistById(playListId)
    .then((playList) => {
        if(playList && playList.account._id == req.account._id){
            next()
        }else {
            return res.status(401).json({error: {message: 'usuario no autorizado :('}})
        }   
    })
    .catch((err) => {
        return res.status(400).json({error: {message: err.message}})
    })
}


export {
    validateAccount,
    validateProfile,
    isOwner
}