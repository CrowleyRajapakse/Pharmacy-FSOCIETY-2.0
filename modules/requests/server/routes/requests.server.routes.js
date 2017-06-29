'use strict';

/**
 * Module dependencies
 */
var requestsPolicy = require('../policies/requests.server.policy.js'),
  requests = require('../controllers/requests.server.controller.js');

module.exports = function(app) {
  // Prescriptions Routes
  app.route('/api/requests').all(requestsPolicy.isAllowed)
    .get(requests.list)
    .post(requests.create);

  app.route('/api/requests/:requestId').all(requestsPolicy.isAllowed)
    .get(requests.read)
    .put(requests.update)
    .delete(requests.delete);

  // Finish by binding the Prescription middleware
  app.param('requestId', requests.requestByID);
};
