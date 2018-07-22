'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
Schema = mongoose.Schema;

let cartItemSchema = new Schema(
    {
        itemId: {
            type: String,
            default: '',
            index: true,
            unique: true
        },
        itemTitle: {
            type: String,
            default: 'default'
        },
        itemShortDescription: {
            type: String,
            default: 'Item Short Description'
        },
        itemLongDescription: {
            type: String,
            default: 'Item Long Description'
        },
        itemCost: {
            type: Number,
            default: 1000,
        },
       
    });

mongoose.model('CartItem',cartItemSchema);