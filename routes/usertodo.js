const router = require('express').Router();
const controller = require('../controllers/usertodo')

router.post('/userTodo', controller.create)

module.exports = controller