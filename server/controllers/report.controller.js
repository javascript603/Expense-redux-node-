import mongoose from 'mongoose';

//import models
import Reports from '../models/report.model';
import Product from '../models/product.model';

export const getList = (req, res) => {
    Reports.find({}).exec((err, reports) => {
        if (err) {
            return res.json({ status: 400, message: 'Invalid Request!' });
        } else {
            return res.json({ status: 200, message: 'Feched reports list successfuly.', reports: reports });
        }
    });
}

export const createReport = (req, res) => {
    if (req.body.id) {
        Reports.findByIdAndUpdate(req.body.id, req.body, function (err, result) {
            if (err) {
                return res.json({ status: 400, message: 'Invalid Request!' });
            }
            Reports.find({}).exec((err, reports) => {
                if (err) {
                    return res.json({ status: 400, message: 'Invalid Request!' });
                } else {
                    return res.json({ status: 200, message: 'Feched reports list successfuly.', reports: reports });
                }
            });
        });
    } else {
        const newReports = new Reports(req.body);
        let products = JSON.parse(req.body.items);
        products.map(product => {
            product.isreported = 1;
            Product.findByIdAndUpdate(product._id, product, function (err, result) {
                if (err) {
                    console.log(err)
                }
            });
        });

        newReports.save((err, report) => {
            if (err) {
                return res.json({ status: 400, message: 'Invalid Request!' });
            }
            Reports.find({}).exec((err, reports) => {
                if (err) {
                    return res.json({ status: 400, message: 'Invalid Request!' });
                } else {
                    return res.json({ status: 200, message: 'Feched reports list successfuly.', reports: reports });
                }
            });
        });
    }
}

export const deleteReport = (req, res) => {
    if (req.body.id) {
        Reports.findById(req.body.id).exec((error, report) => {
            let items = JSON.parse(report.items);
            items.map(item => {
                Product.findByIdAndUpdate(item._id, { isreported: 0 }, function (err, result) {
                    if (err) {
                        console.log(err)
                    }
                });
            });

            Reports.remove({ _id: req.body.id }, function (err, result) {
                if (err) {
                    return res.json({ status: 400, message: 'Invalid Request!' });
                }
                Reports.find({}).exec((err, reports) => {
                    if (err) {
                        return res.json({ status: 400, message: 'Invalid Request!' });
                    } else {
                        return res.json({ status: 200, message: 'Feched reports list successfuly.', reports: reports });
                    }
                });
            });
        });
    } else {
        return res.json({ status: 400, message: 'Invalid Request!' });
    }
}

export const deleteExpenseOfReport = (req, res) => {

    if (!req.body) res.json({ status: 400, message: 'Invalid Request!' });
    if (!req.body.report || !req.body.productid) res.json({ status: 400, message: 'Invalid Request!' });
    let report = JSON.parse(req.body.report)
    let productid = req.body.productid;

    Reports.findByIdAndUpdate(report._id, report, function (err, result) {
        if (err) {
            return res.json({ status: 400, message: 'Invalid Request!' });
        }

        Product.findByIdAndUpdate(productid, { isreported: 0 }, function (err, result) {
            if (err) {
                return res.json({ status: 400, message: 'Invalid Request!' });
            }
        });
        Reports.find({}).exec((err, reports) => {
            if (err) {
                return res.json({ status: 400, message: 'Invalid Request!' });
            } else {
                return res.json({ status: 200, message: 'Feched reports list successfuly.', reports: reports });
            }
        });
    });
}

export const updateReport = (req, res) => {
    if (!req.body) res.json({ status: 400, message: 'Invalid Request!' });
    if (!req.body.report) res.json({ status: 400, message: 'Invalid Request!' });
    let report = JSON.parse(req.body.report)

    Reports.findByIdAndUpdate(report._id, report, function (err, result) {
        if (err) {
            return res.json({ status: 400, message: 'Invalid Request!' });
        }

        Reports.find({}).exec((err, reports) => {
            if (err) {
                return res.json({ status: 400, message: 'Invalid Request!' });
            } else {
                return res.json({ status: 200, message: 'Feched reports list successfuly.', reports: reports });
            }
        });
    });

}

export const setstats = (req, res) => {
    console.log(req.body)
    if (req.body.id) {
        Reports.findByIdAndUpdate(req.body.id, {submited:req.body.stat}, function (err, result) {
            if (err) {
                return res.json({ status: 400, message: 'Invalid Request!' });
            }
            Reports.find({}).exec((err, reports) => {
                if (err) {
                    return res.json({ status: 400, message: 'Invalid Request!' });
                } else {
                    return res.json({ status: 200, message: 'Update status successfully.', reports: reports });
                }
            });
        });
    }
}





