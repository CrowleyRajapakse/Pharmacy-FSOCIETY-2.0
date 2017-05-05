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
  dosage: {
    type: String,
    default: '',
    required: 'Please fill drug dosage',
    trim: true
  },
  frequency: {
    type: String,
    default: '',
    required: 'Please fill drug frequency',
    trim: true
  },
  period: {
    type: String,
    default: '',
    required: 'Please fill drug period',
    trim: true
  },
  quantity: {
    type: Number,
    default: '0',
    required: 'Please fill drug quantity',
    trim: true
  },
  tags: {
    type: String,
    default: '',
    trim: true
  },
  patient: {
    type: String,
    default: '',
    required: 'Please select a Patient',
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
