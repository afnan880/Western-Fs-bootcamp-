const Department = require('../models/department');
const express = require('express');
const app = express.Router();

app.post('/create', async (req, res) => {
    console.log(req.body);
    try {
        const department = await Department.create(req.body);
        res.status(201).json(department);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const departments = await Department.findByPk(id);
        res.status(200).json(departments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const department = await Department.findByPk(id);
        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }
        await department.destroy();
        res.status(200).json({ message: 'Department deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
 
app.put('/:id', async (req, res) => {
    const id = req.params.id;
 
    try {
        const department = await Department.findByPk(id);
        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }
        await department.update(req.body);
        res.status(200).json(department);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = app;