(function () {
  'use strict';

  // Suppliers controller
  angular
    .module('suppliers')
    .controller('SuppliersController', SuppliersController);

  SuppliersController.$inject = ['$scope', '$state', '$window', 'Authentication', 'supplierResolve'];

  function SuppliersController ($scope, $state, $window, Authentication, supplier) {
    var vm = this;

    vm.authentication = Authentication;
    vm.supplier = supplier;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Supplier
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.supplier.$remove($state.go('suppliers.list'));
      }
    }

    // Save Supplier
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.supplierForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.supplier._id) {
        vm.supplier.$update(successCallback, errorCallback);
      } else {
        vm.supplier.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('suppliers.view', {
          supplierId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
