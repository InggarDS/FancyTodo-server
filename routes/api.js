const router = require('express').Router();
const controller = require('../controllers/api')


router.get('/calender/:country/:year', controller.getCalender)


module.exports = router;