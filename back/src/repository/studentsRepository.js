const { Sequelize } = require('sequelize');
const Students = require('../models/students');

const getAll = async () => {
    return await Students.findAll({
      where: {
        deleted: 0,
      },
      attributes: {
        exclude: "deleted",
      },
    });
  };

  const getById = async (id) => {
    return await Students.findByPk(id, {
      where: {
        deleted: 0,
      },
      attributes: {
        exclude: "deleted",
      },
    });
  };

  const createNewStudent = async (student) => {
    try{
        console.log(student);
        const existingStudent = await Students.findOne({
            where:{
                [Sequelize.Op.or]: [
                    { email : student.email },
                    { dni : student.dni }
                ],
                deleted: 0
            }
        });
        console.log(existingStudent);
        if(existingStudent){
            throw new Error(`Ya existe un estudiante con ese email o dni`);
        }

        const lastStudent = await Students.findOne({
            where:{ deleted: 0},
            order:[['sid','DESC']]
        });

        const newSid = lastStudent ? lastStudent.sid + 1: 1;
        student.sid = newSid;
        student.createdAt = new Date();
        const newStudent = Students.create(student);
        return newStudent;
    } catch(err){
        console.error(`Error ${err}`)
    }
  };

  const deleteById = async (id) => {
    try {
      const student = await Students.findByPk(id);
      if (!student || student.deleted === 1) {
        return null;
      }
      student.deleted = 1;
      await student.save();
      return student;
    } catch (err) {
      console.error(`Error ${err}`);
    }
  };

  module.exports = {
    getAll,
    getById,
    createNewStudent,
    deleteById
  }