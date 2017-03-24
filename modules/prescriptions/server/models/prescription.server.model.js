'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Prescription Schema
 */
var PrescriptionSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Prescription name',
    trim: true
  },
  body: {
    type: String,
    default: '',
    required: 'Please fill Prescription body',
    trim: true
  },
  tags: {
    type: String,
    default: '',
    trim: true
  },
  category: {
    type: String,
    default: '',
    required: 'Please fill Prescription category',
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

mongoose.model('Prescription', PrescriptionSchema);
