'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Mail Schema
 */
var MailSchema = new Schema({
  email: {
    type: String,
    default: '',
    required: 'Please fill senders email',
    trim: true
  },
  subject: {
    type: String,
    default: '',
    required: 'Please fill mail subject',
    trim: true
  },
  message: {
    type: String,
    default: '',
    required: 'Please fill mail message',
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

mongoose.model('Mail', MailSchema);
