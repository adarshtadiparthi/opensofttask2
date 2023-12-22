// routes/route.js
const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.status(201).send('Route for login');
});

router.get('/signup', (req, res) => {
    res.status(201).send('Route for signup');
});

module.exports = router;
