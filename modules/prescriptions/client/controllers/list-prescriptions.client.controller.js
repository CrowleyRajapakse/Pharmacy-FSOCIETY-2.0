(function () {
  'use strict';

  angular
    .module('prescriptions')
    .controller('PrescriptionsListController', PrescriptionsListController);

  PrescriptionsListController.$inject = ['PrescriptionsService'];

  function PrescriptionsListController(PrescriptionsService) {
    var vm = this;

    vm.prescriptions = PrescriptionsService.query();
  }
}());
