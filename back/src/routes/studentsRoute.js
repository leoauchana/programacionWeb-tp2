const {Router} = require('express');
const {getStudents, createStudent, deleteStudent} = require('../services/studentsService');
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

routerStudents.post('/', validateBody, async (req, res) => {
    try{
    const newStudent = await createStudent(req.body);
    res.json(newStudent);
    } catch(err){
        console.error(`Error ${err}`);
    }
});

routerStudents.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const result = await deleteStudent(id);
        if (result) {
            res.sendStatus(204);
            //console.log('estudiante eliminado con exito');
        } else {
            res.sendStatus(404);
            //console.log('el estudiante no existe');
        }
    } catch (err) {
        console.log(`Error ${err}`);
        res.sendStatus(500);
    }
});

routerStudents.put('/', (req, res) => {

});

module.exports = routerStudents;