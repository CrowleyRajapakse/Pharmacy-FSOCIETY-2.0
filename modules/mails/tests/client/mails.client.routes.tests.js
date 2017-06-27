(function () {
  'use strict';

  describe('Mails Route Tests', function () {
    // Initialize global variables
    var $scope,
      MailsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _MailsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      MailsService = _MailsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('mails');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/mails');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          MailsController,
          mockMail;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('mails.view');
          $templateCache.put('modules/mails/client/views/view-mail.client.view.html', '');

          // create mock Mail
          mockMail = new MailsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Mail Name'
          });

          // Initialize Controller
          MailsController = $controller('MailsController as vm', {
            $scope: $scope,
            mailResolve: mockMail
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:mailId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.mailResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            mailId: 1
          })).toEqual('/mails/1');
        }));

        it('should attach an Mail to the controller scope', function () {
          expect($scope.vm.mail._id).toBe(mockMail._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/mails/client/views/view-mail.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          MailsController,
          mockMail;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('mails.create');
          $templateCache.put('modules/mails/client/views/form-mail.client.view.html', '');

          // create mock Mail
          mockMail = new MailsService();

          // Initialize Controller
          MailsController = $controller('MailsController as vm', {
            $scope: $scope,
            mailResolve: mockMail
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.mailResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/mails/create');
        }));

        it('should attach an Mail to the controller scope', function () {
          expect($scope.vm.mail._id).toBe(mockMail._id);
          expect($scope.vm.mail._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/mails/client/views/form-mail.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          MailsController,
          mockMail;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('mails.edit');
          $templateCache.put('modules/mails/client/views/form-mail.client.view.html', '');

          // create mock Mail
          mockMail = new MailsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Mail Name'
          });

          // Initialize Controller
          MailsController = $controller('MailsController as vm', {
            $scope: $scope,
            mailResolve: mockMail
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:mailId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.mailResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            mailId: 1
          })).toEqual('/mails/1/edit');
        }));

        it('should attach an Mail to the controller scope', function () {
          expect($scope.vm.mail._id).toBe(mockMail._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/mails/client/views/form-mail.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
