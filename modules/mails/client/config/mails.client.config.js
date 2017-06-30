(function () {
  'use strict';

  angular
    .module('mails')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
      /*
    menuService.addMenuItem('topbar', {
      title: 'Mails',
      state: 'mails',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'mails', {
      title: 'List Mails',
      state: 'mails.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'mails', {
      title: 'Create Mail',
      state: 'mails.create',
      roles: ['user']
    });
    */
    menuService.addMenuItem('topbar', {
      title: 'Latest Mails',
      state: 'mails.list',
      roles: ['*']
    });

    menuService.addMenuItem('topbar', {
      title: 'Create Mails',
      state: 'mails.create',
      roles: ['user']
    });
  }
}());
