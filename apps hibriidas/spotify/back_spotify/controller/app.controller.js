import * as views from '../views/songs.views.js'
import * as artistService from '../services/artist.services.js'
import * as genreService from '../services/genre.services.js'
import * as songService from '../services/song.sercice.js'


async function index(req, res) {
    return res.send(views.createIndexPage())
}

async function createSong(req, res) {
    const genres = await genreService.getAllGenres()
    const artists = await artistService.getAllArtists()
    return res.send(views.createSongFormPage(genres, artists))
}

async function storeSong(req, res) {
    const song = req.body
    
   return songService.createSong(song)
        .then((result) => {
            res.redirect('/song')
        })
        .catch((error) => {
            res.send( views.createPage('Error', error.message))
        })
}

async function storeArtist(req, res) {
    const artist = {
        name: req.body.name,
        birth: req.body.birth,
        photo: req.body.photo
    }

    return artistService.createArtist(artist)
        .then((result) => {
            res.redirect('/artist')
        })
        .catch((error) => {
            res.send( views.createPage('Error', error.message))
        })
}

async function storeGenre(req, res) {
    const genre = req.body

    return genreService.createGenre(genre)
        .then((result) => {
            res.redirect('/genre')
        })
        .catch((error) => {
            res.send( views.createPage('Error', error.message))
        })
}

async function createArtist(req, res) {
    return res.send(views.createArtistFormPage())
}

async function createGenre(req, res) {
    return res.send(views.createGenreFormPage())
}

async function listSongs(req, res) {
    return songService.getAllSongs()
        .then((songs) => {
            res.send(views.createSongListPage(songs))
        })
        .catch((error) => {
            res.send( views.createPage('Error', error.message))
        })
}

async function listArtists(req, res) {
    return artistService.getAllArtists()
        .then((result) => {
            res.send(views.createArtistListPage(result))
        })
        .catch((error) => {
            res.send( views.createPage('Error', error.message))
        })
}

async function listGenres(req, res) {
    return genreService.getAllGenres()
        .then((result) => {
            res.send(views.createGenreListPage(result))
        })
        .catch((error) => {
            res.send( views.createPage('Error', error.message))
        })
}

export {
    index,
    createSong,
    createArtist,
    createGenre,  
    storeSong,
    storeArtist,
    storeGenre,
    listSongs,
    listArtists,
    listGenres,  
}