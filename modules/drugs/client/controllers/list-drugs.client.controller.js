(function () {
  'use strict';

  angular
    .module('drugs')
    .controller('DrugsListController', DrugsListController);

  DrugsListController.$inject = ['DrugsService','$window','$state'];


  function DrugsListController(DrugsService,$window,$state) {
    var vm = this;

    vm.drugs = DrugsService.query();

    vm.removeInArray = function (index) {
      console.log('called');
      if ($window.confirm('Are you sure you want to delete?')) {
             // drugs[index].$remove($state.go('drugs.list'));
              //console.log(vm.drugs[index]);

        vm.drugs[index].$remove($state.go('drugs.list'));
        vm.drugs.splice(index, 1);


      }
    };


    vm.DropDownChangeHandler =function () {
      console.log('Drop down Controller');
      console.log(vm.drug.category);
          /*angular
              .module('drugs').filter('unique', function() {
              return function(collection, keyname) {
                  var output = [],
                      keys = [];

                  angular.forEach(collection, function(item) {
                      var key = item[keyname];
                      if(keys.indexOf(key) === -1) {
                          keys.push(key);
                          output.push(item);
                      }
                  });

                  return output;
              };
          });*/


    };
  }
}());

