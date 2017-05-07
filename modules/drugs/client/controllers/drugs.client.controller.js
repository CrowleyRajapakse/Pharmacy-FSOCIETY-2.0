(function () {
  'use strict';

  // Drugs controller
  angular
    .module('drugs')
    .controller('DrugsController', DrugsController);

  DrugsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'drugResolve'];

  function DrugsController ($scope, $state, $window, Authentication, drug) {
    var vm = this;

    vm.authentication = Authentication;
    vm.drug = drug;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Drug
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.drug.$remove($state.go('drugs.list'));
      }
    }

    // Save Drug
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.updateDrugForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.drug._id) {
        vm.drug.$update(successCallback, errorCallback);
      } else {
        vm.drug.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('drugs.view', {
          drugId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
