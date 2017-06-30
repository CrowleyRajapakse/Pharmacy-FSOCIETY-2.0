(function () {
  'use strict';

  angular
    .module('suppliers')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Suppliers',
      state: 'suppliers',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'suppliers', {
      title: 'List Suppliers',
      state: 'suppliers.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'suppliers', {
      title: 'Create Supplier',
      state: 'suppliers.create',
      roles: ['user']
    });
  }
}());
