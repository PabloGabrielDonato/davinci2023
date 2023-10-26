import * as service from '../../services/genre.services.js'

async function getAllGenres(req, res) {
    return service.getAllGenres()
        .then((genres) => {
            res.status(200).json(genres)
        })
        .catch((err) => {
            res.status(400).json({ error: { message: err.message } })
        })
}

async function createGenre(req, res) {
    return service.createGenre(req.body)
        .then((result) => {
            res.status(201).json(result)
        })
        .catch((err) => {
            res.status(400).json({ error: { message: err.message } })
        })

}

export {
    getAllGenres,
    createGenre,
}