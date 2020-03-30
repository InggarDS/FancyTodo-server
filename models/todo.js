'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize;

  class Todo extends Model {}

  Todo.init({
    title: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : true,
        notEmpty : true
      }
    },
    description: {
      type : DataTypes.STRING,
       allowNull : false,
      validate : {
        notNull : true,
        notEmpty : true
      }
    },
    status: {
      type : DataTypes.STRING,
      validate : {
        checkStatus(value){
          if ( value == '' || value == null){
            throw new Error('status cannot be empty')
          } else if (value.toLowerCase() !== 'on progress' && value.toLowerCase() !== 'done'){
            throw new Error('status undefined !!')
          }
        }
      }
    },
    due_date: {
      type :  DataTypes.DATE,
      validate : {
        checkValidDate(value){
          let currentDate  = new Date();
          let date = new Date(value)
          if (currentDate === date || currentDate > date){
            throw new Error('due_date not valid please check again')
          }
        }
      }
    }
  }, {
    sequelize,
    hooks : {
      beforeCreate : (todo, option) => {
        if (todo.status == '' || todo.status == null)
          todo.status = 'on Progress'
      }
    }

  })

  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};