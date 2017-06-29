'use strict';

/**
 * Module dependencies
 */
var drugsPolicy = require('../policies/drugs.server.policy'),
  drugs = require('../controllers/drugs.server.controller');

module.exports = function(app) {
  // Drugs Routes

  app.route('/api/drugs').all(drugsPolicy.isAllowed)
    .get(drugs.list)
    .post(drugs.create);

  app.route('/api/drugs/:drugId').all(drugsPolicy.isAllowed)
    .get(drugs.read)
    .put(drugs.update)
    .delete(drugs.delete);

  //request begin
   /* app.route('/api/drugs/requests').all(drugsPolicy.isAllowed)
        .get(drugs.list)
        .post(drugs.create);*/
    //request end


  // Finish by binding the Drug middleware
  app.param('drugId', drugs.drugByID);
};
