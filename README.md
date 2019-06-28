## loopback-connector-sms-generic

Generic SMS connector for [LoopBack](http://www.loopback.io)

### Installation

In your LoopBack project:
    
    $ npm install --save loopback-connector-sms-generic

## Using the Connector
To use the connector, define the datasource using the connector in your `datasources.json` file:
    
    "SMSGeneric": {
        "name": "SMSGeneric",
        "connector": "loopback-connector-sms-generic",
        "url": "YOUR_SMS_PROVIDER_API_URL",
        "username": "YOUR_SMS_PROVIDER_USERNAME",
        "password": "YOUR_SMS_PROVIDER_PASSWORD"
    }
  
Next, attach the created datasource to a model in the `model-config.json` file:

    "SMSModel": {
        "dataSource": "SMSGeneric",
        "public": false
    }
    
Now, using the created model, you can send an SMS or make a call using the `send` method of the model:
    
    SMSModel.send(options, callback);
    
**Note**: `options` is defined by the JSON objects in the next two sections:

### Sending a SMS Payload
All required query string parameters to be sent other than credentials in form of an object, for example:    
    
    {
        number: 'Target Number',
        ... ,
        message: 'Text Massage'
    }

### Version
0.1.0

License
----

MIT
