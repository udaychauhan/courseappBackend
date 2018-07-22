const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')
const passwordLib = require('../libs/generatePasswordLib')
const token = require('../libs/tokenLib')
const AuthModel = mongoose.model('Auth')
const nodemailer = require('../libs/nodemailer')

const CartModel = mongoose.model('Cart');
const CartItemModel = mongoose.model('CartItem');

//add new item
//if cart id not given in req make new cart and then add item
//if cart id given then check if cart is present and then add/update item to cart

let addNewIemToCart = (req, res) => {
    //check if cart item cost is a number
    let itemId = req.body.itemId;
    let itemTitle = req.body.itemTitle;
    let itemShortDescription = req.body.itemShortDescription;
    let itemLongDescription = req.body.itemLongDescription;
    let itemCost = req.body.itemCost;

    let cartId = req.body.cartId;

    let parametersAreEmpty = false;

    if (check.isEmpty(itemId) || check.isEmpty(itemTitle)) {
        //item body parameters empty
        parametersAreEmpty = true;
        let apiResponse = response.generate(true, 'Body parameters empty', 403, null);
        res.send(apiResponse);

    }

    if (isNaN(itemCost)) {
        //cost is invalid
        parametersAreEmpty = true;
        let apiResponse = response.generate(true, 'Cost should be of type number', 403, null);
        res.send(apiResponse);
    }

    if (parametersAreEmpty) {
        //don't go further
        return;
    }

    console.log("cart id value is " + req.body.cartId);
    if (check.isEmpty(cartId)) {
        //make a new cart and save items
        //return  resposen with cart
        let newCartModel = new CartModel({
            cartId: shortid.generate(),
            cartItems: [{
                itemId: itemId,
                itemTitle: itemTitle,
                itemShortDescription: itemShortDescription,
                itemCost: itemCost,
                itemLongDescription: itemLongDescription
            }]
        });

        newCartModel.save((err, result) => {
            if (err) {
                logger.error(err.message, 'Cart controller: create new cart', 10)
                let apiResponse = response.generate(true, 'Failed to create new cart', 500, null)
                res.send(apiResponse);
            } else {
                let apiResponse = response.generate(false, 'Cart created and item added created', 200, result);
                res.send(apiResponse);
            }
        })
    } else {
        //see out how this will work, below way looks hectic
        //fetch cart items array , add items to that array  and update cart array pf items
        //return respoe with cart
        let cartItemObject = {
            itemId: itemId,
            itemTitle: itemTitle,
            itemShortDescription: itemShortDescription,
            itemCost: itemCost,
            itemLongDescription: itemLongDescription
        }

        CartModel.findOneAndUpdate({ cartId: cartId }, { $push: { cartItems: cartItemObject } }, (err, result) => {
            if (err) {
                logger.error(err.message, 'Cart controller: create new cart', 10)
                let apiResponse = response.generate(true, 'Failed to update  cart', 500, null)
                res.send(apiResponse);
            } else {

                if (result) {
                    let apiResponse = response.generate(false, 'Cart updated', 200, result);
                    res.send(apiResponse);
                } else {
                    let apiResponse = response.generate(true, 'Cart absent', 200, result);
                    res.send(apiResponse);
                }

            }
        })
    }
}

//delete item
//if cart id present then delete item, else reject
let deleteItemFromCart = (req, res) => {
    let cartId = req.body.cartId;
    let itemId = req.body.itemId;

    if (check.isEmpty(cartId) || check.isEmpty(itemId)) {
        let apiResponse = response.generate(true, 'Body parameters empty', 403, null);
        res.send(apiResponse);
        return;
    }

    CartModel.update({ 'cartId': cartId }, 
    { $pull: { 'cartItems': {  'itemId':{$in : [itemId]} } } },
    {safe:true},
    (err, result) => {
            if (err) {
                logger.error(err.message, 'Cart controller: delete item from cart', 10)
                let apiResponse = response.generate(true, 'Failed to update  cart', 500, null)
                res.send(apiResponse);
            } else {
                if (result) {
                    let apiResponse = response.generate(false, 'Cart updated', 200, result);
                    res.send(apiResponse);
                } else {
                    let apiResponse = response.generate(true, 'Cart absent', 404, result);
                    res.send(apiResponse);
                }

            }
        });
}

//getAllItem
//get all item or cart by cart it
let getCart = (req, res) => {
    let cartId = req.body.cartId;
    if (check.isEmpty(cartId)) {
        let apiResponse = response.generate(true, 'Body parameters empty', 403, null);
        res.send(apiResponse);
        return;
    }

    CartModel.findOne({ cartId: cartId }, (err, result) => {
        if (err) {
            logger.error(err.message, 'Cart controller: get cart', 10)
            let apiResponse = response.generate(true, 'Failed to get  cart', 500, null)
            res.send(apiResponse);
        } else {
            if (!check.isEmpty(result)) {
                let apiResponse = response.generate(false, 'Cart present', 200, result);
                res.send(apiResponse);
            } else {
                let apiResponse = response.generate(true, 'Cart absent', 404, result);
                res.send(apiResponse);
            }
        }
    })
}

//payByCartId
//remove all item from cart and then just put an empty item array to cart
let payByCart = (req, res) => {

}

//--frontend controller to be done by admin exclusively
//Create a static array of json in frontend for items, that;s it

module.exports = {
    addNewIemToCart: addNewIemToCart,
    deleteItemFromCart: deleteItemFromCart,
    getCart: getCart
}