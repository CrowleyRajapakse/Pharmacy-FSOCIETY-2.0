(function () {
  'use strict';

  angular
    .module('drugs')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('drugs', {
        abstract: true,
        url: '/drugs',
        template: '<ui-view/>'
      })
      .state('drugs.list', {
        url: '',
        templateUrl: 'modules/drugs/client/views/list-drugs.client.view.html',
        controller: 'DrugsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Drugs List'
        }
      })
      .state('drugs.create', {
        url: '/create',
        templateUrl: 'modules/drugs/client/views/form-drug.client.view.html',
        controller: 'DrugsController',
        controllerAs: 'vm',
        resolve: {
          drugResolve: newDrug
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Drugs Create'
        }
      })
      .state('drugs.edit', {
        url: '/:drugId/edit',
        templateUrl: 'modules/drugs/client/views/form-drug.client.view.html',
        controller: 'DrugsController',
        controllerAs: 'vm',
        resolve: {
          drugResolve: getDrug
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Drug {{ drugResolve.name }}'
        }
      })
      .state('drugs.view', {
        url: '/:drugId',
        templateUrl: 'modules/drugs/client/views/view-drug.client.view.html',
        controller: 'DrugsController',
        controllerAs: 'vm',
        resolve: {
          drugResolve: getDrug
        },
        data: {
          pageTitle: 'Drug {{ drugResolve.name }}'
        }
      });
  }

  getDrug.$inject = ['$stateParams', 'DrugsService'];

  function getDrug($stateParams, DrugsService) {
    return DrugsService.get({
      drugId: $stateParams.drugId
    }).$promise;
  }

  newDrug.$inject = ['DrugsService'];

  function newDrug(DrugsService) {
    return new DrugsService();
  }
}());
