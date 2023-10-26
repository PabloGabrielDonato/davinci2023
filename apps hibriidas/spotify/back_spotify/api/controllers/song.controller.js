import * as service from '../../services/song.sercice.js'


async function getAllSongs(req, res) {
    return service.getAllSongs()
        .then((songs) => {
            res.status(200).json(songs)
        })
        .catch((err) => {
            res.status(400).json({ error: { message: err.message } })
        })
}

async function getSongById(req, res) {
    const id = req.params.id
    return service.getSongById(id)
        .then(data => {
           res.status(200).json(data) 
        })
        .catch(error => {
            res.status(400).json({error: {message: error.message}})
        })
}

async function createSong(req, res) {
    return service.createSong(req.body)
        .then((result) => {
            res.status(201).json(result)
        })
        .catch((err) => {
            res.status(400).json({ error: { message: err.message } })
        })
}

export {
    getAllSongs,
    createSong,
    getSongById,
}