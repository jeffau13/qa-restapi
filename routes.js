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

//GET /question/:qID:
router.get('/:qID', (req,res,next)=>{
    let testobj = { response: 'You sent a GET request!',
    id: req.params.qID

    };
    res.json(testobj);
});

// POST /questions/:id/answers
// Route for creating an answer
router.post("/:qID/answers", (req, res,next)=>{
	res.json({
		response: "You sent a POST request to /answers",
		questionId: req.params.qID,
		body: req.body
	});
});

//PUT /questions/:id/answers/:id
// Edit a specific answer
router.put("/:qID/answers/:aID",(req,res,next)=>{
    res.json({
        response: "You sent a PUT request to /answers",
        questionId: req.params.qID,
        answerId: req.params.aID,
        body: req.body
    });
});

//DELeTE /questions/:id/answers/:id
// DELETE a specific answer
router.delete("/:qID/answers/:aID",(req,res,next)=>{
    res.json({
        response: "You sent a DELETE request to /answers",
        questionId: req.params.qID,
        answerId: req.params.aID
    });
});

//Post /questions/:id/answers/:aID/vote-up
//POST /questions/:id/answers/:aID/vote-down
// Vote on a specific answer
router.post("/:qID/answers/:aID/vote-:dir",
    //validate vote param
    (req, res, next) => {
        if(req.params.dir.search(/^(up|down)$/)===-1){
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        }else{
        next();
        }
    },
    (req, res, next) => {
        res.json({
            response: "You sent a Post request to vote on /answers",
            questionId: req.params.qID,
            answerId: req.params.aID,
            vote: req.params.dir
        });
    });
module.exports = router;