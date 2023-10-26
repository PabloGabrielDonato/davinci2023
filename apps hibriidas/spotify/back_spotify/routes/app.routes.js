import { Router } from "express";
import * as appController from '../controller/app.controller.js'
import * as validator from '../middlewares/song.validate.middlewate.js'
import  uploadMiddleware  from "../middlewares/uploadSong.middleware.js";

const appRouter = Router();

appRouter.get('/', appController.index)
appRouter.get('/song', appController.listSongs)
appRouter.get('/song/create', appController.createSong)
appRouter.post('/song/create', 
    uploadMiddleware.fields(
        [
            {name: 'image', maxCount: 1},
            {name: 'song', maxCount: 1}
        ]
    ),
    [validator.validateCreateSong], 
    appController.storeSong)
    
appRouter.get('/artist', appController.listArtists)
appRouter.get('/artist/create', appController.createArtist)
appRouter.post('/artist/create', [validator.validateArtist], appController.storeArtist)
appRouter.get('/genre', appController.listGenres)
appRouter.get('/genre/create', appController.createGenre)
appRouter.post('/genre/create',[validator.validatGenre], appController.storeGenre)

export default appRouter;