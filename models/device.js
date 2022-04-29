const mongoose = require('mongoose');
const devicesSchema = new mongoose.Schema({
    deviceName: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: Number
    },
    category: {
        type: String
    },
    quantity: {
        type: Number
    },
    supplierName: {
        type: String
    }
});
module.exports =  mongoose.model( 'devices' , devicesSchema)