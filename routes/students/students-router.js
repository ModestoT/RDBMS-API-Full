const express = require('express');

const Students = require('./studentsModel.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const students = await Students.get(req.query);
        res.status(200).json(students);
    } catch {
        console.log(error);
        res.status(500).json({ error: "The students information could not be retrieved." });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const student = await Students.getById(req.params.id);

        if(student){
            res.status(200).json(student);
        } else {
            res.status(404).json({ errorMessage: "The student with the specified ID does not exist." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "The student information could not be retrieved." });
    }
})

router.post('/', async (req, res) => {
    try {
        const student = await Students.insert(req.body);

        res.status(201).json(student);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "There was an error while saving the student to the database" });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const updated = await Students.update(req.params.id, req.body);
        if(updated) {
            const updatedStudent = await Students.getById(req.params.id);
            res.status(200).json(updatedStudent);
        } else {
            res.status(404).json({ errorMessage: "The student with the specified ID does not exist." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error updating student' });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const studentId = await Students.remove(req.params.id);

        if(studentId){
            res.status(200).json({ message: 'Student deleted' });
        } else {
            res.status(404).json({ errorMessage: "The student with the specified ID does not exist." });
        }
       
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "The Student could not be removed" });
    }
})

module.exports = router;