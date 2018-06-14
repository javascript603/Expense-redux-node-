import mongoose from 'mongoose';

//import models
import Product from '../models/product.model';
import User from '../models/user.model';
const randomWord = require('random-word');

const createProduct = () => {
    const startDate = new Date(2017, 2, 2);
    const endDate = new Date(2017, 3, 3);

    return {
        title: randomWord(),
        amount: Math.floor(Math.random() * 100000),
        category: Math.floor(Math.random() * 3),
        description: randomWord(),
        username: randomWord(),
        isreported: 0
    };
};

const saveImageData = () => {
    for (var i = 0; i <= 30; i++) {
        const newProduct = new Product(createProduct());
        newProduct.save((err, product) => {
            if (err) {
                return "Invalid Request";
            }
        });
    }
}

export const getList = (req, res) => {
    Product.find({}).exec((err, products) => {
        if (err) {
            return res.json({ status: 400, message: 'Invalid Request!' });
        } else {
            if (products.length > 0) {
                return res.json({ status: 200, message: 'Feched products list successfuly.', products: products });
            } else {
                const saveError = saveImageData();
                if (saveError) {
                    return res.json({ status: 400, message: 'Invalid Request!' });
                }
            }
        }
    });
}

export const createExpense = (req, res) => {
    if (req.body.id) {
        Product.findByIdAndUpdate(req.body.id, req.body, function (err, result) {
            if (err) {
                return res.json({ status: 400, message: 'Invalid Request!' });
            }
            Product.find({}).exec((err, products) => {
                if (err) {
                    return res.json({ status: 400, message: 'Invalid Request!' });
                } else {
                    return res.json({ status: 200, message: 'Feched products list successfuly.', products: products });
                }
            });
        });
    } else {
        const newProduct = new Product(req.body);
        newProduct.save((err, product) => {
            if (err) {
                return res.json({ status: 400, message: 'Invalid Request!' });
            }
            Product.find({}).exec((err, products) => {
                if (err) {
                    return res.json({ status: 400, message: 'Invalid Request!' });
                } else {
                    return res.json({ status: 200, message: 'Feched products list successfuly.', products: products });
                }
            });
        });
    }

    
    
}

export const deleteExpense = (req, res) => {
    if (req.body.id) {
        Product.remove({_id:req.body.id}, function (err, result) {
            if (err) {
                return res.json({ status: 400, message: 'Invalid Request!' });
            }
            Product.find({}).exec((err, products) => {
                if (err) {
                    return res.json({ status: 400, message: 'Invalid Request!' });
                } else {
                    return res.json({ status: 200, message: 'Feched products list successfuly.', products: products });
                }
            });
        });
    } else {
        return res.json({ status: 400, message: 'Invalid Request!' });
    }   
}

export const getFilerList = (req,res) => {
    let flag =  req.body.flag;
    let startprice = req.body.startprice;
    let endprice = req.body.endprice;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    var query = '';
    if(flag == "price") {
        query = { amount: { $gt: startprice, $lt: endprice } };
    }else{
        query = { createdAt: { $gt: startdate+"T00:00:00.000Z", $lt: enddate+"T00:00:00.000Z" } };
    }
    if(startdate=='' || startprice==''){
        query = {};
    }

    Product.find( query ).exec((err, products) => {
        if (err) {
            return res.json({ status: 400, message: 'Invalid Request!' });
        } else {
            if (products.length > 0) {
                return res.json({ status: 200, message: 'Feched products list successfuly.', products: products });
            } else {
                const saveError = saveImageData();
                if(saveError){
                    return res.json({ status: 400, message: 'Invalid Request!' });
                }
            }
        }
    });
    
}





