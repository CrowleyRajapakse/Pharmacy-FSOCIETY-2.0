// Suppliers service used to communicate Suppliers REST endpoints
(function () {
  'use strict';

  angular
    .module('suppliers')
    .factory('SuppliersService', SuppliersService);

  SuppliersService.$inject = ['$resource'];

  function SuppliersService($resource) {
    return $resource('api/suppliers/:supplierId', {
      supplierId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
