(function () {
  'use strict';


  angular
        .module('drugs')
        .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
        // Set top bar menu items

    menuService.addMenuItem('topbar', {
      title: 'Drugs',
      state: 'drugs',
      type: 'dropdown',
<<<<<<< HEAD
      roles: ['admin','user','chiefPharmacist','assistantPharmacist']
=======
      roles: ['admin','user','chiefPharmacist']
>>>>>>> origin/master
    });

    menuService.addSubMenuItem('topbar', 'drugs', {
      title: 'Drug Stock',
      state: 'drugs.stock',
<<<<<<< HEAD
      roles: ['user','chiefPharmacist','assistantPharmacist']
=======
      roles: ['user','chiefPharmacist']
>>>>>>> origin/master
    });

    menuService.addSubMenuItem('topbar', 'drugs', {
      title: 'Add New Drug',
      state: 'drugs.addNew',
      roles: ['user','chiefPharmacist']
    });

    menuService.addSubMenuItem('topbar', 'drugs', {
      title: 'List Drugs',
      state: 'drugs.newDurgList'
    });

         // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'drugs', {
      title: 'List Batch',
      state: 'drugs.list'
    });

         // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'drugs', {
      title: 'Add New Batch',
      state: 'drugs.create',
      roles: ['user','chiefPharmacist']
    });

/*    menuService.addMenuItem('topbar', {
      title: 'View Batch Information',
      state: 'drugs.list',
      roles: ['*']
    });

    menuService.addMenuItem('topbar', {
      title: 'Add New Batch',
      state: 'drugs.create',
      roles: ['user']
    });*/

/*    //request part
      menuService.addMenuItem('topbar', {
          title: 'View Requests',
          state: 'requests.view',
          roles: ['user']
      });*/

/*
      menuService.addMenuItem('topbar', {
          title: 'Drugs',
          state: 'drugs',
          type: 'dropdown',
          roles: ['*']
      });
*/




      // Add the dropdown create item


      // Add the dropdown list item
/*      menuService.addMenuItem('topbar', {
          title: 'Add New Drug',
          state: 'drugs.addNew',
          roles: ['user']
      });*/

/*      menuService.addMenuItem('topbar', {
          title: 'Home',
          state: 'drugs.stock',
          roles: ['user']
      });*/

  }
}());
