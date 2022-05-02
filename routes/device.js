const router = require('express').Router()
const deviceController = require('../controllers/device') //kiểu cữ
const {showInfo,upload} =require('../controllers')  // kiểu mới thích xài cái nào xài
// Xử lý giao diện
router.get('/' ,showInfo)
router.get('/find-val-update/:id', deviceController.valUpdate);
// Xử lý chức năng
router.post('/add-device' ,upload.single("txtImage"),deviceController.addDevice)
router.delete('/delete-device/:id/:image' ,deviceController.deleteDevice)
router.put('/update-device/:id',upload.single('editImage'),deviceController.updateDevice)
router.get('/search/:name',deviceController.searchDevice);
module.exports  = router