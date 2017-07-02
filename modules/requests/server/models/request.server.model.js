'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  autoIncrement = require('mongoose-auto-increment'),
  Schema = mongoose.Schema;

/**
 * Request Schema
 */
var RequestSchema = new Schema({
  drugCategory: {
    type: String,
    default: '',
    required: 'Please fill Request drug category',
    trim: true
  },
  drugName: {
    type: String,
    default: '',
    required: 'Please fill Request drug name',
    trim: true
  },
  quantity: {
    type: Number,
    default: '',
    required: 'Please fill Request quantity',
    trim: true
  },
  status: {
    type: String,
    default: '',
    required: 'Please fill Request quantity',
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

/*
RequestSchema.plugin(autoIncrement.plugin, {
    model: 'Request',
    field: 'requestId',
    startAt: 0,
    incrementBy: 1
});
*/

/**
 * Hook a pre save method to hash the password
 */
/*
RequestSchema.pre('save', function (next) {
  /*
    if (this.password && this.isModified('password')) {
        this.salt = crypto.randomBytes(16).toString('base64');
        this.password = this.hashPassword(this.password);
    }

    next();
   */
//});

mongoose.model('Request', RequestSchema);
