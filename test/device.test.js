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
                    res.body.device.should.have.property('deviceName').eql(device.deviceName);
                    res.body.device.should.have.property('category').eql(device.category);
                    res.body.device.should.have.property('quantity').eql(device.quantity);
                    res.body.device.should.have.property('price').eql(device.price);
                    res.body.device.should.have.property('supplierName').eql(device.supplierName);

                });
        });
    });
    //Test Method PUT API
    describe("/update-device/:id -> PUT", () => {
        it("Kiểm tra update thành công", () => {
            // TODO add a model to db then get that id to take this test
            let id = "62760826ee1cba62d87bcbf4"; //Tai nghe 1 (thứ nhì)
            let device = {
                deviceName: "Tai nghe TEST API",
                category: "Phụ kiện",
                price: 300,
                quantity: 999,
                supplierName: "IUH API Company",
            };
            chai
                .request(server)
                .put("/Devicemanager/update-device/" + id)
                .send(device)
                .end((err, res) => {
                    res.should.have.status(202);
                    res.body.should.be.a("object");
                    res.body.pet.should.have
                        .property("deviceName")
                        .eql("Tai nghe TEST API");
                    res.body.device.should.have.property("category").eql("Phụ kiện");
                    res.body.device.should.have.property("price").eql(300);
                    res.body.device.should.have.property("quantity").eql(999);
                    res.body.device.should.have
                        .property("supplierName")
                        .eql("IUH API Company");
                });
        });
    });
    //Test DELETE API
    describe('/delete-device/:id/:image -> DELETE', () => {
        it('Kiểm tra xoá thành công thiết bị', () => {
            // TODO add a model to db then get that id to take this test
            let id = "62760826ee1cba62d87bcbf4";
            chai.request(server)
                .delete('/Devicemanager/delete-device/' + id + "1651902460033-C02.jpg")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id').eql('62760826ee1cba62d87bcbf4');
                });
        });
    });

});
