const multer = require('@koa/multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/uploads/images')
    },
    filename: function (req, file, cb) {
      const [name,type] = file.originalname.split(".");
      const filename =  name+Date.now()   
      cb(null, filename + '.' + type)
    }
  })
  
const upload = multer({ storage })
module.exports = upload

