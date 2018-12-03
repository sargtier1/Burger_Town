const express = require('express');

const router = express.Router();

const burger = require('../models/burger.js');

// Creates all routes and sets up logic with in routes if neccessary
router.get('/', (req, res) => {
    burger.all((data) =>{
        var hbsObj = {
            burger: data
        };
        console.log(hbsObj);
        res.render('index', hbsObj);
    });
});

// full list of all burgers
router.post('/api/burgers', (req,res) => {
    burger.create([
        "name", "eaten"
    ],
    [
        req.body.name, req.body.eaten
    ], (result) => {
        res.json({ id: result.insertId });
    });
});

router.put('/api/burgers/:id', (req,res) => {
    const condition = 'id = ' + req.params.id;
    console.log('condition', condition);

    burger.update({
        eaten: req.params.eaten
    }, condition, (result) => {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete('/api/burgers/:id', (req, res) => {
    const condition = 'id = ' + req.params.id;
    
    burger.delete(condition, (result) => {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            return res.status(200).end();
        }
    });
});

module.exports = router;

