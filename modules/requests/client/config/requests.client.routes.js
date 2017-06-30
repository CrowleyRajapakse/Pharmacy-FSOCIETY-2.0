(function () {
  'use strict';

  angular
    .module('requests')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('requests', {
        abstract: true,
        url: '/requests',
        template: '<ui-view/>'
      })
      .state('requests.list', {
        url: '',
        templateUrl: 'modules/requests/client/views/list-requests.client.view.html',
        controller: 'RequestsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Requests List'
        }
      })
      .state('requests.create', {
        url: '/create',
        templateUrl: 'modules/requests/client/views/form-request.client.view.html',
        controller: 'RequestsController',
        controllerAs: 'vm',
        resolve: {
          requestResolve: newRequest
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Requests Create'
        }
      })
      .state('requests.edit', {
        url: '/:requestId/edit',
        templateUrl: 'modules/requests/client/views/form-request.client.view.html',
        controller: 'RequestsController',
        controllerAs: 'vm',
        resolve: {
          requestResolve: getRequest
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Request {{ requestResolve.name }}'
        }
      })
      .state('requests.view', {
        url: '/:requestId',
        templateUrl: 'modules/requests/client/views/view-request.client.view.html',
        controller: 'RequestsController',
        controllerAs: 'vm',
        resolve: {
          requestResolve: getRequest
        },
        data: {
          pageTitle: 'Request {{ requestResolve.name }}'
        }
      });
  }

  getRequest.$inject = ['$stateParams', 'RequestsService'];

  function getRequest($stateParams, RequestsService) {
    return RequestsService.get({
      requestId: $stateParams.requestId
    }).$promise;
  }

  newRequest.$inject = ['RequestsService'];

  function newRequest(RequestsService) {
    return new RequestsService();
  }
}());
