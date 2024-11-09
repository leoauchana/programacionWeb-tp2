const { Sequelize, Op } = require('sequelize');
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
        const existingStudent = await Students.findOne({
            where:{
                [Sequelize.Op.or]: [
                    { email : student.email },
                    { dni : student.dni }
                ],
                deleted: 0
            }
        });
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
        throw err;
    }
  };

  const deleteBySid = async (sid) => {
    try {
      return await Students.update({deleted: 1},{
        where: {sid: sid}
      });
    } catch (err) {
      console.error(`Error ${err}`);
      throw err;
    }
  };

  const getStudentsPagination = async (search, currentPage, pageSize) => {
    try{
    const offset = ((currentPage -1) * pageSize);
    return await Students.findAndCountAll({
      where:{
        lastName:{
          [Op.substring]: search
        },
        deleted: 0
      },
      limit: pageSize,
      offset
    });
  } catch(err){
    console.error(err);
    throw err;
   }
  }

  const getLenghtAll = async () => {
    try{
      const students =  await Students.findAll({
        where: {
          deleted: 0
        }
      });
      return students.length;
    }catch (err) {
      console.error(`Error in studentsRepository ${err}`)
    }
  }

  module.exports = {
    getAll,
    getById,
    createNewStudent,
    deleteBySid,
    getStudentsPagination,
    getLenghtAll
  }