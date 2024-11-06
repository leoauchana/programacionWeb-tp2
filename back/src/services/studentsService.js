StudentsRepository = require('../repository/studentsRepository');

const getStudents = async () => {
    try{
    const students = await StudentsRepository.getAll();
    return students;
    } catch(err) {
        console.error(err);
    }
};

const createStudent = async (student) => {
    try{
    const newStudent = await StudentsRepository.createNewStudent(student);
    return newStudent;
    } catch(err){
        console.error(`Error ${err}`);
    }
};

const deleteStudent = async (id) => {
    try {
        const result = await StudentsRepository.deleteById(id);
        return result;
    } catch (err) {
        console.error(`Error ${err}`);
    }
};

module.exports = {
    getStudents,
    createStudent,
    deleteStudent
}