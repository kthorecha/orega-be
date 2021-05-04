const Order = require('../models/Order.model');

module.exports = {
    create: async (req, res) => {
        const formData = req.body;
        const orderModel = new Order(formData);
        orderModel.save().then(data => {
            return res.status(200).json({ status: "success", result: data });
        }).catch(err => {
            return err;
        })
    },
    getAll: async (req, res) => {
        // some code
        await Order.find().exec()
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
        if (updateId) {
            // update
            const result = await Order.findByIdAndUpdate(updateId, req.body, { new: true}).exec();
            res.send(result);
        } else {
            res.status(400).send({status:"error", result: "Provide an Id to update!"})
        }
    },
    delete: async (req, res) => {
        let deleteId = req.params.id;
        if (deleteId) {
            // code
            const result = await Order.findOneAndDelete({
                _id: deleteId
            }).exec();
            res.send(result);
        } else {
            res.status(400).send({status:"error", result: "Provide an Id to delete!"})
        }
    },
    getUserwiseOrders: async (req, res) => {
        await Order.find().populate('userId').exec()
        .then(data => {
            let userRes = {};
            let averageBill = {};
            // This logic should be used when the column noOfOrders has value 0
            data.forEach(element => {
                if (userRes[element.userId._id] && userRes[element.userId._id]['noOfOrders'] > 0) {
                    userRes[element.userId._id]['noOfOrders'] += 1;
                    averageBill[element.userId._id]['averageBillValue'].push(element.subtotal);
                } else {
                    // userRes[element.userId._id]['noOfOrders'] = 1;
                    averageBill[element.userId._id] = { 'averageBillValue' : [element.subtotal] };
                    userRes[element.userId._id] = {'noOfOrders':1, 'name': element.userId.name };
                }
            });
            for (const key in averageBill) {
                // console.log(key, averageBill[key])
                // averageBill[key]['averageBillValue'] = (addArrayNumbers(averageBill[key]['averageBillValue'])/averageBill[key]['averageBillValue'].length).toFixed(0);
                userRes[key]['averageBillValue'] = (addArrayNumbers(averageBill[key]['averageBillValue'])/averageBill[key]['averageBillValue'].length).toFixed(0);
            }
            res.send(userRes)
        })
        .catch(e => {
            console.log(e);
        })
    },
    getOrderCountByUserId: async (id) => {
        await Order.find({'userId': id}).exec()
        .then(data => {
            let countObj = {};
            if (data !== null) {
                // return {count: data.length};
                return countObj['count'] = data.length;
            } else {
                // return {count: 0};
                return countObj['count'] = 0;
            }
        })
        .catch(e => {
            // console.log(e)
            return {count: 0};
        })
    }
}

function addArrayNumbers(arr) {
    let sum = 0;
    arr.forEach(e => {
        sum += e;
    });
    return sum;
}