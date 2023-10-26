import * as service from '../../services/artist.services.js'

async function getAllArtists(req, res) {
   return service.getAllArtists()
    .then((artists) => {
        res.status(200).json(artists)
    })
    .catch((err) => {
        res.status(400).json({ error: { message: err.message } })
    })
}

async function createArtist(req, res) {
    return service.createArtist(req.body)
        .then((result) => {
            res.status(201).json(result)
        })
        .catch((err) => {
            res.status(400).json({ error: { message: err.message } })
        })

}

export {
    getAllArtists,
    createArtist,
    
}