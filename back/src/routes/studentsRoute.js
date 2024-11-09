const {Router} = require('express');
const {getLenghtStudents,getStudentsPages, createStudent, deleteStudent} = require('../services/studentsService');
const {validateBody, validateBySid} = require('../middleware/studentsMiddleware')
const routerStudents = Router();


routerStudents.get('/', async (req, res) => {
    try{
        const searchValue = req.query.search ? req.query.search : '';
        const currentPage = req.query.currentPage ? req.query.currentPage : 1;
        const pageSize = req.query.pageSize ? req.query.pageSize : 5;
        const students = await getStudentsPages(searchValue,parseInt(currentPage),parseInt(pageSize));
        res.json(students);
    }catch(err){
        res.sendStatus(500);
        console.error(err);
        throw err;
    }
});

routerStudents.get('/lenghtStudents', async (req, res) => {
    try{
        const lengthStudents = await getLenghtStudents();
        res.json(lengthStudents);
    } catch (err) {
        console.error(`Error in studentsRoute ${err}`)
    }
});


routerStudents.post('/', validateBody, async (req, res) => {
    try{
    const newStudent = await createStudent(req.body);
    res.json(newStudent);
    } catch(err){
        console.error(`Error ${err}`);
        throw err;
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
        console.error(`Error ${err}`);
        throw err;
    }
});


module.exports = routerStudents;