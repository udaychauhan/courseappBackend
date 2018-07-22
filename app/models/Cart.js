'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
Schema = mongoose.Schema;
const cartItemSchema = require('./CartItem');

let cartSchema = new Schema(
    {
        cartId: {
            type: String,
            default: '',
            index: true,
            unique: true
        },
        cartItems:[cartItemSchema],
       
    });

mongoose.model('Cart',cartSchema);
