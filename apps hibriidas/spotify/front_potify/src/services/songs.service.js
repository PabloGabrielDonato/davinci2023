import API from './api.service'

async function getAll() {
    return API.call({ uri: 'song' })
}

async function getById(idSong) {
    return API.call({ uri: `song/${idSong}` })
}


export {
    getAll,
    getById
}