const express = require('express');
const path = require('path');

const { db } = require('./db')

const DIST_PATH = path.resolve(__dirname, '..', 'client/dist')
const PORT = 8080;

const app = express();

app.use(express.static(DIST_PATH));

app.listen(8080, () => {console.info(`Server listening on 127.0.0.1:${PORT}`)});
