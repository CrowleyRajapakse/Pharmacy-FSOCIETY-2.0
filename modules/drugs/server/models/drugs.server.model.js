
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
    required: 'Please enter drug quantity',
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
 /* price: {
    type: Number,
    default: '',
    required: 'Please fill drug price',
    trim: true
  },*/
  batchNo: {
    type: String,
    default: '',
    required: 'Please enter batch number',
    trim: true
  },
  content: {
    type: String,
    default: '',
    required: 'Please fill drug category',
    trim: true
  },
  manufactureDate: {
    type: Date,
    default: '',
    required: 'Please enter manufacture date',
    trim: true
  },
  expireDate: {
    type: Date,
    default: '',
    required: 'Please enter expiry date',
    trim: true
  },
  /*reorderLevel: {
    type: Number,
    default: '',
    required: 'Please enter reorder level',
    trim: true
  },
  dangerLevel: {
    type: Number,
    default: '',
    required: 'Please enter danger level',
    trim: true
  },*/
/*  remarks: {
    type: Number,
    default: '',
    required: 'Please enter remarks',
    trim: true
  },*/
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
