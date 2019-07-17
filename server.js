const express = require('express');
const bodyParser = require('body-parser');
const csv = require('csv-parser');
const fs = require('fs');
const multer = require('multer');
const path = require('path');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 5001;

//set storage engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, callback) => {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    checkFileType(file, callback)
  }
}).single('csvfile');

const checkFileType = (file, callback) => {
  //allowed extensions
  const filetypes = /csv/;
  //check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //check mimetype
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return callback(null, true);
  }
  else {
    callback('Error: only csv files are allowed');
  }
}

app.post('/', (req, res) => {
  // console.log('abc', req);
  upload(req, res, (err) => {
    // console.log('req', req)
    if (err) {
      console.log('error');
      res.json({
        error: err
      })
    }
    else {
      console.log('check', req.file);
      let resdata = [];
      fs.createReadStream(req.file.destination + req.file.filename)
        .pipe(csv())
        .on('data', (data) => {
          resdata.push(data);
        })
        .on('end', () => {
          res.json({ response: resdata });
        });
    }
  })
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});