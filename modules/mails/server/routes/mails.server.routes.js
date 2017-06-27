'use strict';

/**
 * Module dependencies
 */
var mailsPolicy = require('../policies/mails.server.policy'),
  mails = require('../controllers/mails.server.controller');

module.exports = function(app) {
  // Mails Routes
  app.route('/api/mails').all(mailsPolicy.isAllowed)
    .get(mails.list)
    .post(mails.create);

  app.route('/api/mails/:mailId').all(mailsPolicy.isAllowed)
    .get(mails.read)
    .put(mails.update)
    .delete(mails.delete);

  // Finish by binding the Mail middleware
  app.param('mailId', mails.mailByID);
};
