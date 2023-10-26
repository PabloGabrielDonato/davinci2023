import { Router } from "express";
import * as genreController from '../controllers/genre.controller.js'
import * as validators from '../../middlewares/song.validate.middlewate.js'

const genreRouter = Router();

genreRouter.get('/', genreController.getAllGenres)
genreRouter.post('/', [validators.validatGenre], genreController.createGenre)

export default genreRouter;