(function () {
  'use strict';

  // Mails controller
  angular
    .module('mails')
    .controller('MailsController', MailsController);

  MailsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'mailResolve'];

  function MailsController ($scope, $state, $window, Authentication, mail) {
    var vm = this;

    vm.authentication = Authentication;
    vm.mail = mail;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Mail
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.mail.$remove($state.go('mails.list'));
      }
    }

    // Save Mail
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.mailForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.mail._id) {
        vm.mail.$update(successCallback, errorCallback);
      } else {
        vm.mail.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('mails.view', {
          mailId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
