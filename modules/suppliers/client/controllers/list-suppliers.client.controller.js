(function () {
  'use strict';

  angular
    .module('suppliers')
    .controller('SuppliersListController', SuppliersListController);

  SuppliersListController.$inject = ['SuppliersService'];

  function SuppliersListController(SuppliersService) {
    var vm = this;

    vm.suppliers = SuppliersService.query();
  }
}());
