let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
let expect = chai.expect();
chai.use(chaiHttp);
//Our parent block
describe('Manager Devices', () => {
    beforeEach((done) => {
        done();
    });

    describe('Route /Devicemanager ', () => {
        it('Kiểm tra trạng thái status (200) của trang quản lý thiết bị', (done) => {
            chai.request(server)
                .get('/DeviceManager/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
    describe('/POST /Devicemanager/add-device ', () => {
        it('Kiem tra post add thiet bi', () => {
            let device = {
                deviceName: "Màn hình máy tính",
                category: "Điện tử",
                quantity: 10,
                price: 100,
                supplierName: "SAMSUNG"
            };
            chai.request(server)
                .post('/DeviceManager/add-device')
                .send(device)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('deviceName').equal(device.deviceName);
                    res.body.device.should.have.property('category').eql(device.category);
                    res.body.device.should.have.property('quantity').eql(device.quantity);
                    res.body.device.should.have.property('price').eql(device.price);
                    res.body.device.should.have.property('supplierName').eql(device.supplierName);
                    
                });
        });
    });
});


