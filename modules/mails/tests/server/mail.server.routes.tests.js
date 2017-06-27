'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Mail = mongoose.model('Mail'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  mail;

/**
 * Mail routes tests
 */
describe('Mail CRUD tests', function () {

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

    // Save a user to the test db and create new Mail
    user.save(function () {
      mail = {
        name: 'Mail name'
      };

      done();
    });
  });

  it('should be able to save a Mail if logged in', function (done) {
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

        // Save a new Mail
        agent.post('/api/mails')
          .send(mail)
          .expect(200)
          .end(function (mailSaveErr, mailSaveRes) {
            // Handle Mail save error
            if (mailSaveErr) {
              return done(mailSaveErr);
            }

            // Get a list of Mails
            agent.get('/api/mails')
              .end(function (mailsGetErr, mailsGetRes) {
                // Handle Mails save error
                if (mailsGetErr) {
                  return done(mailsGetErr);
                }

                // Get Mails list
                var mails = mailsGetRes.body;

                // Set assertions
                (mails[0].user._id).should.equal(userId);
                (mails[0].name).should.match('Mail name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Mail if not logged in', function (done) {
    agent.post('/api/mails')
      .send(mail)
      .expect(403)
      .end(function (mailSaveErr, mailSaveRes) {
        // Call the assertion callback
        done(mailSaveErr);
      });
  });

  it('should not be able to save an Mail if no name is provided', function (done) {
    // Invalidate name field
    mail.name = '';

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

        // Save a new Mail
        agent.post('/api/mails')
          .send(mail)
          .expect(400)
          .end(function (mailSaveErr, mailSaveRes) {
            // Set message assertion
            (mailSaveRes.body.message).should.match('Please fill Mail name');

            // Handle Mail save error
            done(mailSaveErr);
          });
      });
  });

  it('should be able to update an Mail if signed in', function (done) {
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

        // Save a new Mail
        agent.post('/api/mails')
          .send(mail)
          .expect(200)
          .end(function (mailSaveErr, mailSaveRes) {
            // Handle Mail save error
            if (mailSaveErr) {
              return done(mailSaveErr);
            }

            // Update Mail name
            mail.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Mail
            agent.put('/api/mails/' + mailSaveRes.body._id)
              .send(mail)
              .expect(200)
              .end(function (mailUpdateErr, mailUpdateRes) {
                // Handle Mail update error
                if (mailUpdateErr) {
                  return done(mailUpdateErr);
                }

                // Set assertions
                (mailUpdateRes.body._id).should.equal(mailSaveRes.body._id);
                (mailUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Mails if not signed in', function (done) {
    // Create new Mail model instance
    var mailObj = new Mail(mail);

    // Save the mail
    mailObj.save(function () {
      // Request Mails
      request(app).get('/api/mails')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Mail if not signed in', function (done) {
    // Create new Mail model instance
    var mailObj = new Mail(mail);

    // Save the Mail
    mailObj.save(function () {
      request(app).get('/api/mails/' + mailObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', mail.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Mail with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/mails/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Mail is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Mail which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Mail
    request(app).get('/api/mails/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Mail with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Mail if signed in', function (done) {
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

        // Save a new Mail
        agent.post('/api/mails')
          .send(mail)
          .expect(200)
          .end(function (mailSaveErr, mailSaveRes) {
            // Handle Mail save error
            if (mailSaveErr) {
              return done(mailSaveErr);
            }

            // Delete an existing Mail
            agent.delete('/api/mails/' + mailSaveRes.body._id)
              .send(mail)
              .expect(200)
              .end(function (mailDeleteErr, mailDeleteRes) {
                // Handle mail error error
                if (mailDeleteErr) {
                  return done(mailDeleteErr);
                }

                // Set assertions
                (mailDeleteRes.body._id).should.equal(mailSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Mail if not signed in', function (done) {
    // Set Mail user
    mail.user = user;

    // Create new Mail model instance
    var mailObj = new Mail(mail);

    // Save the Mail
    mailObj.save(function () {
      // Try deleting Mail
      request(app).delete('/api/mails/' + mailObj._id)
        .expect(403)
        .end(function (mailDeleteErr, mailDeleteRes) {
          // Set message assertion
          (mailDeleteRes.body.message).should.match('User is not authorized');

          // Handle Mail error error
          done(mailDeleteErr);
        });

    });
  });

  it('should be able to get a single Mail that has an orphaned user reference', function (done) {
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

          // Save a new Mail
          agent.post('/api/mails')
            .send(mail)
            .expect(200)
            .end(function (mailSaveErr, mailSaveRes) {
              // Handle Mail save error
              if (mailSaveErr) {
                return done(mailSaveErr);
              }

              // Set assertions on new Mail
              (mailSaveRes.body.name).should.equal(mail.name);
              should.exist(mailSaveRes.body.user);
              should.equal(mailSaveRes.body.user._id, orphanId);

              // force the Mail to have an orphaned user reference
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

                    // Get the Mail
                    agent.get('/api/mails/' + mailSaveRes.body._id)
                      .expect(200)
                      .end(function (mailInfoErr, mailInfoRes) {
                        // Handle Mail error
                        if (mailInfoErr) {
                          return done(mailInfoErr);
                        }

                        // Set assertions
                        (mailInfoRes.body._id).should.equal(mailSaveRes.body._id);
                        (mailInfoRes.body.name).should.equal(mail.name);
                        should.equal(mailInfoRes.body.user, undefined);

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
      Mail.remove().exec(done);
    });
  });
});
