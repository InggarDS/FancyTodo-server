'use strict';

const { encryptPassword } = require('../helpers/bcrypt')


module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class User extends Model {}

  User.init({
    username: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : true,
        notEmpty : true
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : true,
        notEmpty : true
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : true,
        notEmpty : true,
        isEmail : true
      }
    }
  }, {
    sequelize,
    hooks : {
      beforeCreate : (user, option) => {
        user.password = encryptPassword(user.password)
      }
    }
  })

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};