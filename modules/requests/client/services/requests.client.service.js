// Prescriptions service used to communicate Prescriptions REST endpoints
(function () {
  'use strict';

  angular
    .module('requests')
    .factory('RequestsService', RequestsService);

  RequestsService.$inject = ['$resource'];

  function RequestsService($resource) {
    return $resource('api/requests/:requestId', {
      requestId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
