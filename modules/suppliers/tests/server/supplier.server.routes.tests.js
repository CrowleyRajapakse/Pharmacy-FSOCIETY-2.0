'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Supplier = mongoose.model('Supplier'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  supplier;

/**
 * Supplier routes tests
 */
describe('Supplier CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Supplier
    user.save(function () {
      supplier = {
        name: 'Supplier name'
      };

      done();
    });
  });

  it('should be able to save a Supplier if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Supplier
        agent.post('/api/suppliers')
          .send(supplier)
          .expect(200)
          .end(function (supplierSaveErr, supplierSaveRes) {
            // Handle Supplier save error
            if (supplierSaveErr) {
              return done(supplierSaveErr);
            }

            // Get a list of Suppliers
            agent.get('/api/suppliers')
              .end(function (suppliersGetErr, suppliersGetRes) {
                // Handle Suppliers save error
                if (suppliersGetErr) {
                  return done(suppliersGetErr);
                }

                // Get Suppliers list
                var suppliers = suppliersGetRes.body;

                // Set assertions
                (suppliers[0].user._id).should.equal(userId);
                (suppliers[0].name).should.match('Supplier name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Supplier if not logged in', function (done) {
    agent.post('/api/suppliers')
      .send(supplier)
      .expect(403)
      .end(function (supplierSaveErr, supplierSaveRes) {
        // Call the assertion callback
        done(supplierSaveErr);
      });
  });

  it('should not be able to save an Supplier if no name is provided', function (done) {
    // Invalidate name field
    supplier.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Supplier
        agent.post('/api/suppliers')
          .send(supplier)
          .expect(400)
          .end(function (supplierSaveErr, supplierSaveRes) {
            // Set message assertion
            (supplierSaveRes.body.message).should.match('Please fill Supplier name');

            // Handle Supplier save error
            done(supplierSaveErr);
          });
      });
  });

  it('should be able to update an Supplier if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Supplier
        agent.post('/api/suppliers')
          .send(supplier)
          .expect(200)
          .end(function (supplierSaveErr, supplierSaveRes) {
            // Handle Supplier save error
            if (supplierSaveErr) {
              return done(supplierSaveErr);
            }

            // Update Supplier name
            supplier.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Supplier
            agent.put('/api/suppliers/' + supplierSaveRes.body._id)
              .send(supplier)
              .expect(200)
              .end(function (supplierUpdateErr, supplierUpdateRes) {
                // Handle Supplier update error
                if (supplierUpdateErr) {
                  return done(supplierUpdateErr);
                }

                // Set assertions
                (supplierUpdateRes.body._id).should.equal(supplierSaveRes.body._id);
                (supplierUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Suppliers if not signed in', function (done) {
    // Create new Supplier model instance
    var supplierObj = new Supplier(supplier);

    // Save the supplier
    supplierObj.save(function () {
      // Request Suppliers
      request(app).get('/api/suppliers')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Supplier if not signed in', function (done) {
    // Create new Supplier model instance
    var supplierObj = new Supplier(supplier);

    // Save the Supplier
    supplierObj.save(function () {
      request(app).get('/api/suppliers/' + supplierObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', supplier.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Supplier with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/suppliers/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Supplier is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Supplier which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Supplier
    request(app).get('/api/suppliers/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Supplier with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Supplier if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Supplier
        agent.post('/api/suppliers')
          .send(supplier)
          .expect(200)
          .end(function (supplierSaveErr, supplierSaveRes) {
            // Handle Supplier save error
            if (supplierSaveErr) {
              return done(supplierSaveErr);
            }

            // Delete an existing Supplier
            agent.delete('/api/suppliers/' + supplierSaveRes.body._id)
              .send(supplier)
              .expect(200)
              .end(function (supplierDeleteErr, supplierDeleteRes) {
                // Handle supplier error error
                if (supplierDeleteErr) {
                  return done(supplierDeleteErr);
                }

                // Set assertions
                (supplierDeleteRes.body._id).should.equal(supplierSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Supplier if not signed in', function (done) {
    // Set Supplier user
    supplier.user = user;

    // Create new Supplier model instance
    var supplierObj = new Supplier(supplier);

    // Save the Supplier
    supplierObj.save(function () {
      // Try deleting Supplier
      request(app).delete('/api/suppliers/' + supplierObj._id)
        .expect(403)
        .end(function (supplierDeleteErr, supplierDeleteRes) {
          // Set message assertion
          (supplierDeleteRes.body.message).should.match('User is not authorized');

          // Handle Supplier error error
          done(supplierDeleteErr);
        });

    });
  });

  it('should be able to get a single Supplier that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Supplier
          agent.post('/api/suppliers')
            .send(supplier)
            .expect(200)
            .end(function (supplierSaveErr, supplierSaveRes) {
              // Handle Supplier save error
              if (supplierSaveErr) {
                return done(supplierSaveErr);
              }

              // Set assertions on new Supplier
              (supplierSaveRes.body.name).should.equal(supplier.name);
              should.exist(supplierSaveRes.body.user);
              should.equal(supplierSaveRes.body.user._id, orphanId);

              // force the Supplier to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Supplier
                    agent.get('/api/suppliers/' + supplierSaveRes.body._id)
                      .expect(200)
                      .end(function (supplierInfoErr, supplierInfoRes) {
                        // Handle Supplier error
                        if (supplierInfoErr) {
                          return done(supplierInfoErr);
                        }

                        // Set assertions
                        (supplierInfoRes.body._id).should.equal(supplierSaveRes.body._id);
                        (supplierInfoRes.body.name).should.equal(supplier.name);
                        should.equal(supplierInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Supplier.remove().exec(done);
    });
  });
});
