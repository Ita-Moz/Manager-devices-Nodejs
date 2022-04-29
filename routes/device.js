const router = require('express').Router()
const deviceController = require('../controllers/device') //kiểu cữ
const {test} =require('../controllers')  // kiểu mới thích xài cái nào xài

router.get('/' ,test)

module.exports  = router