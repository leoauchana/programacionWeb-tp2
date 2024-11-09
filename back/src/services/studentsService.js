StudentsRepository = require('../repository/studentsRepository');

const getStudents = async () => {
    try{
    const students = await StudentsRepository.getAll();
    return students;
    } catch(err) {
        console.error(err);
        throw err;
    }
};

const createStudent = async (student) => {
    try{
    const newStudent = await StudentsRepository.createNewStudent(student);
    return newStudent;
    } catch(err){
        console.error(`Error ${err}`);
        throw err;
    }
};

const deleteStudent = async (sid) => {
    try {
        const result = await StudentsRepository.deleteBySid(sid);
        return result;
    } catch (err) {
        console.error(`Error ${err}`);
        throw err;
    }
};

const getStudentsPages = async (search, currentPage, pageSize) => {
    try{
        return await StudentsRepository.getStudentsPagination(search, currentPage, pageSize);
    } catch(err){
        console.error("Error in getStudentsPagination:", err);
        throw err;
    }
}

const getLenghtStudents = async () => {
    try{
    const lenghtStudents = StudentsRepository.getLenghtAll();
    return lenghtStudents;
    } catch (err){
        console.error("Error in getStudentsPagination:", err);
        throw err;
    }
}

module.exports = {
    getStudents,
    createStudent,
    deleteStudent,
    getStudentsPages,
    getLenghtStudents
}