const express = require("express");
const cors = require("cors");
const path = require("path");
const errorMiddleware = require('../middleware/error.middleware');
const userRouter = require('../routes/admin-app/user.route');
const loadRouter = require('../routes/admin-app/load-config.route');
const clientRouter = require('../routes/admin-app/Client.route');
const clientAdressRouter = require('../routes/admin-app/clientAdress.route');
const fullproductRouter = require('../routes/admin-app/fullproduct.route');
const subcategoryRouter = require('../routes/admin-app/subcategory.route');
const categoryRouter = require('../routes/admin-app/category.route');
const bronController = require('../routes/admin-app/bron.route');
const locationRouter = require('../routes/admin-app/location.route');
const sendlocationRouter = require('../routes/admin-app/sendlocation.route');
const HttpException = require('../utils/HttpException.utils');

module.exports = function(app){
        // parse requests of content-type: application/json
        // parses incoming requests with JSON payloads
        app.use(express.json());
        // enabling cors for all requests by using cors middleware
        app.use(cors());
        // Enable pre-flight
        app.options("*", cors());
        app.use(`/api/v1/admin-app/`, userRouter);
        app.use(`/api/v1/admin-app/load_config`, loadRouter);
        app.use(`/api/v1/admin-app/`, clientRouter);
        app.use(`/api/v1/admin-app/`, clientAdressRouter);
        app.use(`/api/v1/admin-app/`, fullproductRouter);
        app.use(`/api/v1/admin-app/`, categoryRouter);
        app.use(`/api/v1/admin-app/`, subcategoryRouter);
        app.use(`/api/v1/admin-app/`, bronController);
        app.use(`/api/v1/admin-app/`, locationRouter);
        app.use(`/api/v1/admin-app/`, sendlocationRouter);

        // 404 error
        app.all('*', (req, res, next) => {
            const err = new HttpException(404, 'Endpoint Not Found');
            next(err);
        });
        
        app.use(errorMiddleware);
}