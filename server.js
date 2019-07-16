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
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage
}).single('csvfile')

app.post('/', (req, res) => {
  console.log('abc', req);
  upload(req, res, (err) => {
    if (err) {
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
          res.send(resdata)
        });
    }
  })
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});