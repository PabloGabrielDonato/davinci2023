import { Router } from "express";
import * as playlistController from '../controllers/playlist.controller.js'
import * as tokenValidator from '../../middlewares/token.validate.middleware.js'
import * as validators from '../../middlewares/playlist.validate.middleware.js'
import { isOwner } from "../../middlewares/account.validate.middleware.js";


const playListRouter = Router();

playListRouter.post('/',[tokenValidator.tokenVerify, validators.validateCreatePLaylist], playlistController.createPlayList);
playListRouter.put('/:playListId/add/:songId', [tokenValidator.tokenVerify],isOwner, playlistController.addSongToPlaylist);
playListRouter.get('/:playListId', [tokenValidator.tokenVerify],isOwner, playlistController.getPlayListById);
playListRouter.get('/',[tokenValidator.tokenVerify],  playlistController.getAllPLayLists); 
playListRouter.delete('/:playListId/delete/:songId', [tokenValidator.tokenVerify],isOwner, playlistController.deleteSongFromPlaylist);
playListRouter.delete('/:playListId', [tokenValidator.tokenVerify], playlistController.deletePlayListById);

export default playListRouter