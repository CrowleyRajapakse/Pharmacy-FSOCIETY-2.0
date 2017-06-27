(function () {
  'use strict';

  angular
    .module('mails')
    .controller('MailsListController', MailsListController);

  MailsListController.$inject = ['MailsService'];

  function MailsListController(MailsService) {
    var vm = this;

    vm.mails = MailsService.query();
  }
}());
