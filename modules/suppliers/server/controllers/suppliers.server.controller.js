'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Supplier = mongoose.model('Supplier'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Supplier
 */
exports.create = function(req, res) {
  var supplier = new Supplier(req.body);
  supplier.user = req.user;

  supplier.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(supplier);
    }
  });
};

/**
 * Show the current Supplier
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var supplier = req.supplier ? req.supplier.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  supplier.isCurrentUserOwner = req.user && supplier.user && supplier.user._id.toString() === req.user._id.toString();

  res.jsonp(supplier);
};

/**
 * Update a Supplier
 */
exports.update = function(req, res) {
  var supplier = req.supplier;

  supplier = _.extend(supplier, req.body);

  supplier.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(supplier);
    }
  });
};

/**
 * Delete an Supplier
 */
exports.delete = function(req, res) {
  var supplier = req.supplier;

  supplier.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(supplier);
    }
  });
};

/**
 * List of Suppliers
 */
exports.list = function(req, res) {
  Supplier.find().sort('-created').populate('user', 'displayName').exec(function(err, suppliers) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(suppliers);
    }
  });
};

/**
 * Supplier middleware
 */
exports.supplierByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Supplier is invalid'
    });
  }

  Supplier.findById(id).populate('user', 'displayName').exec(function (err, supplier) {
    if (err) {
      return next(err);
    } else if (!supplier) {
      return res.status(404).send({
        message: 'No Supplier with that identifier has been found'
      });
    }
    req.supplier = supplier;
    next();
  });
};
