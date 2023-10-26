 import express from 'express'
import AccountRoute from './api/routes/account.api.routes.js'
import cors from 'cors'
import songsRouter from './api/routes/song.api.routes.js'
import artistRouter from './api/routes/artist.api.routes.js'
import genreRouter from './api/routes/genre.api.routes.js'
import playListRouter from './api/routes/playlist.api.routes.js'
import appRouter from './routes/app.routes.js'
import {join} from 'path'

const app = express() // el server
app.use(cors()); // por defecto para que cualquiera pueda acceder al api

app.use(express.urlencoded({ extended: true })) // para poder leer el body de las solicitudes POST de un formulario
app.use('/api', express.json()) // interpreta el body como JSON

app.use(express.static(join(process.cwd(), 'public')))

// grupo de rutas
app.use('/', appRouter)
app.use('/api/song', songsRouter)
app.use('/api', AccountRoute)
app.use('/api/artist', artistRouter)
app.use('/api/genre', genreRouter)
app.use('/api/playlist', playListRouter)

const port = 3000

app.listen(port, function () {
    console.log('Servidor levantado! http://localhost:' + port)
})
