//Requires
const express = require('express');
const fs = require('fs');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const app = express();
require('dotenv').config();

// Port
// const port = process.env.PORT ||4501;
const port = 4501;

// Require Routers
const goalsRouter = require('./routes/goals.router')
const matchesRouter = require('./routes/matches.router');
const tableRouter = require('./routes/table.router');
const indexRouter = require('./routes/index.router');
app.use(express.static(path.join(__dirname, './client/build')));

// app.get('*', (request, response) => {
//     response.sendFile(path.join(__dirname, './client/build/index.html'));
// });

// Use Routers
app.use('/goals', goalsRouter);
app.use('/matches', matchesRouter);
app.use('/table', tableRouter);
app.use('/', indexRouter);

// Listener
app.listen(port, function () {
    console.log('Listening on port', port);
});

// Exports
exports = module.exports = app;