'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Supplier Schema
 */
var SupplierSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Supplier name',
    trim: true
  },
  email: {
    type: String,
    default: '',
    required: 'Please fill Supplier email',
    trim: true
  },
  contactNo: {
    type: String,
    default: '',
    trim: true
  },
  address: {
    type: String,
    default: '',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Supplier', SupplierSchema);
