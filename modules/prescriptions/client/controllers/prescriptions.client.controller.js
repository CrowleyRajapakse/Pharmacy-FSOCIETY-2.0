(function () {
  'use strict';

  // Prescriptions controller
  angular
    .module('prescriptions')
    .controller('PrescriptionsController', PrescriptionsController);

  PrescriptionsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'prescriptionResolve'];

  function PrescriptionsController ($scope, $state, $window, Authentication, prescription) {
    var vm = this;

    vm.authentication = Authentication;
    vm.prescription = prescription;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.printDispense = printDispense;

    // Remove existing Prescription
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.prescription.$remove($state.go('prescriptions.list'));
      }
    }

    //Dispnese and print
    function printDispense(div) {
      if ($window.confirm('Are you sure you want to Dispense?')) {
        var docHead = document.head.outerHTML;
        var printContents = document.getElementById(div).outerHTML;
        var winAttr = "location=yes, statusbar=no, menubar=no, titlebar=no, toolbar=no,dependent=no, width=865, height=600, resizable=yes, screenX=200, screenY=200, personalbar=no, scrollbars=yes";

        var newWin = window.open("", "_blank", winAttr);
        var writeDoc = newWin.document;
        writeDoc.open();
        writeDoc.write('<!doctype html><html>' + docHead + '<body onLoad="window.print()">' + printContents + '</body></html>');
        writeDoc.close();
        newWin.focus();
      }
    }

    // Save Prescription
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.prescriptionForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.prescription._id) {
        vm.prescription.$update(successCallback, errorCallback);
      } else {
        vm.prescription.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('prescriptions.view', {
          prescriptionId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
