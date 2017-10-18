## loopback-my-sms-masking-connector

[SMSMasking](http://www.mysmsmasking.com/) connector for [LoopBack](http://www.loopback.io)

### Installation

In your LoopBack project:
    
    $ npm install --save loopback-my-sms-masking-connector

## Using the Connector
To use the connector, define the datasource using the connector in your `datasources.json` file:
    
    "SMSMasking": {
        "name": "SMSMasking",
        "connector": "loopback-my-sms-masking-connector",
        "url": "YOUR_SMSMasking_URL",
        "username": "YOUR_SMSMasking_USERNAME",
        "password": "YOUR_SMSMasking_PASSWORD"
    }
  
Next, attach the created datasource to a model in the `model-config.json` file:

    "SMSMasking": {
        "dataSource": "SMSMasking",
        "public": false
    }
    
Now, using the created model, you can send an SMS or make a call using the `send` method of the model:
    
    SMSMasking.send(options, callback);
    
**Note**: `options` is defined by the JSON objects in the next two sections:

### Sending a SMS Payload
    {
        to: 'Target Number',
        body: 'Text Massage'
    }

### Version
0.1.0

License
----

MIT