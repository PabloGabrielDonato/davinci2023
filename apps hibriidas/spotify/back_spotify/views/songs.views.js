import { createPage } from '../pages/utils.js'

function createIndexPage() {
    let html = `
        <header>
            <h1>Spotify</h1>
            <p>Panel de control de Spotify</p>
        </header>
        <div>
            <a class="button" href="/song">Canciones</a>
            <a class="button" href="/song/create">Nueva Cancion</a>
            <a class="button" href="/artist">Artistas</a>
            <a class="button" href="/artist/create">Nuevo Artista</a>
            <a class="button" href="/genre">Generos</a>
            <a class="button" href="/genre/create">Nuevo Genero</a>
        </div>
    `
    return createPage('Spotify', html)
}

function createSongFormPage(genres, artists) {
    let optionsGenre = ''
    for (let i = 0; i < genres.length; i++) {
        optionsGenre += 
        `<option value=${genres[i]._id}>
            ${genres[i].name} <br />
        </option>`
    }

    let optionsArtists = ''
    for (let i = 0; i < artists.length; i++) {
        optionsArtists += 
        `<option value=${artists[i]._id}>
            ${artists[i].name} <br />
        </option>`
    }

    let html = 
    `<h1>Crear cancion</h1>
    <form action="/song/create" method="POST" enctype="multipart/form-data">
        <label>Nombre</label>
        <input type="text" name="name" placeholder="Nombre">
        <label>Duracion</label>
        <input type="number" name="duration" placeholder="Duracion">
        <label>Genero</label>
        <select name="genreId">
        ${optionsGenre}
        </select>
        <label>Artista</label>
        <select name="artistId">
        ${optionsArtists}
        </select>
        <label>Imagen</label>
        <input type="file" name="image" accept="image/jpeg">
        <label>Cancion</label>
        <input type="file" name="song" accept="audio/mp3">
        <button type="submit">Crear</button>
    </form>`

    return createPage('Crear Producto', html)
}

function createSongListPage(songs) {
    let html = '<h1>Lista de Canciones</h1>'
    
    html += '<ul class="container">'
    for (let i = 0; i < songs.length; i++) {
        html += `<li class="card">
                <h2>${songs[i].name}</h2>
                <div style="display:flex; flex-direction:column; align-items: center; gap:16px">
                <img src="/images/songs/${songs[i].image}" alt="tapa de disco">
                <audio controls>
                    <source src="/songs/${songs[i].file}" type="audio/mp3">
                </audio>
                </div>
                <hr/>
                <p>${songs[i].duration}seg</p>
                <p>Genero: ${songs[i].genre.name}</p>
                <p>Artista: ${songs[i].artist.name}</p>
            </li>`
    }
    html += '</ul>'
    return createPage('Canciones', html)
}

function createArtistListPage(artists) {
    let html = '<h1>Lista de Artistas</h1>'
    html += '<ul class="container">'
    for (let i = 0; i < artists.length; i++) {
        html += `<li class="card">${artists[i].name}</li>`
    }
    html += '</ul>'
    return createPage('Artistas', html)
}

function createGenreListPage(genres) {
    let html = '<h1>Lista de Generos</h1>'
    html += '<ul class="container">'
    for (let i = 0; i < genres.length; i++) {
        html += `<li class="card">${genres[i].name}</li>`
    }
    html += '</ul>'
    return createPage('Generos', html)
}

function createArtistFormPage() {
    let html = `
    <h1>Crear Artista</h1>
    <form action="/artist/create" method="POST">
        <input type="text" name="name" placeholder="Nombre">
        <input type="date" name="birth" placeholder="Fecha de nacimiento">
        <input type="text" name="photo" placeholder="imagen.url">
        <button type="submit">Crear</button>
    </form>`
    return createPage('Crear Artista', html)
}

function createGenreFormPage() {
    let html = `
    <h1>Crear Genero</h1>
    <form action="/genre/create" method="POST">
        <input type="text" name="name" placeholder="Nombre">
        <button type="submit">Crear</button>
    </form>`
    return createPage('Crear Genero', html)
}

export {
    createIndexPage,
    createArtistFormPage,
    createGenreFormPage,
    createSongFormPage,
    createSongListPage,
    createArtistListPage,
    createGenreListPage,
    createPage,
}