const router = require('express').Router();
const todo = require('./todo')
const user = require('./user')
const api = require('./api')

router.use('/todos', todo)
router.use('/user', user)
router.use('/api', api)

module.exports = router;