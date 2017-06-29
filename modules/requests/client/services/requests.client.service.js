// Requests service used to communicate Requests REST endpoints
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
