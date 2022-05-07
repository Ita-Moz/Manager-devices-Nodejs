const device = require('./device');
const login = require('./login');

module.exports = {
    ...device,
    ...login,
}
