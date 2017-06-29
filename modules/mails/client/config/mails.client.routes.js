(function () {
  'use strict';

  angular
    .module('mails')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('mails', {
        abstract: true,
        url: '/mails',
        template: '<ui-view/>'
      })
      .state('mails.list', {
        url: '',
        templateUrl: 'modules/mails/client/views/list-mails.client.view.html',
        controller: 'MailsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Mails List'
        }
      })
      .state('mails.create', {
        url: '/create',
        templateUrl: 'modules/mails/client/views/form-mail.client.view.html',
        controller: 'MailsController',
        controllerAs: 'vm',
        resolve: {
          mailResolve: newMail
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Mails Create'
        }
      })
      .state('mails.sendMails', {
        url: '/:mailId',
        templateUrl: 'modules/mails/client/views/view-mail.client.view.html',
        controller: 'MailsController',
        controllerAs: 'vm',
        resolve: {
          mailResolve: sendEmail
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Mails Send'
        }
      })
      .state('mails.edit', {
        url: '/:mailId/edit',
        templateUrl: 'modules/mails/client/views/form-mail.client.view.html',
        controller: 'MailsController',
        controllerAs: 'vm',
        resolve: {
          mailResolve: getMail
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Mail {{ mailResolve.name }}'
        }
      })
      .state('mails.view', {
        url: '/:mailId',
        templateUrl: 'modules/mails/client/views/view-mail.client.view.html',
        controller: 'MailsController',
        controllerAs: 'vm',
        resolve: {
          mailResolve: getMail
        },
        data: {
          pageTitle: 'Mail {{ mailResolve.name }}'
        }
      });
  }


  getMail.$inject = ['$stateParams', 'MailsService'];

  function getMail($stateParams, MailsService) {
    return MailsService.get({
      mailId: $stateParams.mailId
    }).$promise;
  }

  newMail.$inject = ['MailsService'];

  function newMail(MailsService) {
    return new MailsService();
  }


  sendEmail.$inject = ['$stateParams','MailsService'];
  function sendEmail($stateParams, MailsService) {
    return MailsService.get({
      mailId: $stateParams.mailId
    }).$promise;
  }


}());
