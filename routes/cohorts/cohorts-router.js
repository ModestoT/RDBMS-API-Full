const express = require('express');

const Cohorts = require('./cohortsModel.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const cohorts = await Cohorts.get(req.query);
        res.status(200).json(cohorts);
    } catch {
        console.log(error);
        res.status(500).json({ error: "The cohorts information could not be retrieved." });
    }
})

router.get('/:id', async (req, res) => {
    
})

router.get('/students/:id', async (req, res) => {
    
})

router.post('/', async (req, res) => {

})

router.put('/:id', async (req, res) => {

})

router.delete('/:id', async (req, res) => {

})