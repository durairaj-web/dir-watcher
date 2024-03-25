'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const checkDbConnectivity = require('./helper/dbConnectivity');
const logger = require('./helper/logMiddleware');
const taskRoute = require('./route/task');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(checkDbConnectivity);
app.use((req, res, next) => {
    let isResponseSent = false;
    const originalSend = res.send;
    res.send = function(data) {
        if (!isResponseSent) {
            logger.info(`${req.method} ${req.url} - ${res.statusCode}`);
            isResponseSent = true;
        }
        originalSend.call(this, data);
    };
    next();
})

app.use('/task', taskRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});