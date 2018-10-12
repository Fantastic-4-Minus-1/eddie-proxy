require('newrelic');

const express = require('express');
const proxy = require('express-http-proxy');
const morgan = require('morgan');
const path = require('path');
const compression = require('compression');

const app = express();
const port = process.env.PORT || 3000;

app.use(compression());
app.use(morgan('tiny'));

console.log(path.join(__dirname, 'public'))

app.use('/:abbrOrId', express.static(path.join(__dirname, '../public')));

app.get('/api/people-also-bought/:abbrOrId', proxy('http://ec2-54-219-140-91.us-west-1.compute.amazonaws.com'));

app.get('/api/stockPricePoints/:abbrOrId', proxy('http://ec2-52-53-158-219.us-west-1.compute.amazonaws.com'));

app.get('/api/graph/:abbrOrId', proxy('http://ec2-18-218-247-23.us-east-2.compute.amazonaws.com'));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
