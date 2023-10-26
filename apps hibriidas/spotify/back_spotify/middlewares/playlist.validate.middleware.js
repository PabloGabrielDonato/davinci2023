import * as scheme from '../schemas/song.shema.js'

async function validateCreatePLaylist (req, res, next) {
    const playlist = {
        name: req.body.name,
        account: req.account,
    }

    scheme.playList.validate(playlist, { abortEarly: false, stripUnknown: true })
        .then((playlist) => {
            req.body = playlist
            next();
        })
        .catch((err) => {
            console.log('ERROR', err.message);
            res.status(400).json(err)
        })
}

export {
    validateCreatePLaylist,
}