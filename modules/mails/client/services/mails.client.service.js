// Mails service used to communicate Mails REST endpoints
(function () {
  'use strict';

  angular
    .module('mails')
    .factory('MailsService', MailsService);

  MailsService.$inject = ['$resource'];

  function MailsService($resource) {
    return $resource('api/mails/:mailId', {
      mailId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
