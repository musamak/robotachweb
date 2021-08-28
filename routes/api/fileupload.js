var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if(file.originalname == "config.json")
        cb(null, 'config')
      else if(file.originalname.substring(0, 10) == "instagram_")
      cb(null, 'public/images/instagram')
      else if(file.originalname.substring(0, 10) == "portfolio_")
      cb(null, 'public/images/portfolio')
      else if(file.originalname.substring(0, 7) == "slider_")
      cb(null, 'public/images/slider/slider-1')
      else if(file.originalname.substring(0, 9) == "pgheader_")
      cb(null, 'public/images/page-titles')
      else if(file.originalname.substring(0, 9) == "complogo_")
      cb(null, 'public/images')
    },        
    filename: (req, file, cb) => {
      if(file.originalname == "config.json")
        cb(null, file.originalname)
      else if(file.originalname.substring(0, 10) == "instagram_")
      cb(null, file.originalname.substring(10, file.originalname.length))
      else if(file.originalname.substring(0, 10) == "portfolio_")
      cb(null, file.originalname.substring(10, file.originalname.length))
      else if(file.originalname.substring(0, 7) == "slider_")
      cb(null, file.originalname.substring(7, file.originalname.length))
      else if(file.originalname.substring(0, 9) == "pgheader_")
      cb(null, file.originalname.substring(9, file.originalname.length))
      else if(file.originalname.substring(0, 9) == "complogo_")
      cb(null, file.originalname.substring(9, file.originalname.length))
    }
});
var upload = multer({storage: storage}).single('xfile');

router.post('/fupload', function(req, res, next) { 
  uname = req.param('uname');
  pwd = req.param('pwd');

  if((uname==req.app.locals.api_user) && (pwd==req.app.locals.api_pwd)){
    try{
    upload(req, res, function(err){
      if(err){
        return next(err);
      }
      res.json({'message': 'File uploaded successfully.'});
    });
  }catch(err) {console.log(err);}
  }
  else res.json({'message': 'File upload failed.'}); 

});


module.exports = router;
