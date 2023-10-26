import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        
        if(file.fieldname === 'image') {
            cb(null, path.join('public/images/songs') )
        }else if(file.fieldname === 'song') {
            cb(null, path.join('public/songs') )
        }
    },
    filename: function (req, file, cb) {
        
        if(file.fieldname === 'image') {
            const uniqueSuffix = Date.now() + '.'+ file.mimetype.split('/')[1]
            cb(null, 'image-' + uniqueSuffix)
        }
        else if(file.fieldname === 'song') {
            const songSufix= Date.now() + '.mp3'
            cb(null, 'song-' + songSufix)    
        }
    }
  })
  
const uploadMiddleware = multer({ storage: storage })

export default uploadMiddleware