// Requires
const express = require('express');
const router = express.Router();
const path = require('path');

// Get index
// router.get('/', function (req, res) {
//     console.log('Request for index');
//     // res.sendFile(path.join(__dirname, '../public/index.html'));
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
//     // "proxy": "http://localhost:4501/",
// });

router.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Exports
module.exports = router;