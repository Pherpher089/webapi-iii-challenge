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

router.get('/:id', validatePostId, async (req, res) => {
    const {id} = req.params;

    if(!id) {
        res.status(401).json({errorMessage: "Please provide a user id in the request path."})
    }

    try {
        const posts = await db.getById(id);
        res.status(200).json(posts);
    } catch ({message}) {
        res.status(500).json(message);
    }

});

router.delete('/:id', validatePostId, async (req, res) => {
    const {id} = req.params;

    if(!id) {
        res.status(401).json({errorMessage: "Please provide a post id in the request path."})
    }

    try {
        const deletedPost = await db.remove(id);
        res.status(200).json(deletedPost);
    } catch ({message}) {
        res.status(500).json(message);
    }
});

router.put('/:id', validatePostId, async (req, res) => {
    const {id} = req.params;
    const {text} = req.body;

    if(!id) {
        res.status(401).json({errorMessage: "Please provide a post id in the request path."});
    } 
    if(!text) {
        res.status(401).json({errorMessage: "Please provide the user id and the updated post"});
    }
    
    try {
        const updatedPost = await db.update(req.params.id, req.body);
        res.status(201).json(updatedPost);
    } catch ({message}) {
        res.status(500).json(message);
    }
});

// custom middleware

function validatePostId(req, res, next) {
    const id = db.getById(req.params.id);

    if(!id) {
        res.status(401).json({errorMessage: "This post ID does not exist"})
    }

    next()
};

module.exports = router;