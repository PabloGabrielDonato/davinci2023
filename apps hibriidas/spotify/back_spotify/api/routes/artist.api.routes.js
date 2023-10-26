import { Router } from "express";
import * as artistController from '../../api/controllers/artist.controller.js'
import * as validators from '../../middlewares/song.validate.middlewate.js'

const artistRouter = Router();

artistRouter.get('/', artistController.getAllArtists)
    artistRouter.post('/', [validators.validateArtist], artistController.createArtist)

export default artistRouter;