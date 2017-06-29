'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Request = mongoose.model('Request'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  request;

/**
 * Request routes tests
 */
describe('Request CRUD tests', function () {

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

    // Save a user to the test db and create new Request
    user.save(function () {
      request = {
        name: 'Request name'
      };

      done();
    });
  });

  it('should be able to save a Request if logged in', function (done) {
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

        // Save a new Request
        agent.post('/api/requests')
          .send(request)
          .expect(200)
          .end(function (requestSaveErr, requestSaveRes) {
            // Handle Request save error
            if (requestSaveErr) {
              return done(requestSaveErr);
            }

            // Get a list of Requests
            agent.get('/api/requests')
              .end(function (requestsGetErr, requestsGetRes) {
                // Handle Requests save error
                if (requestsGetErr) {
                  return done(requestsGetErr);
                }

                // Get Requests list
                var requests = requestsGetRes.body;

                // Set assertions
                (requests[0].user._id).should.equal(userId);
                (requests[0].name).should.match('Request name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Request if not logged in', function (done) {
    agent.post('/api/requests')
      .send(request)
      .expect(403)
      .end(function (requestSaveErr, requestSaveRes) {
        // Call the assertion callback
        done(requestSaveErr);
      });
  });

  it('should not be able to save an Request if no name is provided', function (done) {
    // Invalidate name field
    request.name = '';

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

        // Save a new Request
        agent.post('/api/requests')
          .send(request)
          .expect(400)
          .end(function (requestSaveErr, requestSaveRes) {
            // Set message assertion
            (requestSaveRes.body.message).should.match('Please fill Request name');

            // Handle Request save error
            done(requestSaveErr);
          });
      });
  });

  it('should be able to update an Request if signed in', function (done) {
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

        // Save a new Request
        agent.post('/api/requests')
          .send(request)
          .expect(200)
          .end(function (requestSaveErr, requestSaveRes) {
            // Handle Request save error
            if (requestSaveErr) {
              return done(requestSaveErr);
            }

            // Update Request name
            request.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Request
            agent.put('/api/requests/' + requestSaveRes.body._id)
              .send(request)
              .expect(200)
              .end(function (requestUpdateErr, requestUpdateRes) {
                // Handle Request update error
                if (requestUpdateErr) {
                  return done(requestUpdateErr);
                }

                // Set assertions
                (requestUpdateRes.body._id).should.equal(requestSaveRes.body._id);
                (requestUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Requests if not signed in', function (done) {
    // Create new Request model instance
    var requestObj = new Request(request);

    // Save the request
    requestObj.save(function () {
      // Request Requests
      request(app).get('/api/requests')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Request if not signed in', function (done) {
    // Create new Request model instance
    var requestObj = new Request(request);

    // Save the Request
    requestObj.save(function () {
      request(app).get('/api/requests/' + requestObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', request.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Request with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/requests/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Request is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Request which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Request
    request(app).get('/api/requests/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Request with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Request if signed in', function (done) {
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

        // Save a new Request
        agent.post('/api/requests')
          .send(request)
          .expect(200)
          .end(function (requestSaveErr, requestSaveRes) {
            // Handle Request save error
            if (requestSaveErr) {
              return done(requestSaveErr);
            }

            // Delete an existing Request
            agent.delete('/api/requests/' + requestSaveRes.body._id)
              .send(request)
              .expect(200)
              .end(function (requestDeleteErr, requestDeleteRes) {
                // Handle request error error
                if (requestDeleteErr) {
                  return done(requestDeleteErr);
                }

                // Set assertions
                (requestDeleteRes.body._id).should.equal(requestSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Request if not signed in', function (done) {
    // Set Request user
    request.user = user;

    // Create new Request model instance
    var requestObj = new Request(request);

    // Save the Request
    requestObj.save(function () {
      // Try deleting Request
      request(app).delete('/api/requests/' + requestObj._id)
        .expect(403)
        .end(function (requestDeleteErr, requestDeleteRes) {
          // Set message assertion
          (requestDeleteRes.body.message).should.match('User is not authorized');

          // Handle Request error error
          done(requestDeleteErr);
        });

    });
  });

  it('should be able to get a single Request that has an orphaned user reference', function (done) {
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

          // Save a new Request
          agent.post('/api/requests')
            .send(request)
            .expect(200)
            .end(function (requestSaveErr, requestSaveRes) {
              // Handle Request save error
              if (requestSaveErr) {
                return done(requestSaveErr);
              }

              // Set assertions on new Request
              (requestSaveRes.body.name).should.equal(request.name);
              should.exist(requestSaveRes.body.user);
              should.equal(requestSaveRes.body.user._id, orphanId);

              // force the Request to have an orphaned user reference
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

                    // Get the Request
                    agent.get('/api/requests/' + requestSaveRes.body._id)
                      .expect(200)
                      .end(function (requestInfoErr, requestInfoRes) {
                        // Handle Request error
                        if (requestInfoErr) {
                          return done(requestInfoErr);
                        }

                        // Set assertions
                        (requestInfoRes.body._id).should.equal(requestSaveRes.body._id);
                        (requestInfoRes.body.name).should.equal(request.name);
                        should.equal(requestInfoRes.body.user, undefined);

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
      Request.remove().exec(done);
    });
  });
});
