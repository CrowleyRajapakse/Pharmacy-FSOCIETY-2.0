'use strict';

/**
 * Module dependencies
 */
var prescriptionsPolicy = require('../policies/prescriptions.server.policy'),
  prescriptions = require('../controllers/prescriptions.server.controller');

module.exports = function(app) {
  // Prescriptions Routes
  app.route('/api/prescriptions').all(prescriptionsPolicy.isAllowed)
    .get(prescriptions.list)
    .post(prescriptions.create);

  app.route('/api/prescriptions/:prescriptionId').all(prescriptionsPolicy.isAllowed)
    .get(prescriptions.read)
    .put(prescriptions.update)
    .delete(prescriptions.delete);

  // Finish by binding the Prescription middleware
  app.param('prescriptionId', prescriptions.prescriptionByID);
};
