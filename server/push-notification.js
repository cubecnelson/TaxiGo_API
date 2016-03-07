module.exports = function (app) {
  var Notification = app.models.notification;
  var Application = app.models.application;
  var PushModel = app.models.push;

  function startPushServer() {
// Add our custom routes
    var badge = 1;
    app.post('/notify/:id', function (req, res, next) {
      var note = new Notification({
        expirationInterval: 3600, // Expires 1 hour from now.
        badge: badge++,
        sound: 'ping.aiff',
        alert: '\uD83D\uDCE7 \u2709 ' + 'Hello',
        messageFrom: 'Ray'
      });

      PushModel.notifyById(req.params.id, note, function (err) {
        if (err) {
          console.error('Cannot notify %j: %s', req.params.id, err.stack);
          next(err);
          return;
        }
        console.log('pushing notification to %j', req.params.id);
        res.send(200, 'OK');
      });
    });

    PushModel.on('error', function (err) {
      console.error('Push Notification error: ', err.stack);
    });

// Pre-register an application that is ready to be used for testing.
// You should tweak config options in ./config.js

    var config = require('./push-apps/ios-driver/');

    var driverApp = {
      id: 'taxigo-driver-app',
      userId: 'strongloop',
      name: config.appName,

      description: 'LoopBack Push Notification Demo Application',
      pushSettings: {
        apns: {
          gateway: 'gateway.sandbox.push.apple.com',
          certData: config.apnsCertData,
          keyData: config.apnsKeyData,
          // cert: config.apns.cert,
          // key: config.apns.key,
          pushOptions: {
            gateway: 'gateway.sandbox.push.apple.com',
            // cert: config.apns.cert,
            // key: config.apns.key,
            port: 2195
            // Extra options can go here for APN
          },
          feedbackOptions: {
            gateway: 'feedback.sandbox.push.apple.com',
            port:2196,
            batchFeedback: true,
            interval: 300
          }
        },
        gcm: {
          // serverApiKey: config.gcmServerApiKey
            serverApiKey: 'AIzaSyBlRGg4MskfHkzvFZLDQL9F98dwKYiePZ8'
        }
      }
    };

    updateOrCreateApp(function (err, appModel) {
      if (err) {
        throw err;
      }
      console.log('Application id: %j', appModel.id);
    });

//--- Helper functions ---
    function updateOrCreateApp(cb) {
      Application.findOne({
          where: { id: driverApp.id }
        },
        function (err, result) {
          if (err) cb(err);
          if (result) {
            console.log('Updating application: ' + result.id);
            delete driverApp.id;
            result.updateAttributes(driverApp, cb);
          } else {
            return registerApp(cb);
          }
        });
    }

    function registerApp(cb) {
      console.log('Registering a new Application...');
      // Hack to set the app id to a fixed value so that we don't have to change
      // the client settings
      Application.beforeSave = function (next) {
        if (this.name === driverApp.name) {
          this.id = 'taxigo-driver-app';
        }
        next();
      };
      Application.register(
        driverApp.userId,
        driverApp.name,
        {
          description: driverApp.description,
          pushSettings: driverApp.pushSettings
        },
        function (err, app) {
          if (err) {
            return cb(err);
          }
          return cb(null, app);
        }
      );
    }
  }

  startPushServer();
};
