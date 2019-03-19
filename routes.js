'use strict';

const express = require('express');
const router = express.Router();
const Question = require('./models').Question;

//pre fetching qId parameter from db and storing into req.question
router.param("qID", (req, res, next, id) => {
    Question.findById(id, (err, doc) => {
        if (err) return next(err);
        if (!doc) {
            err = new Error('Not found');
            err.status = 404;
            return next(err);
        }
        req.question = doc;
        return next();
    });
})

//fetching and storing aId parameter from db and storing into req.answer
router.param("aID",(req,res,next,id)=>{
   req.answer = req.question.answer.id(id);
   if (!answer) {
    err = new Error('Not found');
    err.status = 404;
    return next(err);
   }
   return next();
});

// GET /questions:
router.get('/', (req, res, next) => {
    Question.find({})
        .sort({ createdAt: -1 })
        .exec((err, questions) => {
            if (err) return next(err);
            //send result to client's request:
            res.json(questions);
        });

});

// POST /questions:
// Route to create questions
router.post('/', (req, res, next) => {
    const question = new Question(req.body);
    question.save((err,question)=>{
        if(err) return next(err);
        //saved successfully
        res.status(201);
    });
    res.json(question);
});

//GET /question/:qID:
router.get('/:qID', (req,res,next)=>{
    res.json(req.question);
});

// POST /questions/:id/answers
// Route for creating an answer
router.post("/:qID/answers", (req, res,next)=>{
	req.question.answers.push(req.body)
	req.question.save((err,question)=>{
        if(err) return next(err);
        res.status(201);
        res.json(question);
    });
});

//PUT /questions/:id/answers/:id
// Edit a specific answer
router.put("/:qID/answers/:aID",(req,res,next)=>{
    req.answer.update(req.body,(err,result)=>{
        if(err) return next(err);
        res.json(result);
    });
});

//DELETE /questions/:id/answers/:id
// DELETE a specific answer
router.delete("/:qID/answers/:aID",(req,res,next)=>{
    req.answer.remove((err)=>{
        req.question.save((err,question)=>{
            if(err) return next(err);
            res.json(question);
        });
    })
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
        req.vote = req.params.dir;
        next();
        }
    },
    
    (req, res, next) => {
        req.answer.vote(req.vote, (err,question)=>{
            if(err) return next(err);
            res.json(question);
        });
        
    });
module.exports = router;