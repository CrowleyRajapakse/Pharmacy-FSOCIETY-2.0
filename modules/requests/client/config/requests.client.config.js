(function () {
  'use strict';

  angular
    .module('requests')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Requests',
      state: 'requests',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'requests', {
      title: 'List Requests',
      state: 'requests.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'requests', {
      title: 'Create Request',
      state: 'requests.create',
      roles: ['user']
    });
  }
}());
