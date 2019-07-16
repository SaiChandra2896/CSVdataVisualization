const express = require('express');
const bodyParser = require('body-parser');
const csv = require('csv-parser');
const fs = require('fs');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 5001;

app.get('/', (req, res) => {
  let resdata = [];
  fs.createReadStream('./utils/data.csv')
    .pipe(csv())
    .on('data', (data) => {
      resdata.push(data);
    })
    .on('end', () => {
      res.send(resdata)
    });
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});