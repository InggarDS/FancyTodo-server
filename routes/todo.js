const router = require('express').Router();
const controller = require('../controllers/todo')

router.get('/', controller.read)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

module.exports = router;