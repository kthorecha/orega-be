const User = require('../models/User.model');
const orderController = require('./Order.controller');

module.exports = {
    create: async (req, res) => {
        const formData = req.body;
        const userModel = new User(formData);
        userModel.save().then(data => {
            return res.status(200).json({ status: "success", result: data });
        }).catch(err => {
            return err;
        })
    },
    getAll: async (req, res) => {
        // some code
        await User.find().exec()
        .then(function (data) {
            console.log('data=',data)
            if (data == null) {
                res.send('not found');
            }
            res.status(200).json({status: "success", data: data});
        }).catch(err => {
            res.status(400).send({status: "error",result:"Unable to get data"});
        })
    },
    update: async (req, res) => {
        // some code
        let updateId = req.params.id;
        console.log(updateId);
        if (updateId) {
            // update
            const result = await User.findByIdAndUpdate(updateId, req.body, { new: true}).exec();
            res.send(result);
        } else {
            res.status(400).send({status:"error", result: "Provide an Id to update!"})
        }
    },
    delete: async (req, res) => {
        let deleteId = req.params.id;
        if (deleteId) {
            // code
            const result = await User.findOneAndDelete({
                _id: deleteId
            }).exec();
            res.send(result);
        } else {
            res.status(400).send({status:"error", result: "Provide an Id to delete!"})
        }
    },
    updateNoOfOrders: async (req, res) => {
        await User.find().exec()
        .then(async data => {
            // console.log('data=',data)
            let cArr = [];
            if (data == null) {
               return res.send('not found');
            }
            let count = await orderController.getOrderCountByUserId('609008743fd0461e8c898340');
            console.log(count)
            res.status(200).json({status: "success", data: cArr});
        }).catch(err => {
            res.status(400).send({status: "error",result:"Unable to get data"});
        })
    }
}