const express = require('express');

const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname,'public')));

app.use('/assets',express.static('public'));

app.use(express.static('public'))
