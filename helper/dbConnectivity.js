'use strict';

const db = require('../models/index');

const checkDbConnectivity = async (req, res, next) => {
    try {
        await db.sequelize.authenticate()
        next();
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Database connection error' });
    }
}

module.exports = checkDbConnectivity;