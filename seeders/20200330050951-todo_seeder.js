'use strict';


const todos = require('../seed-data/todo.json');

todos.forEach(el => {
    el.createdAt = new Date()
    el.updatedAt = new Date()
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Todos', todos)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Todos', null, {});
  }
};
