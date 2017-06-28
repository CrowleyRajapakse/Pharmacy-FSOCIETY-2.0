// Drugs service used to communicate Drugs REST endpoints
(function () {
  'use strict';

  angular
    .module('drugs')
    .factory('DrugsService', DrugsService);

  DrugsService.$inject = ['$resource'];

  function DrugsService($resource) {
    return $resource('api/drugs/:drugId', {
      drugId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
