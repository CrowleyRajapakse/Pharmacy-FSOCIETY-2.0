(function () {
  'use strict';

  angular
    .module('requests')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
      /*
    menuService.addMenuItem('topbar', {
      title: 'Prescriptions',
      state: 'prescriptions',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'prescriptions', {
      title: 'List Prescriptions',
      state: 'prescriptions.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'prescriptions', {
      title: 'Create Prescription',
      state: 'prescriptions.create',
      roles: ['user']
    });
    */


    menuService.addMenuItem('topbar', {
      title: 'Create Requests',
      state: 'requests.create',
      roles: ['user']
    });
  }
}());
