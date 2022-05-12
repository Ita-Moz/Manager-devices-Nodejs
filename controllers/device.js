const devices = require('../models/device')
var multer = require('multer');

let fs = require('fs')
//multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/image')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fieldNameSize: 300,
        fileSize: 10 * 1024 * 1024, // 10 Mb
    },
    fileFilter: function (req, file, cb) {
        console.log(file);
        cb(null, true)
    }
});


//Hiển thị tất cả các thiết bị
const showInfo = async (req, res) => {
    try {
        const allDevice = await devices.find();
        return res.status(200).render('device', { devices: allDevice });
    }
    catch (err) {
        return err;
    }
}
// Hàm add device
const addDevice = async (req, res) => {
    var name = req.body.txtNameDevice
    devices.create({
        deviceName: name.charAt(0).toUpperCase() + name.slice(1),
        image: req.file.filename,
        category: req.body.txtCategory,
        quantity: req.body.txtQuantity,
        price: req.body.txtPrice,
        supplierName: req.body.txtSupplier,
    })
        .then(() => {
            res.redirect("http://localhost:5000/DeviceManager")
        })
        .catch((err) => {
            console.log(err)
        })
}

// Hàm xử lí xoá sản phẩm và xoá file ảnh của sản phẩm bên server
const deleteDevice = async (req, res) => {
    try {
        await devices.deleteMany({ _id: req.params.id })
        // GỠ FILE TRÊN SERVER
        let path = `./public/image/${req.params.image}`
        fs.unlink(path, await function (err) {
            if (err && err.code == 'ENOENT') {
                // Lỗi tìm không thấy tệp, tệp không tồn tại.
                console.info("File doesn't exist, won't remove it.");
                res.status(200).send()
            } else if (err) {
                // Đã xảy ra lỗi khi xóa tệp
                console.error("Error occurred while trying to remove file");
                res.status(200).send()
            } else {
                console.info(`Đã xoá 1 ảnh trong server`);
            }
        });
        return await res.status(200).send();
    }
    catch (err) {
        return res.status(404).json(err);
    }
}
// Hàm truyền giá trị vào modal
const valUpdate = async (req, res) => {
    try {
        let deviceValUpdate = await devices.findOne({ _id: req.params.id });
        return res.status(200).send(deviceValUpdate)
    }
    catch (err) {
        return err;
    }
}
// Hàm update device
const updateDevice = async (req, res) => {
    var name = req.body.name;
    //test update xem co nhan req.file ko
    if (req.file) {
        const image = req.file.filename;
        devices.image = image;
    } else {
        console.error("Khong hoat dong")
        //test update xem co hoat dong khong
    }

    devices.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            deviceName: name.charAt(0).toUpperCase() + name.slice(1),
            category: req.body.category,
            price: req.body.price,
            quantity: req.body.quantity,
            supplierName: req.body.supplier,
        }
    }, (err, docs) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send();
            console.log("Updated User : ", docs);
        }
    });

}

// Hàm search thiết bị theo Name

const searchDevice = async (req, res) => {
    try {
        let allSearch = await devices.find({ deviceName: { $regex: req.params.name } }).sort('quantity');
        if (allSearch.length == 0) {
            res.send("Thiết bị không tồn tại!!!");
        } else {
            return res.status(200).render('search-device', { list: allSearch });
        }
    }
    catch (err) {
        return err;
    }
}
const filterDevice = async (req, res) => {
    try {
        let price = req.params.price
        let filterDevice
        if (price.trim() === "<=$50") {
            filterDevice = await devices.find({ category: req.params.category, price: { $lte: 50 } });
        } else if (price === "$50 - $100") {
            filterDevice = await devices.find({ category: req.params.category, price: { $gte: 50, $lte: 100 } });
        } else if (price === ">=$100 trở lên") {
            filterDevice = await devices.find({ category: req.params.category, price: { $gt: 100 } });
        } else if (price === "--Choose--") {
            filterDevice = await devices.find({ category: req.params.category});
        }
        if (filterDevice.length == 0) {
            res.send("Thiết bị không tồn tại!!!");
        } else {
            return await res.status(200).render('search-device', { list: filterDevice });
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    showInfo,
    addDevice,
    deleteDevice,
    valUpdate,
    updateDevice,
    searchDevice,
    upload,
    filterDevice
}