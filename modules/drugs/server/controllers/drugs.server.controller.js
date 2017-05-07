'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Drug = mongoose.model('Drug'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create drug details
 */
exports.create = function(req, res) {
  var drug = new Drug(req.drug);
  drug.user = req.user;

  drug.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(drug);
    }
  });
};

/**
 * Show the current Prescription
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var drug = req.drug ? req.drug.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  drug.isCurrentUserOwner = req.user && drug.user && drug.user._id.toString() === req.user._id.toString();

  res.jsonp(drug);
};

/**
 * Update a Drugs
 */
exports.update = function(req, res) {
  var drug = req.drug;

  drug = _.extend(drug, req.body);

  drug.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(drug);
    }
  });
};

/**
 * Delete an Prescription
 */
exports.delete = function(req, res) {
  var drug = req.drug;

  drug.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(drug);
    }
  });
};

/**
 * List of Prescriptions
 */
exports.list = function(req, res) {
  Drug.find().sort('-created').populate('user', 'displayName').exec(function(err, drugs) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(drugs);
    }
  });
};

/**
 * Drug middleware
 */
exports.drugByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Prescription is invalid'
    });
  }

  Drug.findById(id).populate('user', 'displayName').exec(function (err, durg) {
    if (err) {
      return next(err);
    } else if (!durg) {
      return res.status(404).send({
        message: 'No drug with that identifier has been found'
      });
    }
    req.drug = durg;
    next();
  });
};
