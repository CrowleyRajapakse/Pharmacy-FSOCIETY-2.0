(function () {
  'use strict';

  angular
    .module('requests')
    .controller('RequestsListController', RequestsListController);

  RequestsListController.$inject = ['RequestsService'];

  function RequestsListController(RequestsService) {
    var vm1 = this;

    vm1.requests = RequestsService.query();
  }
}());
