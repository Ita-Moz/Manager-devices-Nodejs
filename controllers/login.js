const { modelName } = require("../models/device");

const getLoginPage = (req, res) => {
    return res.status(200).render('login');
}

const errorPage = (req, res) => {
    return res.status(500).render('404');
}

module.exports = {
    getLoginPage,
    errorPage
}