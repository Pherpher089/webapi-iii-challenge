const express = require('express');
const db = require('./userDb.js');
const postsDb = require('../posts/postDb.js');

const router = express.Router();

router.post('/', validateUser, async (req, res) => {
    const name = req.body.name;

    if(!name) {
        res.status(400).json({message: 'please provide a username.'})
    }

    try {
        const newUser = await db.insert(req.body)
        res.status(201).json({message: `User ${name} has been added to the database successfully.`});
    } catch ({message}) {
        res.status(500).json(message);
    }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
    const id = req.params.id;
    const text = req.body.text;

    if(!id) {
        res.status(401).json({errorMessage: 'Please provide the user id in the request path'});
    }

    if(!text) {
        res.status(401).json({errorMessage: 'No text was provided for the post'})
    }
    
    const post = {
        text: req.body.text,
        user_id: req.params.id
    }

    try {
        const addedPost = await postsDb.insert(post);
        res.status(201).json(addedPost);
    } catch ({message}) {
        res.status(500).json(message);
    }

});

router.get('/', async (req, res) => {
    try {
        const users = await db.get();
        res.status(200).json(users)
    } catch ({message}) {
        res.status(500).json(message)
    }
});

router.get('/:id', validateUserId, async (req, res) => {
    const {id} = req.params;
    if(!id) {
        res.status(401).json({errorMessage: 'Please provide an id as parameter in the request route'})
    }

    try {
        const user = await db.getById(id);
        res.status(200).json(user)
    } catch ({message}) {
        res.status(500).json(message)
    }
});

router.get('/:id/posts', validateUserId, async (req, res) => {
    const {id} = req.params;
    if(!id) {
        res.status(401).json({errorMessage: 'Please provide an id as parameter in the request route'})
    }

    try {
        const user = await db.getUserPosts(id);
        res.status(200).json(user)
    } catch ({message}) {
        res.status(500).json(message)
    } 
});

router.delete('/:id', validateUserId, async (req, res) => {
    const {id} = req.params;
    if(!id) {
        res.status(401).json({errorMessage: 'Please provide an id as parameter in the request route'})
    }

    try {
        const user = await db.remove(id);
        res.status(200).json(user)
    } catch ({message}) {
        res.status(500).json(message)
    } 
});

router.put('/:id', validateUserId, async (req, res) => {
    const id = req.params.id;
    const changes = req.body.changes;
    if(!id) {
        res.status(401).json({errorMessage: 'Please provide an id as parameter in the request route'})
    }

    if(!changes) {
        res.status(401).json({errorMessage: 'No changes were provided'})
    }

    try {
        const user = await db.update(req.params.id, req.body.changes);
        res.status(200).json(user)
    } catch ({message}) {
        res.status(500).json(message)
    } 
})

//custom middleware

function validateUserId(req, res, next) {
    const id = req.params.id;
    if(!id) {
        res.status(400).json({errorMessage: 'No id was provided'})
    }

    db.getById(id)
    .then(user => {
        console.log('ValidateUserID is working');
        res.user = user
    })
    .catch(err =>{
        res.status(400).json({message: "invalid user id"})
    })
    
    next();
};

function validateUser(req, res, next) {
    const name = req.body.name;

    if(!req.body) {
        res.status(400).json({errorMessage: "Missing user data"})
    } else if(!name) {
        res.status(400).json({errorMessage: 'Missing required name field'})
    } else {
        console.log('User is validated')
    }

    next();
};

function validatePost(req, res, next) {
    console.log("running")
    const text = req.body.text;

    if(!req.body) {
        res.status(400).json({errorMessage: "Missing post data"})
    } else if(!text) {
        res.status(400).json({errorMessage: 'Missing required text field'})
    } else {
        console.log('Post is valid')
    }
    
    next();
};

module.exports = router;
