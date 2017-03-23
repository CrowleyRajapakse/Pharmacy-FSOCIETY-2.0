// Prescriptions service used to communicate Prescriptions REST endpoints
(function () {
  'use strict';

  angular
    .module('prescriptions')
    .factory('PrescriptionsService', PrescriptionsService);

  PrescriptionsService.$inject = ['$resource'];

  function PrescriptionsService($resource) {
    return $resource('api/prescriptions/:prescriptionId', {
      prescriptionId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
