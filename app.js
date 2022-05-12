const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.error("Error ket noi")
    } else {
        console.log("Connect success with MongoDB!!!")
    }
})


//public static
app.use('/public', express.static(__dirname + '/public'));


//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//views engine
app.set('view engine', 'ejs');
app.set('views', "./views");

//router
app.use('/DeviceManager', require('./routes/device'))

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log(`Server listening on PORT http://localhost:${PORT}`);
});

module.exports = app;