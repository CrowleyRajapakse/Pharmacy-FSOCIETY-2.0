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
    vm.printDrug = printDrug;
    // Remove existing Drug
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.drug.$remove($state.go('drugs.list'));
      }
    }
//Print Drug and print
    function printDrug(div) {
      if ($window.confirm('Are you sure you want to Print Drug?')) {
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
    // Save Drug
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.drugForm');
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
