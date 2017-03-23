'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Prescription = mongoose.model('Prescription'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Prescription
 */
exports.create = function(req, res) {
  var prescription = new Prescription(req.body);
  prescription.user = req.user;

  prescription.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(prescription);
    }
  });
};

/**
 * Show the current Prescription
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var prescription = req.prescription ? req.prescription.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  prescription.isCurrentUserOwner = req.user && prescription.user && prescription.user._id.toString() === req.user._id.toString();

  res.jsonp(prescription);
};

/**
 * Update a Prescription
 */
exports.update = function(req, res) {
  var prescription = req.prescription;

  prescription = _.extend(prescription, req.body);

  prescription.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(prescription);
    }
  });
};

/**
 * Delete an Prescription
 */
exports.delete = function(req, res) {
  var prescription = req.prescription;

  prescription.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(prescription);
    }
  });
};

/**
 * List of Prescriptions
 */
exports.list = function(req, res) {
  Prescription.find().sort('-created').populate('user', 'displayName').exec(function(err, prescriptions) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(prescriptions);
    }
  });
};

/**
 * Prescription middleware
 */
exports.prescriptionByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Prescription is invalid'
    });
  }

  Prescription.findById(id).populate('user', 'displayName').exec(function (err, prescription) {
    if (err) {
      return next(err);
    } else if (!prescription) {
      return res.status(404).send({
        message: 'No Prescription with that identifier has been found'
      });
    }
    req.prescription = prescription;
    next();
  });
};
