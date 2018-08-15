// Requires
const express = require('express');
const router = express.Router();
const path = require('path');

// Get index
router.get('/', function (req, res) {
    console.log('Request for index');
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
    // res.sendFile(path.join(__dirname, '../client/build/index.html'));
    // "proxy": "http://localhost:4501/",

    // Used for developement in package.json
    // "start": "concurrently \"npm run server\" \"cd client && npm start\"",

    // Used for production in package.json
    // "start": "npm run server",
    
});

// Exports
module.exports = router;