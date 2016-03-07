var loopback = require('loopback');
var boot = require('loopback-boot');
var bodyParser = require('body-parser');
var multer = require('multer');
var defaultUploader = multer({dest:'uploads/'});
var repl = require('repl');

var app = module.exports = loopback();

// app.use(defaultUploader.single('file'));
var taxigoConfig = {
  'AUTO_DISTRIBUTION_DELAY': 15000
};

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
    if(process.argv[0].slice(-4) === 'node'){
      var REPL = repl.start('TaxiGOServer > ');
      REPL.context.app = app;
      // "Define Exit command"
      Object.defineProperty(REPL.context,'exit', {
        get:function(){process.exit();}
      });
    }
  });
};
// app.get('bower_components/',loopback.static('bower_components/'));
loopback.TransientModel = loopback.modelBuilder.define('TransientModel', {}, { idInjection: false });
app.taxigoConfig = taxigoConfig;
app.disable('x-powered-by');
app.use(function(req,res,next){
   res.header('x-powered-by' ,'www.sans.hk');
   next();
});
// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;
  require('./push-notification.js')(app);
  // start the server if `$ node server.js`
  if (require.main === module || process.isPackaged)
    app.start();
});
// setTimeout(function(){
  process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
    var ctx,path;
    try{
      ctx = loopback.getCurrentContext();
      if (ctx && ctx.req && ctx.req.path){
        path = ctx.req.path;
      }
    }catch(e){};
    app.models.AlertMail.send({
      to: app.get('AdminEmail'), // list of receivers
      subject: 'TaxiGO Fatal error. uncaughtException', // Subject line
      text: JSON.stringify(err,null, '\t'), // plaintext body
      html: '<html><head></head><body><pre>'+path+'\n'+JSON.stringify(err,null, '\t')+'\n'+err.stack+'</pre></body></html>' // html body
    });
  });
  process.on('unhandledRejection', function(err){
    var ctx,path;
    try{
      ctx = loopback.getCurrentContext();
      if (ctx && ctx.req && ctx.req.path){
        path = ctx.req.path;
      }
    }catch(e){};
    app.models.AlertMail.send({
      to: app.get('AdminEmail'), // list of receivers
      subject: 'TaxiGO Fatal error. unhandledRejection', // Subject line
      text: JSON.stringify(err,null, '\t'), // plaintext body
      html: '<html><head></head><body><pre>'+path+'\n'+JSON.stringify(err,null, '\t')+'\n'+err.stack+'</pre></body></html>' // html body
    });
  });
// },4000);