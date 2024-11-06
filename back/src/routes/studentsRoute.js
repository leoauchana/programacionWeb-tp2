const {Router} = require('express');
const {getStudents, createStudent, deleteStudent} = require('../services/studentsService');
const {validateBody, validateBySid, validateQuerys} = require('../middleware/studentsMiddleware')
const routerStudents = Router();

routerStudents.get('/', async (req, res) => {
    try{
        const searchValue = req.query.search ? req.query.search : '';
        const currentPage = req.query.currentPage ? req.query.currentPage : 1;
        const pageSize = req.query.pageSize ? req.query.pageSize : 5;
        const students = await getStudentsPages(searchValue, currentPage, pageSize);
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

routerStudents.delete('/:sid', validateBySid, async (req, res) => {
    try {
        const result = await deleteStudent(req.params.sid);
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


module.exports = routerStudents;