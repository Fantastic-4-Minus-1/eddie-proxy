require('newrelic');

const express = require('express');
const proxy = require('express-http-proxy');
const morgan = require('morgan');
const path = require('path');
const compression = require('compression');

const app = express();
const port = process.env.PORT || 9999;

app.use(compression());
// app.use(morgan('dev'));

console.log(path.join(__dirname, 'public'))

app.use('/:companyAbbr', express.static(path.join(__dirname, '../public')));

app.get('/api/people-also-bought/:abbrOrId', proxy('http://ec2-54-219-140-91.us-west-1.compute.amazonaws.com'));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});