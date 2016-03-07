var crypto = require('crypto');
var app = require('../../../server/server.js');
var _ = require('underscore');
var loopback = require('loopback');
var debug = require('debug')('taxi-go:model');
module.exports = (function(){
  var Obj = {};
  var self = Obj;
  /**
   * [ApiSecretToken description]
   * @param {[type]} time [description]
   */
  Obj.ApiSecretToken =function (time){
    debug('util::ApiSecretToken Method Called');
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
  };
  /**
   * [getSearchLog description]
   * @param  {[type]}   referenceCode [description]
   * @param  {Function} callback      [description]
   * @return {[type]}                 [description]
   */
  Obj.getSearchLog = function (referenceCode,callback){
    debug('util::getSearchLog Method Called');
    if (typeof referenceCode !== 'string') return callback('Type Error!',null);
    var targetTableDict = {
      'HO_':'search_home',
      'CO_':'search_company',
      'NO_':'search_log',
      'HT_':'search_hotel',
      'AP_':'search_hotel'
    };
    var targetTable = targetTableDict[referenceCode.substr(0,3)];
    if (!targetTable) return callback('ReferenceCode Error!',null);
    app.models['DB_'+targetTable].findOne(
      {
        where:{
          'reference_code': referenceCode
        }
      },
      function getSearchLogCallback(err,searchLogInstance){
        // console.log('searchLog',searchLogInstance);
        callback(err,searchLogInstance);
      }
    );
  };
  Obj.parseAllOrderLocation = function (orderList,callback){
    if (!(orderList instanceof Array)){
      throw new TypeError('orderList shoud be an Array');
    }
    var errs = [];
    var returnWhenDone = _.after(orderList.length+1, function(){
      if(_.isEmpty(errs))errs = undefined;
      callback(errs,orderList);
    });
    _.each(orderList, function(orderDataObject, key, list){
      self.parseOrderLocation(orderDataObject,function (err,parsedOrderData){
        if(err) errs.push(err);
        returnWhenDone();
      });
    });
    returnWhenDone();
  };

  /**
   * [parseOrderLocation description]
   * @param  {[type]}   orderDataObject [description]
   * @param  {Function} callback        [description]
   * @return {[type]}                   [description]
   */
  Obj.parseOrderLocation = function (orderDataObject,callback){
    debug('util::parseOrderLocation Method Called');
    var callCounter = 0;
    var returnIfReady = function (){
      callCounter += 1;
      if (orderDataObject['start'] && orderDataObject['end']){
        return callback(null,orderDataObject);
      }
      if (callCounter === 2){
        return callback({
          code:'500',
          msg:'Internal Server error. parseOrderLocation Error.',
          data:'null'
        },null);
      }
    };
    self.getSearchLog(orderDataObject['starting_point'],function(err,searchLogInstance){
      orderDataObject['start'] = searchLogInstance;
      return returnIfReady();
    });
    self.getSearchLog(orderDataObject['destination'],function(err,searchLogInstance){
      orderDataObject['end'] = searchLogInstance;
      return returnIfReady();
    });
  };
  /**
   * [_error description]
   * @param  {[type]}   code [description]
   * @param  {[type]}   msg  [description]
   * @param  {[type]}   data [description]
   * @param  {Function} fn   [description]
   * @return {[type]}        [description]
   */
  Obj._error = function(code,msg,data,fn){
    debug('util::_error Method Called');
    return fn(null,{
      code:code,
      msg:msg,
      data:data
    });
  };
  /**
   * [returnServerError description]
   * @param  {[type]}   err [description]
   * @param  {Function} fn  [description]
   * @return {[type]}       [description]
   */
  Obj.returnServerError = function (err,fn){
    debug('util::returnServerError Method Called');
    return fn(null,{
      code:'500',
      msg:'Internal Server error',
      data:{err:err}
    });
  };
  /**
   * [returnStandardSuccessMsg description]
   * @param  {[type]}   data [description]
   * @param  {Function} fn   [description]
   * @return {[type]}        [description]
   */
  Obj.returnStandardSuccessMsg = function (data,fn){
    debug('util::returnStandardSuccessMsg Method Called');
    return fn(null,{
      code:'1',
      msg:'Success',
      data: data
    });
  };
  /**
   * [randomString description]
   * @param  {[type]} len     [description]
   * @param  {[type]} charSet [description]
   * @return {[type]}         [description]
   */
  Obj.randomString = function (len, charSet) {
    debug('util::randomString Method Called');
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var resultString = '';
    while(len>0) {
    // for (var i = 0; i < len; i++) {
      var randomPoz = Math.floor(Math.random() * charSet.length);
      resultString += charSet.substring(randomPoz,randomPoz+1);
      len -= 1;
    }
    return resultString;
  };
  /**
   * [getNearDrivers description]
   * @type {[type]}
   */
  Obj.getNearDrivers = require('./getNearDrivers.js');
  Obj.md5 = function (string){
    debug('util::md5 Method Called');
    return crypto.createHash('md5').update(string).digest('hex');
  };
  Obj.uniqid = require('./uniqid.js');
  Obj.getClientType = function(driverId,passengerId){
    debug('util::getClientType Method Called');
    // determine cancel type. - copied logic
    var cancelId,cancelType,realm;
    if(!_.isEmpty(driverId)){
      cancelId = driverId;
      cancelType = 'D';
      realm = 'driver';
    } else if(!_.isEmpty(passengerId)){
      cancelId = passengerId;
      cancelType = 'P';
      realm = 'passenger';
    }
    try{
      var ctx = loopback.getCurrentContext();
      var currentUser = ctx.get('currentUser');
      switch(currentUser['realm']){
        case 'driver':
          cancelType = 'D';
          cancelId = currentUser['realm_id'];
          break;
        case 'passenger':
          cancelType = 'P';
          cancelId = currentUser['realm_id'];
          break;
        default:
          break;
      }
    }catch(e){
      // console.log(e);
    }
    return {
      clientType: cancelType,
      clientId: cancelId,
      realm: realm,
    };
  };
  return Obj;
})();
