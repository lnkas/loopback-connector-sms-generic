"use strict";

const assert = require("assert");
const smsMaskingAPI = require("axios");

let username, password;

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

  smsMaskingAPI.defaults.baseURL = this.url = settings.url;
  this.smsMaskingAPI = smsMaskingAPI

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
SMSMasking.send= (destNo, message, cb, options) => {
  // Fire and forget, LOL
  options.smsMaskingAPI.get("masking/send.php", {
    params: {
      username: options.username,
      password: options.password,
      hp: destNo,
      message
    }
  });
  return;
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
 * Send using `modelInstance.sendSms()`.
 */

SMSMasking.prototype.send = function(destNo, message, cb) {
  this.constructor.send(destNo, message, cb, this);
};

