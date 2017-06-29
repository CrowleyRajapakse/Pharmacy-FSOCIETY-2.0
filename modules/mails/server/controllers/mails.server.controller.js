'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  config = require(path.resolve('./config/config')),
  mongoose = require('mongoose'),
  Mail = mongoose.model('Mail'),
  User = mongoose.model('User'),
  nodemailer = require('nodemailer'),
  sgTransport = require('nodemailer-sendgrid-transport'),
  async = require('async'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');
var smtpTransport = nodemailer.createTransport(config.mailer.options);

/**
 * Create a Mail
 */
exports.create = function(req, res,next) {
  var mail = new Mail(req.body);
  mail.user = req.user;
  async.waterfall([
    function (done) {
      mail.save(function(err) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          res.jsonp(mail);
        }
      });
    },
    function (user, done) {

      var httpTransport = 'http://';
      if (config.secure && config.secure.ssl === true) {
        httpTransport = 'https://';
      }
      res.render(path.resolve('modules/users/server/templates/reset-password-email'), {
        name: user.displayName,
        appName: config.app.title,
        url: httpTransport + req.headers.host + '/api/auth/reset/' + "1234"
      }, function (err, emailHTML) {
        done(err, emailHTML, user);
      });
    },
    function (emailHTML,mail, done) {
      var mailOptions = {
        to: mail.email,
        from: config.mailer.from,
        subject: mail.subject,
        text: mail.message,
        html: emailHTML
      };
      smtpTransport.sendMail(mailOptions, function (err) {
        if (!err) {
          res.send({
            message: 'An email has been sent to the provided email with further instructions.'
          });
        } else {
          return res.status(400).send({
            message: 'Failure sending email'
          });
        }

        done(err);
      });
    }
  ], function (err) {
    if (err) {
      return next(err);
    }
  });
};

exports.sendMails = function(req,res){
  var mail = req.mail;
  //mail.user = req.user;

  mail.sendEmail(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      var options = {
        auth: {
          api_key: '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'
        }
      };
      var mailOptions = {
        to: mail.email,
        from: config.mailer.from,
        subject: mail.subject,
        text: mail.message
      };
      var mailer = nodemailer.createTransport(sgTransport(options));
      mailer.sendMail(mailOptions, function (error) {
        if (!error) {
          console.log("Success");
          res.send({
            message: 'An email has been sent to the provided email with further instructions.'
          });
        } else {
          console.log("Error");
          return res.status(400).send({
            message: 'Failure sending email'
          });
        }
      });
    }
  });
  /*
  var mailOptions = {
    to: mail.email,
    from: config.mailer.from,
    subject: mail.subject,
    text: mail.message
  };
  smtpTransport.sendMail(mailOptions, function (err) {
    if (!err) {
      res.send({
        message: 'An email has been sent to the provided email with further instructions.'
      });
    } else {
      return res.status(400).send({
        message: 'Failure sending email'
      });
    }
  });
  */
};

/**
 * Show the current Mail
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var mail = req.mail ? req.mail.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  mail.isCurrentUserOwner = req.user && mail.user && mail.user._id.toString() === req.user._id.toString();

  res.jsonp(mail);
};

/**
 * Update a Mail
 */
exports.update = function(req, res) {
  var mail = req.mail;

  mail = _.extend(mail, req.body);

  mail.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(mail);
    }
  });
};

/**
 * Delete an Mail
 */
exports.delete = function(req, res) {
  var mail = req.mail;

  mail.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(mail);
    }
  });
};

/**
 * List of Mails
 */
exports.list = function(req, res) {
  Mail.find().sort('-created').populate('user', 'displayName').exec(function(err, mails) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(mails);
    }
  });
};

/**
 * Mail middleware
 */
exports.mailByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Mail is invalid'
    });
  }

  Mail.findById(id).populate('user', 'displayName').exec(function (err, mail) {
    if (err) {
      return next(err);
    } else if (!mail) {
      return res.status(404).send({
        message: 'No Mail with that identifier has been found'
      });
    }
    req.mail = mail;
    next();
  });
};
