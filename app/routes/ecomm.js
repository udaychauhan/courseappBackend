const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const cartController = require("./../../app/controllers/cartController");
const appConfig = require("./../../config/appConfig");
const auth = require('./../middlewares/auth');

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/cart`;

    // defining routes.

    //params : authtoken,userId
    app.post(`${baseUrl}/addItemToCart`, cartController.addNewIemToCart);

    //params : authtoken,userId
    app.post(`${baseUrl}/deleteItemFromCart`, cartController.deleteItemFromCart);

    //params : authtoken,userId
    app.post(`${baseUrl}/getCart`, cartController.getCart);
}