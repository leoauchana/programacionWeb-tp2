const Students = require('../models/students');

const getStudents = async () => {
    try{
    const students = await Students.getAll();
    return students;
    } catch(err) {
        console.error(err);
    }
}

module.exports = {
    getStudents
}