const {Router} = require('express');
const {getStudents} = require('../services/studentsService');
const {validateBody} = require('../middleware/studentsMiddleware')
const routerStudents = Router();

routerStudents.get('/', async (req, res) => {
    try{
        const students = await getStudents();
        res.json(students);
    }catch(err){
        res.sendStatus(500);
    }
});

routerStudents.post('/', validateBody, (req, res) => {
    
});

routerStudents.delete('/', (req, res) => {

});

routerStudents.put('/', (req, res) => {

});

module.exports = routerStudents;