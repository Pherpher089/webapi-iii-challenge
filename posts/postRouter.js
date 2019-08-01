//Imports
const express = require('express');
const db = require('./postDb.js');

//Var declarations
const router = express.Router();

//Route Handelers
router.get('/', async (req, res) => {
    try {
        const posts = await db.get();
        res.status(200).json(posts)
    } catch ({message}) {
        res.status(500).json(message);
    }
});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;