'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize;

  class Todo extends Model {}

  Todo.init({
    title: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : 'title cannot be null'
        },
        notEmpty : {
          args : true,
          msg : 'title cannot be empty'
      }
    }
  },
    description: {
      type : DataTypes.STRING,
       allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : 'description cannot be null'
        },
        notEmpty : {
          args : true,
          msg : 'description cannot be empty'
        }
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
            throw new Error('due date minimum is current date')
          }
        }, 
        isDate : {
          args : true,
          msg : 'must date format'
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
    Todo.belongsTo(models.User)
    Todo.belongsToMany(models.User, {through : 'UserTodos'})
  };
  return Todo;
};