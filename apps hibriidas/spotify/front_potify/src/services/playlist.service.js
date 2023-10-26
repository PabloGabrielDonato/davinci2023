import API from './api.service'

async function getAll() {
    return API.call({ uri: 'playlist' })
}

async function getById(playlistId) {
    return API.call({ uri: `playlist/${playlistId}` })
}

async function addSong(playlistId, songId) {
    return API.call({ uri: `playlist/${playlistId}/add/${songId}`, method: 'PUT' })
}

async function removeSong(playlistId, songId) {
    return API.call({ uri: `playlist/${playlistId}/delete/${songId}`, method: 'DELETE' })
}

async function remove(playlistId) {
    return API.call({ uri: `playlist/${playlistId}`, method: 'DELETE' })
}

async function create(playlistName) {
    return API.call({ uri: `playlist`, method: 'POST', body: { name: playlistName } })
}

export {
    getAll,
    getById,
    addSong,
    removeSong,
    remove,
    create
}