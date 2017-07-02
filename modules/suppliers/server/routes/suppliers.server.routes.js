'use strict';

/**
 * Module dependencies
 */
var suppliersPolicy = require('../policies/suppliers.server.policy'),
  suppliers = require('../controllers/suppliers.server.controller');

module.exports = function(app) {
  // Suppliers Routes
  app.route('/api/suppliers').all(suppliersPolicy.isAllowed)
    .get(suppliers.list)
    .post(suppliers.create);

  app.route('/api/suppliers/:supplierId').all(suppliersPolicy.isAllowed)
    .get(suppliers.read)
    .put(suppliers.update)
    .delete(suppliers.delete);

  // Finish by binding the Supplier middleware
  app.param('supplierId', suppliers.supplierByID);
};
