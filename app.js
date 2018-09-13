//Requires
const express = require('express');
const fs = require('fs');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const app = express();
require('dotenv').config();

// Port
const port = process.env.PORT ||4501;
// const port = 4501;

// Require Routers
const statsRouter = require('./routes/stats.router')
const matchesRouter = require('./routes/matches.router');
const tableRouter = require('./routes/table.router');
const indexRouter = require('./routes/index.router');

// Used for production build
app.use(express.static('./client/build'));

// Use Routers
app.use('/matches', matchesRouter);
app.use('/stats', statsRouter);
app.use('/table', tableRouter);

// Used for development
app.use('/', indexRouter);

// Listener
app.listen(port, function () {
    console.log('Listening on port', port);
});

// Exports
exports = module.exports = app;