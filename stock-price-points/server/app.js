const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const database = require('../database/index.js');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/:company', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/api/stockPricePoints/:company', (req, res) => {
  const company = req.params.company;
  console.log(company)
  database.Company.find({ companyAbbriev: company }, null, (err, result) => {
    if (err) {
      return console.log('CALLBACK ERROR!');
    } else {
      console.log('reqparams',req.params);
      return res.json(result);
    }
  });
});

app.get('/api/stockPricePoints', (req, res) => {
  // const { id } = req.params;
  // database.Company.find({ _id: id }, null, (err, result) => {
  database.Company.find({}, null, (err, result) => {
    if (err) {
      return console.log('CALLBACK ERROR!');
    }
    console.log(req.params);
    return res.json(result);
  });
});

module.exports = {
  app,
};
