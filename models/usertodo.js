'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class UserTodo extends Model {}

  UserTodo.init({
    
    UserId: DataTypes.INTEGER,
    TodoId: DataTypes.INTEGER
  }, { sequelize})

 
  UserTodo.associate = function(models) {
    // associations can be defined here
  };
  return UserTodo;
};