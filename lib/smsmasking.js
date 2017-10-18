"use strict";

const assert = require("assert");
const smsMaskingAPI = require("axios");

let smsMaskingClient, url, username, password;

/**
 * Export the SMSMaskingConnector class.
 */
module.exports = SMSMaskingConnector;

/**
 * Create an instance of the connector with the given `settings`.
 */
function SMSMaskingConnector(settings) {
  assert(
    typeof settings === "object",
    "cannot initialize SMSMaskingConnector without a settings object"
  );

  url = this.url = settings.url;
  username = this.username = settings.username;
  password = this.password = settings.password;
}

SMSMaskingConnector.initialize = function(dataSource, callback) {
  dataSource.connector = new SMSMaskingConnector(dataSource.settings);
  callback();
};

SMSMaskingConnector.prototype.DataAccessObject = SMSMasking;

function SMSMasking() {}

/**
 * Send a SMSMasking message with the given `options`.
 */
SMSMasking.send = ({ to, body }, cb) => {
  // Fire and forget, LOL
  smsMaskingAPI
    .get(`${url}masking/send.php`, {
      params: {
        username: username,
        password: password,
        hp: to,
        message: body,
      }
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
exports.initialize = function initializeDataSource(dataSource, callback) {
  console.log("Happy coding :)");
};

/**
 * Send using `modelInstance.send()`.
 */
SMSMasking.prototype.send = function({ to, body }, cb) {
  this.constructor.send({ to, body }, cb, this);
};

/**
 * Access the twilio client object.
 */
SMSMaskingConnector.client;
SMSMaskingConnector.prototype.client = SMSMasking.client = SMSMasking.prototype.client = smsMaskingClient;
