const router = require('express').Router();
const todo = require('./todo')
const user = require('./user')
const api = require('./api')
const userTodo = require('./userTodo')

router.use('/todos', todo)
router.use('/user', user)
router.use('/api', api)
router.use('/', userTodo)

module.exports = router;