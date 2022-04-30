const router = require('express').Router()
const deviceController = require('../controllers/device') //kiểu cữ
const {showInfo} =require('../controllers')  // kiểu mới thích xài cái nào xài

// Xử lý giao diện
router.get('/' ,showInfo)
router.get('/find-val-update/:id', deviceController.valUpdate);
// Xử lý chức năng
router.post('/add-device' ,deviceController.addDevice)
router.delete('/delete-device/:id/:image' ,deviceController.deleteDevice)
router.put('/update-device/:id' ,deviceController.updateDevice)
router.get('/search/:name',deviceController.searchDevice);
module.exports  = router