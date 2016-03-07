/*!
 * Module dependencies.
 */

var loopback = require('loopback');
var async = require('async');
// var deprecate = require('depd')('loopback');

/*!
 * Export the middleware.
 */

module.exports = rest;

/**
 * Expose models over REST.
 *
 * For example:
 * ```js
 * app.use(loopback.rest());
 * ```
 * For more information, see [Exposing models over a REST API](http://docs.strongloop.com/display/DOC/Exposing+models+over+a+REST+API).
 * @header loopback.rest()
 */

function rest() {
  var handlers; // Cached handlers

  return function restApiHandler(req, res, next) {
    var app = req.app;
    var registry = app.registry;

    // added for https://github.com/strongloop/loopback/issues/1134
    if (app.get('legacyExplorer') !== false) {
      console.log(
        'Routes "/methods" and "/models" are considered dangerous and should not be used.\n' +
        'Disable them by setting "legacyExplorer=false" in "server/config.json" or via "app.set()".'
      );
      if (req.url === '/routes') {
        return res.send(app.handler('rest').adapter.allRoutes());
      } else if (req.url === '/models') {
        return res.send(app.remotes().toJSON());
      }
    }

    if (!handlers) {
      handlers = [];
      var remotingOptions = app.get('remoting') || {};

      var contextOptions = remotingOptions.context;
      if (contextOptions !== false) {
        if (typeof contextOptions !== 'object') {
          contextOptions = {};
        }
        handlers.push(loopback.context(contextOptions));
      }

      if (app.isAuthEnabled) {
        var AccessToken = registry.getModelByType('AccessToken');
        handlers.push(loopback.token({ model: AccessToken, app: app ,currentUserLiteral:'me'}));
        handlers.push(function setCurrentUser(req, res, next) {
          if (!req.accessToken) {
            return next();
          }
          app.models.taxiGoUsers.findById(req.accessToken.userId, function(err, user) {
            if (err) {
              return next(err);
            }
            var loopbackContext = loopback.getCurrentContext();
            if (!user) {
              // return next(new Error('No user with this access token was found.'));
              loopbackContext.set('currentUser', false);
              return next();
            }
            
            if (loopbackContext) {
              loopbackContext.set('currentUser', user);
            }
            next();
          });
        });
      }

      handlers.push(function(req, res, next) {
        // Need to get an instance of the REST handler per request
        return app.handler('rest')(req, res, next);
      });
    }
    if (handlers.length === 1) {
      return handlers[0](req, res, next);
    }
    async.eachSeries(handlers, function(handler, done) {
      handler(req, res, done);
    }, next);
  };
}
