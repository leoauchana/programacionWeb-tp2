const { Model, DataTypes } = require("sequelize");

class Students extends Model {
  static init = (sequelize) => {
    super.init(
      {
        id: {
          type: DataTypes.NUMBER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        sid: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        dni: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        deleted: {
          type: DataTypes.TINYINT,
          defaultValue: 0,
          values: [0, 1],
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: null,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: null,
        },
      },
      {
        sequelize,
        modelName: "students",
        timestamps: true,
        hooks: {
          beforeCreate: (student) => {
            student.updatedAt = null;
          },
          beforeUpdate: (student) => {
            student.updatedAt = new Date();
          },
        },
      }
    );
    return this;
  };

  static getAll = async () => {
    return await this.findAll({
      where: {
        deleted: 0,
      },
      attributes: {
        exclude: "deleted",
      },
    });
  };

  static getById = async (id) => {
    return await this.findByPk(id, {
      where: {
        deleted: 0,
      },
      attributes: {
        exclude: "deleted",
      },
    });
  };
}

module.exports = Students;
