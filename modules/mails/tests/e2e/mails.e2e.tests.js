'use strict';

describe('Mails E2E Tests:', function () {
  describe('Test Mails page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/mails');
      expect(element.all(by.repeater('mail in mails')).count()).toEqual(0);
    });
  });
});
