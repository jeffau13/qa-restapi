'use strict';

const express = require('express');
const router = express.Router();

// GET /questions:
router.get('/', (req, res, next) => {
    //Return all questions:
    let testobj = { response: 'You sent a GET request!' };
    res.json(testobj);
});

// POST /questions:
router.post('/', (req, res, next) => {
    //Return all questions:
    let testobj = {
        response: 'You sent a POST request!',
        body: req.body
    };
    res.json(testobj);
});

//GET /question/:id:
router.get('/:id', (req,res,next)=>{
    let testobj = { response: 'You sent a GET request!',
    id: req.params.id

    };
    res.json(testobj);
});

module.exports = router;