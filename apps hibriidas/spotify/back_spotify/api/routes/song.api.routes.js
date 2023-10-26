import { Router } from "express";
import * as songController from '../controllers/song.controller.js'
import * as validators from '../../middlewares/song.validate.middlewate.js'
import  uploadMiddleware  from "../../middlewares/uploadSong.middleware.js";



const songsRouter = Router();


songsRouter.get('/', songController.getAllSongs)
songsRouter.get('/:id', songController.getSongById)
songsRouter.post('/',
    uploadMiddleware.fields([
        {name: 'image', maxCount: 1},
        {name: 'song', maxCount: 1}
    ]),
    validators.validateCreateSong // middleware
    , 
     songController.createSong
)


export default songsRouter;