var G = require('./utils/utils.js');
var _ = require('underscore');
var rq = require('request-promise');
var queryString = require('query-string');
var debug = require('debug')('taxi-go:model');
module.exports = function(AdminTools) {
  AdminTools.ajaxData = function (req,types,fn){
    debug('AdminTools::ajaxData Method Called');
    var outputBuffer = '';
    switch(types){
      case 'order':
        AdminTools.app.models['DB_view_order'].find(function (err,viewOrderInstances){
          if (err) return G.returnServerError(err,fn);
          var totalOrdersLeft = viewOrderInstances.length;
          if (totalOrdersLeft === 0) return G.returnStandardSuccessMsg({
            orders: []
          },fn);
          function parseLocationCb(j){

            return function returnWhenReady(err,returnedObject){
              viewOrderInstances[j] = returnedObject;
              totalOrdersLeft -= 1;
              if (totalOrdersLeft === 0) {
                return G.returnStandardSuccessMsg({
                  orders: viewOrderInstances
                },fn);
              }

            };

          }
          
          var i = viewOrderInstances.length -1;
          for (i; i >= 0; i--) {
            G.parseOrderLocation(viewOrderInstances[i],parseLocationCb(viewOrderInstances[i]));
          }
        });
        break;
      case 'driver':
        AdminTools.app.models['DB_driver'].find({
          // where:{
          //   'status':'1',
          //   'driver_type':'1',
          // },
          fields:{
            // 'loc_str':false,
            'verification':false,
            'user_token':false,
          }
        },function (err,drivers){
          if (err) return G.returnServerError(err,fn);
          return G.returnStandardSuccessMsg({
            drivers:drivers
          },fn);
        });
        break;
      case 'waiting_order':
        AdminTools.app.models['DB_view_waiting_orders'].find(function (err,viewOrderInstances){
          if (err) return G.returnServerError(err,fn);
          return G.returnStandardSuccessMsg({
            orders: viewOrderInstances
          },fn);
        });
        break;
      case 'waiting_normal_order':
        AdminTools.app.models['DB_view_normal_orders'].find(function (err,viewOrderInstances){
          if (err) return G.returnServerError(err,fn);
          return G.returnStandardSuccessMsg({
            orders: viewOrderInstances
          },fn);
        });
        break;
      case 'success_order':
        AdminTools.app.models['DB_view_success_orders'].find({
          limit: req.body.limit||15,
          order:'id DESC'
        },function (err,viewOrderInstances){
          if (err) return G.returnServerError(err,fn);
          return G.returnStandardSuccessMsg({
            orders: viewOrderInstances
          },fn);

          // var totalOrdersLeft = viewOrderInstances.length;
          // if (totalOrdersLeft === 0) return G.returnStandardSuccessMsg({
          //   orders: []
          // },fn);

          // function returnWhenReady(err,returnedObject){
          //   totalOrdersLeft -= 1;
          //   if (totalOrdersLeft === 0) {
          //     return G.returnStandardSuccessMsg({
          //       orders: viewOrderInstances
          //     },fn);
          //   }

          // }
          // var i = viewOrderInstances.length -1;
          // for (i; i >= 0; i--) {
          //   G.parseOrderLocation(viewOrderInstances[i],returnWhenReady);
          // }
        });
        break;
      case 'complete_order':
        AdminTools.app.models['DB_view_complete_orders'].find({
            limit: req.body.limit||15,
            order:'id DESC'
          },function (err,viewOrderInstances){
          if (err) return G.returnServerError(err,fn);
          return G.returnStandardSuccessMsg({
            orders: viewOrderInstances
          },fn);

          // var totalOrdersLeft = viewOrderInstances.length;
          // if (totalOrdersLeft === 0) return G.returnStandardSuccessMsg({
          //   orders: []
          // },fn);

          // function returnWhenReady(err,returnedObject){
          //   totalOrdersLeft -= 1;
          //   if (totalOrdersLeft === 0) {
          //     return G.returnStandardSuccessMsg({
          //       orders: viewOrderInstances
          //     },fn);
          //   }

          // }
          // var i = viewOrderInstances.length -1;
          // for (i; i >= 0; i--) {
          //   G.parseOrderLocation(viewOrderInstances[i],returnWhenReady);
          // }
        });
        break;
      case 'cancel_order':
        AdminTools.app.models['DB_view_cancel_orders'].find({
            limit: req.body.limit||15,
            order:'id DESC'
          },function (err,viewOrderInstances){
          if (err) return G.returnServerError(err,fn);
          return G.returnStandardSuccessMsg({
            orders: viewOrderInstances
          },fn);

          // var totalOrdersLeft = viewOrderInstances.length;
          // if (totalOrdersLeft === 0) return G.returnStandardSuccessMsg({
          //   orders: []
          // },fn);

          // function returnWhenReady(err,returnedObject){
          //   totalOrdersLeft -= 1;
          //   if (totalOrdersLeft === 0) {
          //     return G.returnStandardSuccessMsg({
          //       orders: viewOrderInstances
          //     },fn);
          //   }

          // }
          // var i = viewOrderInstances.length -1;
          // for (i; i >= 0; i--) {
          //   G.parseOrderLocation(viewOrderInstances[i],returnWhenReady);
          // }
        });
        break;
      default:
        return G._error('102','type undefined',{},fn);
    }
  };
  AdminTools.resetAllStatus = function (fn){
    debug('AdminTools::resetAllStatus Method Called');

  };
  AdminTools.getSearchLog = function (referenceCode,callback){
    debug('AdminTools::getSearchLog Method Called');
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
    AdminTools.app.models['DB_'+targetTable].findOne(
      {
        where:{
          'reference_code': referenceCode
        }
      },
      function getSearchLogCallback(err,searchLogInstance){
        callback(err,searchLogInstance);
      }
    );
  };
  AdminTools.notify = function (where,msg,fn){
    if(AdminTools.app.models.push){
      return AdminTools.app.models.push.notifyByQuery(
        where,
        new AdminTools.app.models.notification({
          expirationInterval:3600,
          badge:1,
          alert: msg,
          sound: 'ping.aiff',
          messageFrom: 'TaxiGo'
        }),
        fn);
    } else {
      fn(new Error('Push model undefined'));
    }
  };
  AdminTools.remoteMethod(
    'ajaxData',
    {
      description: 'For debugging',
      accepts: [
        {arg: 'req', type: 'object' , http:{source:'req'} }, 
        {arg: 'types', type: 'string' },
      ],
      returns:[
        {arg: 'data', type: 'standardResponse', description: 'Taxi-GO standard return object.',root:true},
      ],
      http: [
        {verb: 'post', path: '/ajaxData'},
      ],
      notes: [
       'For update passenger\'s infomation from client side.'
      ] 
    }
  );
  AdminTools.remoteMethod(
    'getSearchLog',
    {
      description: 'For debugging',
      accepts: [
        {arg: 'reference_code', type: 'string' }, 
      ],
      returns:[
        {arg: 'data', type: 'object', description: 'searchLogInstance',root:true},
      ],
      http: [
        {verb: 'post', path: '/getSearchLog'},
      ],
      notes: [
       'For update passenger\'s infomation from client side.'
      ] 
    }
  );
  AdminTools.remoteMethod(
    'notify',
    {
      description: 'Send notification to users',
      accepts: [
        {arg: 'where', type: 'object' }, 
        {arg: 'message', type: 'string' },
      ],
      returns:[
        {arg: 'data', type: 'standardResponse', description: 'Taxi-GO standard return object.',root:true},
      ],
      http: [
        {verb: 'post', path: '/notify'},
      ],
      notes: [
       'For update passenger\'s infomation from client side.'
      ] 
    }
  );
};
