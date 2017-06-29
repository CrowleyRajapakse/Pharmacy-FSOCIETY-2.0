'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Prescription = mongoose.model('Prescription'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  prescription;

/**
 * Prescription routes tests
 */
describe('Prescription CRUD tests', function () {

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

    // Save a user to the test db and create new Prescription
    user.save(function () {
      prescription = {
        name: 'Prescription name'
      };

      done();
    });
  });

  it('should be able to save a Prescription if logged in', function (done) {
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

        // Save a new Prescription
        agent.post('/api/prescriptions')
          .send(prescription)
          .expect(200)
          .end(function (prescriptionSaveErr, prescriptionSaveRes) {
            // Handle Prescription save error
            if (prescriptionSaveErr) {
              return done(prescriptionSaveErr);
            }

            // Get a list of Prescriptions
            agent.get('/api/prescriptions')
              .end(function (prescriptionsGetErr, prescriptionsGetRes) {
                // Handle Prescriptions save error
                if (prescriptionsGetErr) {
                  return done(prescriptionsGetErr);
                }

                // Get Prescriptions list
                var prescriptions = prescriptionsGetRes.body;

                // Set assertions
                (prescriptions[0].user._id).should.equal(userId);
                (prescriptions[0].name).should.match('Prescription name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Prescription if not logged in', function (done) {
    agent.post('/api/prescriptions')
      .send(prescription)
      .expect(403)
      .end(function (prescriptionSaveErr, prescriptionSaveRes) {
        // Call the assertion callback
        done(prescriptionSaveErr);
      });
  });

  it('should not be able to save an Prescription if no name is provided', function (done) {
    // Invalidate name field
    prescription.name = '';

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

        // Save a new Prescription
        agent.post('/api/prescriptions')
          .send(prescription)
          .expect(400)
          .end(function (prescriptionSaveErr, prescriptionSaveRes) {
            // Set message assertion
            (prescriptionSaveRes.body.message).should.match('Please fill Prescription name');

            // Handle Prescription save error
            done(prescriptionSaveErr);
          });
      });
  });

  it('should be able to update an Prescription if signed in', function (done) {
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

        // Save a new Prescription
        agent.post('/api/prescriptions')
          .send(prescription)
          .expect(200)
          .end(function (prescriptionSaveErr, prescriptionSaveRes) {
            // Handle Prescription save error
            if (prescriptionSaveErr) {
              return done(prescriptionSaveErr);
            }

            // Update Prescription name
            prescription.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Prescription
            agent.put('/api/prescriptions/' + prescriptionSaveRes.body._id)
              .send(prescription)
              .expect(200)
              .end(function (prescriptionUpdateErr, prescriptionUpdateRes) {
                // Handle Prescription update error
                if (prescriptionUpdateErr) {
                  return done(prescriptionUpdateErr);
                }

                // Set assertions
                (prescriptionUpdateRes.body._id).should.equal(prescriptionSaveRes.body._id);
                (prescriptionUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Prescriptions if not signed in', function (done) {
    // Create new Prescription model instance
    var prescriptionObj = new Prescription(prescription);

    // Save the prescription
    prescriptionObj.save(function () {
      // Request Prescriptions
      request(app).get('/api/prescriptions')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Prescription if not signed in', function (done) {
    // Create new Prescription model instance
    var prescriptionObj = new Prescription(prescription);

    // Save the Prescription
    prescriptionObj.save(function () {
      request(app).get('/api/prescriptions/' + prescriptionObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', prescription.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Prescription with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/prescriptions/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Prescription is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Prescription which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Prescription
    request(app).get('/api/prescriptions/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Prescription with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Prescription if signed in', function (done) {
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

        // Save a new Prescription
        agent.post('/api/prescriptions')
          .send(prescription)
          .expect(200)
          .end(function (prescriptionSaveErr, prescriptionSaveRes) {
            // Handle Prescription save error
            if (prescriptionSaveErr) {
              return done(prescriptionSaveErr);
            }

            // Delete an existing Prescription
            agent.delete('/api/prescriptions/' + prescriptionSaveRes.body._id)
              .send(prescription)
              .expect(200)
              .end(function (prescriptionDeleteErr, prescriptionDeleteRes) {
                // Handle prescription error error
                if (prescriptionDeleteErr) {
                  return done(prescriptionDeleteErr);
                }

                // Set assertions
                (prescriptionDeleteRes.body._id).should.equal(prescriptionSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Prescription if not signed in', function (done) {
    // Set Prescription user
    prescription.user = user;

    // Create new Prescription model instance
    var prescriptionObj = new Prescription(prescription);

    // Save the Prescription
    prescriptionObj.save(function () {
      // Try deleting Prescription
      request(app).delete('/api/prescriptions/' + prescriptionObj._id)
        .expect(403)
        .end(function (prescriptionDeleteErr, prescriptionDeleteRes) {
          // Set message assertion
          (prescriptionDeleteRes.body.message).should.match('User is not authorized');

          // Handle Prescription error error
          done(prescriptionDeleteErr);
        });

    });
  });

  it('should be able to get a single Prescription that has an orphaned user reference', function (done) {
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

          // Save a new Prescription
          agent.post('/api/prescriptions')
            .send(prescription)
            .expect(200)
            .end(function (prescriptionSaveErr, prescriptionSaveRes) {
              // Handle Prescription save error
              if (prescriptionSaveErr) {
                return done(prescriptionSaveErr);
              }

              // Set assertions on new Prescription
              (prescriptionSaveRes.body.name).should.equal(prescription.name);
              should.exist(prescriptionSaveRes.body.user);
              should.equal(prescriptionSaveRes.body.user._id, orphanId);

              // force the Prescription to have an orphaned user reference
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

                    // Get the Prescription
                    agent.get('/api/prescriptions/' + prescriptionSaveRes.body._id)
                      .expect(200)
                      .end(function (prescriptionInfoErr, prescriptionInfoRes) {
                        // Handle Prescription error
                        if (prescriptionInfoErr) {
                          return done(prescriptionInfoErr);
                        }

                        // Set assertions
                        (prescriptionInfoRes.body._id).should.equal(prescriptionSaveRes.body._id);
                        (prescriptionInfoRes.body.name).should.equal(prescription.name);
                        should.equal(prescriptionInfoRes.body.user, undefined);

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
      Prescription.remove().exec(done);
    });
  });
});
