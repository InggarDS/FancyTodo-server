const router = require('express').Router();
const controller = require('../controllers/api')


router.get('/holiday', controller.getCalender)
router.get('/quote', controller.getQuote)
router.get('/wallpaper', controller.getWallpaper)

module.exports = router;