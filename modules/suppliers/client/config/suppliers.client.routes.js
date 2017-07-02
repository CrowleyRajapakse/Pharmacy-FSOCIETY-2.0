(function () {
  'use strict';

  angular
    .module('suppliers')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('suppliers', {
        abstract: true,
        url: '/suppliers',
        template: '<ui-view/>'
      })
      .state('suppliers.list', {
        url: '',
        templateUrl: 'modules/suppliers/client/views/list-suppliers.client.view.html',
        controller: 'SuppliersListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Suppliers List'
        }
      })
      .state('suppliers.create', {
        url: '/create',
        templateUrl: 'modules/suppliers/client/views/form-supplier.client.view.html',
        controller: 'SuppliersController',
        controllerAs: 'vm',
        resolve: {
          supplierResolve: newSupplier
        },
        data: {
          roles: ['user', 'admin','chiefPharmacist'],
          pageTitle: 'Suppliers Create'
        }
      })
      .state('suppliers.edit', {
        url: '/:supplierId/edit',
        templateUrl: 'modules/suppliers/client/views/form-supplier.client.view.html',
        controller: 'SuppliersController',
        controllerAs: 'vm',
        resolve: {
          supplierResolve: getSupplier
        },
        data: {
          roles: ['user', 'admin','chiefPharmacist'],
          pageTitle: 'Edit Supplier {{ supplierResolve.name }}'
        }
      })
      .state('suppliers.view', {
        url: '/:supplierId',
        templateUrl: 'modules/suppliers/client/views/view-supplier.client.view.html',
        controller: 'SuppliersController',
        controllerAs: 'vm',
        resolve: {
          supplierResolve: getSupplier
        },
        data: {
          pageTitle: 'Supplier {{ supplierResolve.name }}'
        }
      });
  }

  getSupplier.$inject = ['$stateParams', 'SuppliersService'];

  function getSupplier($stateParams, SuppliersService) {
    return SuppliersService.get({
      supplierId: $stateParams.supplierId
    }).$promise;
  }

  newSupplier.$inject = ['SuppliersService'];

  function newSupplier(SuppliersService) {
    return new SuppliersService();
  }
}());
