(function () {
  'use strict';

  // Prescriptions controller
  angular
    .module('requests')
    .controller('RequestsController', RequestsController);

    RequestsController.$inject = ['$scope', '$state', 'Authentication', 'requestResolve'];

  function RequestsController ($scope, $state, Authentication, request) {
    var vm1 = this;

    vm1.authentication = Authentication;
    vm1.request = request;
    vm1.error = null;
    vm1.form = {};
    /*vm.remove = remove;*/
    vm1.save = save;
  /*  vm.printDispense = printDispense;*/

    // Remove existing Prescription
   /* function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.request.$remove($state.go('requests.list'));
      }
    }
*/
    //Dispnese and print
   /* function printDispense(div) {
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
    }*/

    // Save Prescription
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm1.form.requestForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm1.request._id) {
        vm1.request.$update(successCallback, errorCallback);
      } else {
        vm1.request.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('requests.view', {
          requestId: res._id
        });
      }

      function errorCallback(res) {
        vm1.error = res.data.message;
      }
    }
  }
}());
