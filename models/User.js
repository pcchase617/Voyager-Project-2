const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    //name this column whatever you want
    name: {
      type: DataTypes.STRING,
      //value in this column is optional (can be nullish)
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      //value in this column is optional (can be nullish)
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      //value in this column is optional (can be nullish)
      allowNull: true,
    },
    passengers: {
      type: DataTypes.INTEGER,
      //value in this column is optional (can be nullish)
      allowNull: true,
    },
  },
  {
    hooks: {
      // //this hook/function will run everytime before a new row is inserted
      // beforeCreate: async (data) => {
      //   //modify the data/payload if you want, hash password, normalize data, etc.
      //   data.column1 = data.column1 + ' WOW!';
      //   //value for column1 will always have 'WOW!' appended to it
      //   return data;
      // },
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
