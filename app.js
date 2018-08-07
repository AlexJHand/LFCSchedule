//Requires
const express = require('express');
const fs = require('fs');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const app = express();

// Port
const port = 4501;

// Require Routers
const goalsRouter = require('./routes/goals.router')
const matchesRouter = require('./routes/matches.router');
const tableRouter = require('./routes/table.router');
const indexRouter = require('./routes/index.router');
app.use(express.static(path.join(__dirname, './client/build')));

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