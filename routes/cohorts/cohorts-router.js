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
    try {
        const cohort = await Cohorts.getById(req.params.id);

        if(cohort){
            res.status(200).json(cohort);
        } else {
            res.status(404).json({ errorMessage: "The cohort with the specified ID does not exist." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "The cohort information could not be retrieved." });
    }
})

router.get('/students/:id', async (req, res) => {
    try {
        const cohort = await Cohorts.getById(req.params.id);
        
        if(cohort){
            const students = await Cohorts.getCohortsStudents(req.params.id);
            
            if(students.length > 0){
                res.status(200).json(students);
            } else {
                res.status(404).json({ errorMessage: "The cohort has no students" });
            }
        } else {
            res.status(404).json({ errorMessage: 'This cohort does not exist' });
        }
    } catch (error){
        console.log(error);
        res.status(500).json({ error: "The cohort information could not be retrieved." });
    }
})

router.post('/', async (req, res) => {
    try {
        const cohort = await Cohorts.insert(req.body);

        res.status(201).json(cohort);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "There was an error while saving the cohort to the database" });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const updated = await Cohorts.update(req.params.id, req.body);
        if(updated) {
            const updatedCohort = await Cohorts.getById(req.params.id);
            res.status(200).json(updatedCohort);
        } else {
            res.status(404).json({ errorMessage: "The cohort with the specified ID does not exist." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error updating cohort' });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const cohortId = await Cohorts.remove(req.params.id);

        if(cohortId){
            res.status(200).json({ message: 'Cohort deleted' });
        } else {
            res.status(404).json({ errorMessage: "The cohort with the specified ID does not exist." });
        }
       
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "The Cohort could not be removed" });
    }
})

module.exports = router;