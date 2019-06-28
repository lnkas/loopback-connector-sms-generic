"use strict";

const assert = require("assert");
const smsGenericAPI = require("axios");

// let url, username, password;

/**
 * Export the SMSMaskingConnector class.
 */
module.exports = SMSGenericConnector;

function SMSGeneric() {}

/**
 * Create an instance of the connector with the given `settings`.
 */
function SMSGenericConnector(settings) {
  assert(
    typeof settings === "object",
    "cannot initialize SMSGenericConnector without a settings object"
  );

  SMSGeneric.url = settings.url;
  SMSGeneric.username = settings.username;
  SMSGeneric.password = settings.password;
}

SMSGenericConnector.initialize = function(dataSource, callback) {
  dataSource.connector = new SMSGenericConnector(dataSource.settings);
  callback();
};

SMSGenericConnector.prototype.DataAccessObject = SMSGeneric;

/**
 * Send a SMSGeneric message with the given `options`.
 */
SMSGeneric.send = ( opts, cb) => {

  var credentials = {
    username: SMSGeneric.username,
    password: SMSGeneric.password
  }
  var augmentedOpts = Object.assign( {}, credentials, opts );
  smsGenericAPI
    .get(`${SMSGeneric.url}`, {
      params: augmentedOpts
    })
    .then(
      result => {
        cb(null, result);
      },
      err => cb(err)
    );
};

/**
 * Initialize the connector for the given data source
 * @param {DataSource} dataSource The data source instance
 * @param {Function} [callback] The callback function
 */
exports.initialize = function initializeDataSource(dataSource, callback) {};

/**
 * Send using `modelInstance.send()`.
 */
SMSGeneric.prototype.send = function( opts, cb) {
  this.constructor.send( opts, cb, this);
};
