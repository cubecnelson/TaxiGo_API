var crypto = require('crypto');
module.exports = (function(){
  function ApiSecretToken (time){
    var API_SECRET = '2TatUM_JrpvYj2ubrWKN!qCmqGsn';
    // function gen
    var now,apiToken;
    function genNewToken(t){
      now = t || +new Date();
      apiToken = crypto.createHash('md5').update(now+API_SECRET).digest('hex');
    }
    genNewToken(time);
    var returnObject = {};
    Object.defineProperty(this,'api_send_time',{
      get: function(){return now;},
      // writable: false,
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(this,'api_token',{
      get: function(){return apiToken;},
      // writable: false,
      enumerable: true,
    });
    Object.defineProperty(this,'genNewToken',{
      value: genNewToken,
      // get: genNewToken,
      enumerable: false,
      writable: false
    });
    return this;
  }
  this.ApiSecretToken = ApiSecretToken;
  return this;
})();
