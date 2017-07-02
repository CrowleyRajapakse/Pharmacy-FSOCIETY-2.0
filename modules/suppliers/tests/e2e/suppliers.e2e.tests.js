'use strict';

describe('Suppliers E2E Tests:', function () {
  describe('Test Suppliers page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/suppliers');
      expect(element.all(by.repeater('supplier in suppliers')).count()).toEqual(0);
    });
  });
});
