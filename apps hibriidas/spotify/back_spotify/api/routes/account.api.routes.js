import { Router } from "express"
import * as controller from '../controllers/account.controllers.js'
import * as validate from '../../middlewares/account.validate.middleware.js'
import { tokenVerify } from '../../middlewares/token.validate.middleware.js'
import multer from "multer"
import path from "path"


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join('public/images/users') )
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '.jpg'
      cb(null, 'avatar-' + uniqueSuffix)
    }
  })
  
const uploadAvatar = multer({ storage: storage })

const router = Router()
router.get('/all', controller.getAllAccounts)
// registrarse
// /account/regiter
router.post('/account', [validate.validateAccount], controller.createAccount)

router.get('/profile', [tokenVerify], controller.getProfile)
router.post('/profile',uploadAvatar.single("avatar"), [tokenVerify, validate.validateProfile], controller.createProfile)


// autentificar un usuario
router.post('/session', [validate.validateAccount], controller.login)
router.delete('/session', [tokenVerify], controller.logout)
router.post('/recuperar/password', controller.recuperarPassword)

/// TOKEN


export default router