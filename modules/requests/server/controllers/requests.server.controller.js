'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Request = mongoose.model('Request'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Request
 */
exports.create = function(req, res) {
  var request = new Request(req.body);
  request.user = req.user;

  request.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(request);
    }
  });
};

/**
 * Show the current Request
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var request = req.request ? req.request.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  request.isCurrentUserOwner = req.user && request.user && request.user._id.toString() === req.user._id.toString();

  res.jsonp(request);
};

/**
 * Update a Request
 */
exports.update = function(req, res) {
  var request = req.request;

  request = _.extend(request, req.body);

  request.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(request);
    }
  });
};

/**
 * Delete an Request
 */
exports.delete = function(req, res) {
  var request = req.request;

  request.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(request);
    }
  });
};

/**
 * List of Requests
 */
exports.list = function(req, res) {
  Request.find().sort('-created').populate('user', 'displayName').exec(function(err, requests) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(requests);
    }
  });
};

/**
 * Request middleware
 */
exports.requestByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Request is invalid'
    });
  }

  Request.findById(id).populate('user', 'displayName').exec(function (err, request) {
    if (err) {
      return next(err);
    } else if (!request) {
      return res.status(404).send({
        message: 'No Request with that identifier has been found'
      });
    }
    req.request = request;
    next();
  });
};
