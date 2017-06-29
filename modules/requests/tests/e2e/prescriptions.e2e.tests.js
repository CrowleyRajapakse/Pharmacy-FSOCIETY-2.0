'use strict';

describe('Prescriptions E2E Tests:', function () {
  describe('Test Prescriptions page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/prescriptions');
      expect(element.all(by.repeater('prescription in prescriptions')).count()).toEqual(0);
    });
  });
});
