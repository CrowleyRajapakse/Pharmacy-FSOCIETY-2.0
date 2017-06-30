'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Mail = mongoose.model('Mail'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Mail
 */
exports.create = function(req, res) {
  var mail = new Mail(req.body);
  mail.user = req.user;

  mail.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(mail);
    }
  });
};

/**
 * Show the current Mail
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var mail = req.mail ? req.mail.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  mail.isCurrentUserOwner = req.user && mail.user && mail.user._id.toString() === req.user._id.toString();

  res.jsonp(mail);
};

/**
 * Update a Mail
 */
exports.update = function(req, res) {
  var mail = req.mail;

  mail = _.extend(mail, req.body);

  mail.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(mail);
    }
  });
};

/**
 * Delete an Mail
 */
exports.delete = function(req, res) {
  var mail = req.mail;

  mail.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(mail);
    }
  });
};

/**
 * List of Mails
 */
exports.list = function(req, res) {
  Mail.find().sort('-created').populate('user', 'displayName').exec(function(err, mails) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(mails);
    }
  });
};

/**
 * Mail middleware
 */
exports.mailByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Mail is invalid'
    });
  }

  Mail.findById(id).populate('user', 'displayName').exec(function (err, mail) {
    if (err) {
      return next(err);
    } else if (!mail) {
      return res.status(404).send({
        message: 'No Mail with that identifier has been found'
      });
    }
    req.mail = mail;
    next();
  });
};
