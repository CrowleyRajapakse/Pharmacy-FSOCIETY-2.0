(function () {
  'use strict';


  angular
        .module('drugs')
        .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
        // Set top bar menu items
        /*
         menuService.addMenuItem('topbar', {
         title: 'Drugs',
         state: 'drugs',
         type: 'dropdown',
         roles: ['*']
         });

         // Add the dropdown list item
         menuService.addSubMenuItem('topbar', 'drugs', {
         title: 'List Drugs',
         state: 'drugs.list'
         });

         // Add the dropdown create item
         menuService.addSubMenuItem('topbar', 'drugs', {
         title: 'Create Drug',
         state: 'drugs.create',
         roles: ['user']
         });
         */
    menuService.addMenuItem('topbar', {
      title: 'View Drug Information',
      state: 'drugs.list',
      roles: ['*']
    });

    menuService.addMenuItem('topbar', {
      title: 'Add New Batch',
      state: 'drugs.create',
      roles: ['user']
    });

/*    //request part
      menuService.addMenuItem('topbar', {
          title: 'View Requests',
          state: 'requests.view',
          roles: ['user']
      });*/

    menuService.addMenuItem('topbar', {
      title: 'Add New Drug',
      state: 'drugs.addNew',
      roles: ['user']
    });

    menuService.addMenuItem('topbar', {
      title: 'Home',
      state: 'drugs.stock',
      roles: ['user']
    });

  }
}());
