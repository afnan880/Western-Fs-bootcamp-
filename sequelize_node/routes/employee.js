const Employee = require('../models/employee');
const express = require('express');
const app = express.Router();
 
app.post('/create', async (req, res) => {
 
    if(!req.body.employeeName || !req.body.employeeEmail) {
        return res.status(400).json({ error: 'Employee name and email are required' });
    }
 
    try {
        const employee = await Employee.create(req.body);
        res.status(201).json(employee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


app.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const employee = await Employee.findByPk(id);
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

 module.exports = app; 