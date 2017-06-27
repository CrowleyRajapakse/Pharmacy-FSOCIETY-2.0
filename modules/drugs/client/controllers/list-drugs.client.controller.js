(function () {
  'use strict';

  angular
    .module('drugs')
    .controller('DrugsListController', DrugsListController);

  DrugsListController.$inject = ['DrugsService'];

  function DrugsListController(DrugsService) {
    var vm = this;

    vm.drugs = DrugsService.query();
  }
}());
