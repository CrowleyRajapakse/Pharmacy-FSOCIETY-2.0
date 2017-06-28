'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Drug Schema
 */
var RequestSchema = new Schema({

    requestId: {
        type: String,
        default: '',
        required: 'Please fill drug name',
        trim: true
    },
    drugId: {
        type: String,
        default: '',
        required: 'Please enter drugId',
        trim: true
    },

    drugName: {
        type: String,
        default: '',
        required: 'Please enter drug type',
        trim: true
    },
    requestedQuantity: {
        type: String,
        default: '',
        required: 'Please fill drug category',
        trim: true
    },

    availableQuantity: {
        type: String,
        default: '',
        required: 'Please enter batch number',
        trim: true
    },
    date: {
        type: String,
        default: '',
        required: 'Please fill drug category',
        trim: true
    },
    department: {
        type: String,
        default: '',
        required: 'Please enter manufacture date',
        trim: true
    },
    status: {
        type: String,
        default: '',
        required: 'Please enter expiry date',
        trim: true
    },
    approvedQuantity: {
        type: String,
        default: '',
        required: 'Please enter expiry date',
        trim: true
    },

   /* created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }*/
});

mongoose.model('Request', RequestSchema);
