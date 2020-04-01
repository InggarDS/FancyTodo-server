const router = require('express').Router();
const controller = require('../controllers/todo')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.use(authentication)
router.get('/', controller.read)
router.post('/', controller.create)
router.get('/:id', controller.findOne)
router.put('/:id',  authorization, controller.update)
router.delete('/:id', authorization, controller.delete)

module.exports = router;