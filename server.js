/*
 * @Author: Suraj Roy
 * @Date:   30 Jan 2017
 * @Source : https://jsonworld.com/
 * @Topic : Submit form using ajax in nodejs...
 */        

let express =   require("express"),
    multer  =   require('multer'),
    crypto  =   require('crypto'),
    fileExtension = require('file-extension'),
    app     =   express();

    let storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './uploads')
        },
        filename: function (req, file, callback) {
            crypto.pseudoRandomBytes(16, function (err, raw) {
                callback(null, raw.toString('hex') + Date.now() + '.' + fileExtension(file.mimetype));
            });
            
            
        }
    });

let upload = multer({ storage : storage}).single('image');

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.post('/api/form-submit',function(req,res){
    
    upload(req,res,function(err) {
        console.log(req.body,'other form data---');
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

app.listen(3000,function(){
    console.log("App listening on port: 3000");
});