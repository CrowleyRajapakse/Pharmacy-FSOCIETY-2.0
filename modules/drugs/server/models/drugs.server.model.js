'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Drug Schema
 */
var DrugSchema = new Schema({
 /* idd: {
   type: Number,
   default: '',
   required: 'Please fill drug id',
   trim: true
   },*/
  name: {
    type: String,
    default: '',
    required: 'Please fill drug name',
    trim: true
  },
  quantity: {
    type: Number,
    default: '',
    trim: true
  },
  //tablet, syrup
  types: {
    type: String,
    default: '',
    required: 'Please enter drug type',
    trim: true
  },
  category: {
    type: String,
    default: '',
    required: 'Please fill drug category',
    trim: true
  },
  price: {
    type: Number,
    default: '',
    trim: true
  },
  batchNo: {
    type: String,
    default: '',
    trim: true
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  manufactureDate: {
    type: Date,
    default: '',
    trim: true
  },
  expireDate: {
    type: Date,
    default: '',
    trim: true
  },
  reorderLevel: {
    type: Number,
    default: '',
    trim: true
  },
  dangerLevel: {
    type: Number,
    default: '',
    trim: true
  },
  dosage: {
    type: Number,
    default: '',
    trim: true
  },
  frequency: {
    type: Number,
    default: '',
    trim: true
  },
  remarks: {
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

mongoose.model('Drug', DrugSchema);
