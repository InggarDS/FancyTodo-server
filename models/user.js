'use strict';

const { encryptPassword } = require('../helpers/bcrypt')
const {OAuth2Client} = require('google-auth-library')


module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class User extends Model {}

  User.init({
    username: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : 'username cannot be null',
        },
        notEmpty : {
          args : true,
          msg : 'username cannot be empty',
        },
        isUnique(value) {
          return User.findOne( { where : {username : value}})
          .then(result => {
            if(result){
              throw new Error('Username already in use !')
            }
          })
        } 
      },
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : 'password cannot be null',
        },
        notEmpty : {
          args : true,
          msg : 'password cannot be empty',
        } 
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : 'email cannot be null',
        },
        notEmpty : {
          args : true,
          msg : 'email cannot be empty',
        },
        isEmail : {
          args : true,
          msg : 'must be in email format'
      }, 
      isUnique(value) {
       return User.findOne( { where : {email : value}})
        .then(result => {
          if(result){
            throw new Error('Email address already in use !')
          }
        })
      } 
    },
  }
},{
    sequelize,
    hooks : {
      beforeCreate : (user, option) => {
        user.password = encryptPassword(user.password)
      }
    }
  
  })

  User.associate = function(models) {
    User.hasMany(models.Todo)
    User.belongsToMany(models.Todo, {through : 'UserTodos'})
  };
  return User;
};