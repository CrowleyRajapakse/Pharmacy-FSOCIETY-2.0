(function () {
  'use strict';

  describe('Requests List Controller Tests', function () {
    // Initialize global variables
    var RequestsListController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      RequestsService,
      mockRequest;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _RequestsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      RequestsService = _RequestsService_;

      // create mock article
      mockRequest = new RequestsService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Request Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Requests List controller.
      RequestsListController = $controller('RequestsListController as vm', {
        $scope: $scope
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('Instantiate', function () {
      var mockRequestList;

      beforeEach(function () {
        mockRequestList = [mockRequest, mockRequest];
      });

      it('should send a GET request and return all Requests', inject(function (RequestsService) {
        // Set POST response
        $httpBackend.expectGET('api/requests').respond(mockRequestList);


        $httpBackend.flush();

        // Test form inputs are reset
        expect($scope.vm.requests.length).toEqual(2);
        expect($scope.vm.requests[0]).toEqual(mockRequest);
        expect($scope.vm.requests[1]).toEqual(mockRequest);

      }));
    });
  });
}());
