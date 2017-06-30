'use strict';

describe('Requests E2E Tests:', function () {
  describe('Test Requests page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/requests');
      expect(element.all(by.repeater('request in requests')).count()).toEqual(0);
    });
  });
});
