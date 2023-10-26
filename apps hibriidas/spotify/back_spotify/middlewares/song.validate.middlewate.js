import * as songSchema from '../schemas/song.shema.js'
import * as serviceGenre from '../services/genre.services.js'
import * as serviceArtist from '../services/artist.services.js'

const validateConfig = {
    abortEarly: false,
    stripUnknown: true,
}

async function validateCreateSong(req, res, next) {    
    const artist = await serviceArtist.getArtistById(req.body.artistId)
    const genre = await serviceGenre.getGenreById(req.body.genreId)

    if (!artist  || !genre) {
        return res.status(400).json({error: 'Artista o genero no encontrados'}) 
    }else {
        const song = {
            name: req.body.name,
            duration: req.body.duration,
            artist: artist,
            genre: genre,
            file: req.files.song[0].filename,
            image: req.files.image[0].filename
        }
    
        songSchema.song.validate(song, validateConfig)
            .then(function(song){
                req.body = song
                next()
            })
            .catch(function(err){
                return res.status(400).json({error: err})
            })
    }

}

function validateSong(req, res, next) {
    const song = {
        name: req.body.name,
        duration: req.body.duration,
        artist: req.body.artist,
        genre: req.body.genre,
        file: req.file.filename
    }
    songSchema.song.validate(song, validateConfig)
    .then(function(song){
        req.body = song
        next()
    })
    .catch(function(err){
        return res.status(400).json({error: err.message})
    })
}

function validateArtist(req, res, next) {
    songSchema.artist.validate(req.body, validateConfig)
  
    .then(function(artist){
        req.body = artist
        next()
    })
    .catch(function(err){
        return res.status(400).json({error: err.message})
    })
}

function validatGenre(req, res, next) {
    songSchema.genre.validate(req.body, validateConfig)
        .then(function(genre){
            req.body = genre
            next()
        })
        .catch(function(err){
            return res.status(400).json({error: err.errors})
        })
}


export {
    validateSong,
    validateArtist,
    validatGenre,
    validateCreateSong,
}