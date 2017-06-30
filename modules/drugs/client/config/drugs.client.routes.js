(function () {
  'use strict';


  angular
    .module('drugs')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function getFormName(form) {
    console.log(form.$name);
  }

  function routeConfig($stateProvider) {
    $stateProvider
            .state('drugs', {
              abstract: true,
              url: '/drugs',
              template: '<ui-view/>'
            })
            .state('drugs.stock', {
              url: '/stock',
              templateUrl: 'modules/drugs/client/views/list-drug-stock.client.view.html',
              controller: 'DrugsListController',
              controllerAs: 'vm',
              data: {
                pageTitle: 'Drugs Stock'
              }
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
            .state('drugs.newDurgList', {
              url: '',
              templateUrl: 'modules/drugs/client/views/list-newdrugs.client.view.html',
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
                roles: ['user', 'admin','chiefPharmacist'],
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
                roles: ['user', 'admin','chiefPharmacist'],
                pageTitle: 'Edit Drug {{ drugResolve.name }}'
              }
            })
            .state('drugs.addNew', {
              url: '/addNew',
              templateUrl: 'modules/drugs/client/views/form-newdrug.client.view.html',
              controller: 'DrugsController',
              controllerAs: 'vm',
              resolve: {
                drugResolve: newDrug
              },
              data: {
                roles: ['user', 'admin','chiefPharmacist'],
                pageTitle: 'Add New Drug'
              }
            })
            .state('drugs.newDrugEdit', {
              url: '/:drugId/newDrugEdit',
              templateUrl: 'modules/drugs/client/views/form-newdrug.client.view.html',
              controller: 'DrugsController',
              controllerAs: 'vm',
              resolve: {
                drugResolve: getDrug
              },
              data: {
                roles: ['user', 'admin','chiefPharmacist'],
                pageTitle: 'Edit Drug Information {{ drugResolve.name }}'
              }
            })
            .state('drugs.newDrugView', {
              url: '/:drugId/view',
              templateUrl: 'modules/drugs/client/views/viewnew-drug.client.view.html',
              controller: 'DrugsController',
              controllerAs: 'vm',
              resolve: {
                drugResolve: getDrug
              },
              data: {
                pageTitle: 'Drug {{ drugResolve.name }}'
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
/*//request part begin
        .state('requests.view', {
            url: '/requests',
            templateUrl: 'modules/drugs/client/views/view-requests.client.view.html',
            controller: 'DrugsController',
            controllerAs: 'vm',
            resolve: {
                drugResolve: getRequest
            },
            data: {
                pageTitle: 'Request {{ requestResolve.name }}'
            }
        });
      //request part end*/
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

/*  //request begin



    getRequest.$inject = ['$stateParams', 'DrugsService'];

    function getRequest($stateParams, DrugsService) {
        return DrugsService.get({
            drugId: $stateParams.drugId
        }).$promise;
    }
    newRequest.$inject = ['DrugsService'];

    function newRequest(DrugsService) {
        return new DrugsService();
    }
    //request end*/


}());
