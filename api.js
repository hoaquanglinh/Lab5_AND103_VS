const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const distributor = require('./Distributor');

module.exports = router;

router.get('/', (req, res) => {
    res.send('Vao api Moblie')
})

const uri = 'mongodb+srv://slide3:123@sanphams.9silvsv.mongodb.net/Lab';

router.get('/list',async (req, res) => {
    await mongoose.connect(uri)
    let dis = await distributor.find()
    res.send(dis)
})

router.post('/add', async (req, res) => {
    await mongoose.connect(uri)
    try {
        const newDistributor = new distributor(req.body);
        await newDistributor.save();
        res.status(201).send('Dữ liệu đã được thêm thành công');
    } catch (error) {
        console.error('Lỗi khi thêm dữ liệu:', error);
        res.status(500).send('Đã xảy ra lỗi khi thêm dữ liệu');
    }
});

router.delete('/delete/:id', async (req, res) => {
    await mongoose.connect(uri);
    try {
        let id = req.params.id;
        // let result = await distributor.deleteOne({ _id: id });
        let result = await distributor.findByIdAndDelete(id);

        if (result) {
            res.json({
                "status": 200,
                "messenger": "Xóa thành công",
                "data": result
            });
        } else {
            res.json({
                "status": 400,
                "messenger": "Lỗi, xóa không thành công",
                "data": []
            });
        }
    } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
        res.status(500).send('Lỗi máy chủ nội bộ');
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        await mongoose.connect(uri);

        const id = req.params.id;
        const data = req.body;

        const updateFruit = await distributor.findByIdAndUpdate(id, data, { new: true });

        res.json({
            "status": 200,
            "messenger": "Cập nhật thành công",
            "data": updateFruit
        });
    } catch (error) {
        console.error('Lỗi khi cập nhật sản phẩm:', error);
        res.status(500).send('Lỗi máy chủ nội bộ');
    }
});

router.get('/search', async (req, res) => {
    await mongoose.connect(uri);
    try {
        const tuKhoa = req.query.q; 
       
        const ketQuaTimKiem = await distributor.find({ name: { $regex: new RegExp(tuKhoa, "i") } });

        if (ketQuaTimKiem.length > 0) {
            res.json(ketQuaTimKiem );
        } else if(ketQuaTimKiem.length == 0){
            res.json(distributor.find())
        }else{
            res.json([])
        }
    } catch (error) {
        res.status(500).send('Lỗi máy chủ nội bộ');
    }
});
