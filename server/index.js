const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const { db } = require('./db');
const routes = require('./routers');

require('dotenv').config();

const DIST_PATH = path.resolve(__dirname, '..', 'client/dist');
const PORT = 8080;

const app = express();

app.use(bodyParser.json())
app.use(express.static(DIST_PATH));

// routers
app.use('/api', routes);

app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_PATH, 'index.html'));
});


app.listen(8080, () => {console.info(`Server listening on 127.0.0.1:${PORT}`)});
