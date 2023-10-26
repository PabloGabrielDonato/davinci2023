function createPage(title, content) {
    let html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <link rel="stylesheet" href="/css/styles.css">
            <title>${title}</title>
        </head>
        <body>
            <nav>
                <a href="/">Inicio</a>
                <a href="/song">Canciones</a>
                <a href="/song/create">Nueva Cancion</a>
                <a href="/artist">Artistas</a>
                <a href="/artist/create">Nuevo Artista</a>
                <a href="/genre">Generos</a>
                <a href="/genre/create">Nuevo Genero</a>
            </nav>
            ${content}
        </body> 
        </html>`
    return html
}

export {
    createPage,
}
