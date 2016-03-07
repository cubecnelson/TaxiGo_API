var G = require('../utils/utils.js');
var _ = require('underscore');
var loopback = require('loopback');
var rq = require('request-promise');
var queryString = require('query-string');

var debug = require('debug')('taxi-go:model:orderdistributor');
module.exports = function (OrderDistributor) {
  var OD = OrderDistributor;
  var apiLanguage = 'ZH-TW';
  var apiKey = 'AIzaSyAsroLZ-LF6xqPn0W4Na6BwjC7Knm05v3o';
  OD.assignOrder = function (req,orderId,driverId,fn){
    debug('OD::assignOrder Method Called');
    OD.app.models['DB_driver'].findById(driverId,function (err,driverInstance){
        if (err) return G.returnServerError(err,fn);
        if (driverInstance['driver_id'].toString() !== '0') return G._error('102', 'Cannot assign order',{}, fn);
        if (_.isEmpty(driverInstance)) return G._error('102', 'No record : Driver ID not found',{}, fn);
        switch (driverInstance['status'].toString()){
          case '0':
          case '2':
          case '3':
            return G._error('102','Driver not able to take order',{},fn);
          case '1':
            driverInstance.updateAttributes({
              'status'      : '2',
              'waitting_id' : orderId.toString(),
            },function (err,updateDriverInstance){
              if(err) return G.returnServerError(err,fn);
              OD.app.models['DB_passenger_order'].findById(orderId,function (err,orderInstance){
                if(err) return G.returnServerError(err,fn);
                return orderInstance.updateAttributes({
                  'driver_id':driverInstance['id']
                },function (err,updatedOrderInstance){
                  if(err)return G.returnServerError(err,fn);
                  return G.returnStandardSuccessMsg({},fn);
                });
              });
            });
            break;
        }
      });
    };
  OD.assign = function (orderId,driverId,fn){
    OD.app.models['DB_driver'].findById(driverId,function (err,driverInstance){
      if (err) return G.returnServerError(err,fn);
      if (!driverInstance) return G._error('404','DRIVER_NOT_FOUND',{},fn);
      OD.app.models['DB_view_order_driver'].findOne({
        where:{
          'id': orderId,
          'driver_id': driverId
        }
      },function (err,orderDriverInstance){
        if (err) return G.returnServerError(err,fn);
        if (orderDriverInstance && orderDriverInstance.length){
          return G._error('105','DRIVER_ALREADY_ASSIGNED',{},fn);
        } else {
          OD.app.models['DB_order_pool'].create({
            'order_id': orderId,
            'driver_id': driverId,
            'distributor_status': 'ASSIGNED'
          },function (err,orderPoolInstance){
            if (err) return G.returnServerError(err,fn);
            return G.returnStandardSuccessMsg({'order_distribute_data':orderPoolInstance},fn);
          });
        }
      });
    });
  };
  OD.getOrders = function (fn){
    var ctx = loopback.getCurrentContext();
    var currentUser = ctx.get('currentUser');
    OD.app.models['DB_view_order_driver'].find({
      where:{
        'driver_id': currentUser['realm_id'],
        'driver_order_status': {
          inq:[
            'WAITING',
            'ASSIGNED',
          ]
        }
      }
    },function (err,driverOrderInstances){
      if (err) return G.returnServerError(err,fn);
      G.parseAllOrderLocation(driverOrderInstances,function (err,parsedOrderInstances){
        if (err) return G.returnServerError(err,fn);
        return G.returnStandardSuccessMsg({'order_list':parsedOrderInstances},fn);
      });
    });
  };
  OD.rejectOrderCall = function (driverId,fn){
    OD.app.models['DB_order_pool'].updateAll({
      'driver_id': driverId,
      'distributor_status': {
        inq:[
          'WAITING',
          'ASSIGNED',
        ]
      },
    },{
      'distributor_status': 'REJECTED',
    },fn);
  };
  OD.rejectOrder = function (fn){
    var ctx = loopback.getCurrentContext();
    var currentUser = ctx.get('currentUser');
    if (currentUser.realm !== 'driver')  return G._error('401','USER_REALM_INCORRECT',{},fn);
    if (currentUser.realm === 'driver' && currentUser['realm_id']){
      OD.app.models['DB_driver'].findById(currentUser['realm_id'],function (err,driverInstance){
        if (driverInstance['status'] == '2'){
          var currentOrderId = driverInstance['waitting_id'];
          // Cancel driver-binding
          OD.app.models['DB_passenger_order'].updateAll({
            'id': currentOrderId,
            'driver_id':  currentUser['realm_id'] 
          },{
            'driver_id':'',
            'distributor_status':'STARTED',
          },function (err,result){});

          driverInstance.updateAttributes({
            'status':'1',
            'waitting_id':''
          },function (err,updateDriverInstance){
            var returningData ={};
            returningData['driver_data'] = {
              'id': updateDriverInstance['id'],
              'name': updateDriverInstance['name'],
              'during': updateDriverInstance['during'],
              'direction': updateDriverInstance['direction'],
              'status': updateDriverInstance['status'],
              'waitting_id': updateDriverInstance['waitting_id'],
              'driver_type': updateDriverInstance['driver_type'],
              'loc_str': '',
            };
            try{
              returningData.driver['loc_str'] = JSON.parse(driverInstance['loc_str']);
            }catch(e){ returningData['loc_str'] = {}; }
            return G.returnStandardSuccessMsg(returningData,fn);
          });
        } else {
          OD.app.models['DB_order_pool'].updateAll({
            'driver_id': currentUser['realm_id'],
            'distributor_status': {
              inq:[
                'WAITING',
                'ASSIGNED',
              ]
            },
          },{
            'distributor_status': 'REJECTED',
          },function(err,updateResult){
            return G.returnStandardSuccessMsg(updateResult,fn);
          });
        }
      });   
    }
  };
  /**
   * OD.takeOrder
   * Call when 
   * [order::driverReply:Y]
   * 
   * @param  {[type]}   orderId [description]
   * @param  {Function} fn      [description]
   * @return {[type]}           [description]
   */
  OD.takeOrder = function (orderId,fn){
    var ctx = loopback.getCurrentContext();
    var currentUser = ctx.get('currentUser');
    if (!currentUser) return G._error('401','LOGIN_REQUIRED',{},fn);
    if (currentUser.realm !== 'driver') return G._error('403','USER_REALM_INCORRECT',{},fn);
    // if (currentUser.realm === 'driver' && currentUser['realm_id']){
    OD.app.models['DB_passenger_order'].findById(orderId,function (err,orderInstance) {
      if (orderInstance['distributor_status'] === 'FINISHED' || orderInstance['status'].toString() !== '2' ){
       return G._error('508','ORDER_DISTRIBUTION_FINISHED',{},fn);
      }
      orderInstance.updateAttributes({
        'distributor_status': 'FINISHED',
        'driver_id': currentUser['realm_id'],
        'status': '3',
      },function (err,updatedOrderInstance){
        if (err) return G.returnServerError(err,fn);
        OD.app.models['DB_passenger'].findById(orderInstance['passenger_id'],function (err,passengerInstance){
          if (err) return G.returnServerError(err,fn);
          OD.app.models['DB_driver'].findById(currentUser['realm_id'],function (err,driverInstance){
            if (err) return G.returnServerError(err,fn);
            passengerInstance.updateAttributes({'status':'3'});
            OD.app.models['DB_order_pool'].updateAll({
              'order_id': orderId,
              'driver_id': currentUser['realm_id']
            });
            driverInstance.updateAttributes({'status':'3','waitting_id':orderId},function (err,updateDriverInstance){
              var returningDriverInstance = {
                'id': updatedOrderInstance['id'],
                'name': updatedOrderInstance['name'],
                'loc_str': updatedOrderInstance['loc_str'],
                'during': updatedOrderInstance['during'],
                'direction': updatedOrderInstance['direction'],
                'status': updatedOrderInstance['status'],
                'waitting_id': updatedOrderInstance['waitting_id'],
                'driver_type': updatedOrderInstance['driver_type'],
                'family_name': updatedOrderInstance['family_name'],
                'given_name': updatedOrderInstance['given_name'],
              };
              try{
                returningDriverInstance['loc_str'] = JSON.parse(returningDriverInstance['loc_str']);
              }catch(e){
                returningDriverInstance['loc_str'] = {};
              }
              G.parseOrderLocation(updatedOrderInstance,function (err,orderDataObject){
                if (err) return G.returnServerError(err,fn);
                return G.returnStandardSuccessMsg({
                  'order_data': orderDataObject,
                  'driver_data': returningDriverInstance,
                  'passenger_data': {
                    'title' : passengerInstance.title,
                    'family_name': passengerInstance['family_name'],
                    'given_name': passengerInstance['given_name'],
                    'country_code': passengerInstance['country_code'],
                    'tel': passengerInstance['tel'],
                  }
                },fn);
              });
            });
          });
        });
      });
    });
  };
  OD.confirmOrder = function (orderId,fn){
    var ctx = loopback.getCurrentContext();
    var currentUser = ctx.get('currentUser');
  };
  OD.relaseOrder = function (orderId,fn){

  };
  OD.hardAssign = function (orderId,driverId,fn){
    OD.app.models['DB_driver'].findById(driverId,function (err,driverInstance){
      if (err) return G.returnServerError(err,fn);
      if (!driverInstance) return G._error('404','DRIVER_NOT_FOUND',{},fn);
      OD.app.models['DB_view_order_driver'].findOne({
        where:{
          'id': orderId,
          'driver_id': driverId
        }
      },function (err,orderDriverInstance){
        if (err) return G.returnServerError(err,fn);
        if (orderDriverInstance && orderDriverInstance.length){
          return G._error('405','CANNOT_ASSIGN_AGAIN',{},fn);
        } else {
          OD.app.models['DB_order_pool'].findOrCreate({
            'order_id': orderId,
            'driver_id': driverId,
          },function (err,orderPoolInstance){
            if (err) return G.returnServerError(err,fn);
            orderPoolInstance.updateAttributes({'distributor_status': 'ASSIGNED'});
            OD.app.models['DB_driver'].updateAll({
              'id': driverId,
              'status': '1'
            },{
              'status': '2',
              'waitting_id': orderId,
            },function (err,updateResult){
              debug('DB_driver Updated');
              debug(updateResult);
              if (err) return G.returnServerError(err,fn);
              if (updateResult.count){
                OD.app.models['DB_passenger_order'].updateAll({
                  id: orderId,
                },{
                  'driver_id': driverId,
                  'distributor_status': 'MANUAL'
                },function (err,orderUpdateResult){

                  return G.returnStandardSuccessMsg({},fn);
                });
              }else {
                return G._error('104','FAIL_HARD_ASSIGN_ORDER',{},fn);
              }
            });
            // G.returnStandardSuccessMsg({'order_distribute_data':orderPoolInstance},fn);
          });
        }
      });
    });
  };
  OD.archive = function (orderId,fn){
    debug('OD::archive Method Called');
    /* this method should sammurize the order pool and cleanup unnecessary records inside */
    OD.find({
      where:{'order_id':orderId}
    },function (err, orderPoolInstances){
      
    });
  };
  OD.autoDistribute = function (orderId,options,fn){
    debug('OD::autoDistribute Method Called');

  };
  OD.autoDistributeOrder = function(orderInstance,fn){
    debug('OD::autoDistributeOrder Method Called');
  /* this method should distribute the order accounding to the order distribution logic defined. */

    OD.app.models['DB_driver'].find({
      'where': {
        'status': '1',
      }
    });
  };
  OD.evaulater = function (OrderInstance){

  };
  OD.setManual = function (orderId,fn){
    OD.app.models['DB_passenger_order'].findById(orderId, function (err,orderInstance){
      if (err) return G.returnServerError(err,fn);
      orderInstance = orderInstance || {};
      if(['NOT_STARTED','STARTED'].indexOf(orderInstance['distributor_status']) > -1){
        orderInstance.updateAttributes({'distributor_status':'MANUAL'});
        return;
      }
    });
  };
  OD.kickOff = function (orderId,fn){
    OD.app.models['DB_passenger_order'].findById(orderId,function (err,orderInstance){
      if(orderInstance['distributor_status'] === 'NOT_STARTED'){
        orderInstance.updateAttributes({
          'distributor_status': 'STARTED'
        },function (err,updateAllReturnObj){
          fn(err,updateAllReturnObj);
        });
      } else {
        fn(null,{});
      }
    });
  };
  OD.getCurrentOrders = function (fn){
    var ctx = loopback.getCurrentContext();
    var currentUser = ctx.get('currentUser');
    

  };
  OD.startDistribute = function (orderId,fn){
    OD.app.models['DB_passenger_order'].findById(orderId,function (err,orderInstance){
      orderInstance.updateAll({
        id: orderId,
      },{
        'distributor_status': 'STARTED'
      },function (err,updateAllReturnObj){
        if (updateAllReturnObj.count) {
          return G.returnStandardSuccessMsg({},fn);
        } else {
          return G._error('404','no order updated',{},fn);
        }
      });
    });
  };
  OD.getAssignedOrders = function (driverId,fn){
    return OD.app.models['DB_view_order_driver'].find({
      where:{
        'driver_id': driverId,
      }
    });
  };
  /**
   * aquireOrder
   * For drivers to get orders from pool.
   * @param  {[type]}   options [description]
   * @param  {Function} fn      [description]
   * @return {[type]}           [description]
   */
  OD.aquireOrders = function (options,fn){
    debug('OD::aquireOrders Method Called');
    options = options || {};
    var ctx = loopback.getCurrentContext();
    var currentUser = ctx.get('currentUser');
    if (!currentUser) return G._error('401','LOGIN_REQUIRED',{},fn);
    OD.app.models['DB_'+currentUser.realm].findById(currentUser['realm_id'],function (err,driverInstance){
      if(!driverInstance) return G._error('404','DRIVER_NOT_FOUND',{},fn);
      if(driverInstance['status']=='2'){
        OD.app.models['DB_passenger_order'].find({'id':driverInstance['waitting_id']},function (err,orderInstances){
          G.parseAllOrderLocation(orderInstances,function (err,result){
            if (err) return G.returnServerError(err,fn);
            return G._error('102','DIRVER_ALREADY_ASSIGNED',{'order_list':orderInstances},fn);
          });
        });
        return;
      }
      if(!driverInstance['loc_x'] || !driverInstance['loc_y']) return G._error('400','DRIVER_LOCATION_INCORRECT',{},fn);
      OD.rejectOrder(function(err,callback){});
      OD.app.models['order_pool'].find({
        where:{
          'driver_id': currentUser['realm_id'],
          // 'distributor_status': {
          //   inq:['REJECTED','TIMEOUT']
          // }
        }
      },function (err,orderIdObjs){
        orderIdObjs = orderIdObjs || [];
        var orderIds = orderIdObjs.map(function (i){return i['order_id'];});
        OD.app.models['DB_passenger_order'].find({
          where:{
            'status': 2,
            'distributor_status': 'STARTED',
            'id':{
              nin:orderIds
            }
          }
        },function (err,orderInstances){
          if (!orderInstances){
            return G.returnStandardSuccessMsg({'order_list':[]},fn);
          }
          orderInstances = orderInstances || [];
          var orderEvaluation = {};
          if (driverInstance['driver_type']!='1'){
            orderInstances = orderInstances.filter(function(item){
              return item['require_vip'] === 0;
            });
          }
          var orderIdList = orderInstances.map(function (orderInstance){ 
            orderEvaluation[orderInstance['id']] = {};
            return orderInstance['id'];
          });

          OD.app.models['DB_view_order_distributor'].find({
            where:{
              id:{
                inq: orderIdList
              }
            }
          },function (err, viewOrderDistributorInstances){
            viewOrderDistributorInstances = viewOrderDistributorInstances || [];
            var viewOrderIdList = viewOrderDistributorInstances.map(function (orderInstance){ return orderInstance['id'];});
            var sortedInstance = _.sortBy(orderInstances, function(orderInstance){ 
              var distributeCount = 0;
              /* Counting */
              var dX = Math.abs(Math.abs(orderInstance['start_x'])-Math.abs(driverInstance['loc_x']))*100;
              var dY = Math.abs(Math.abs(orderInstance['start_y'])-Math.abs(driverInstance['loc_y']))*100;
              if (viewOrderIdList.indexOf(orderInstance.id)>0){
                distributeCount = 1;
              }
              return dX+dY+distributeCount;
            });
            var returningInstances = sortedInstance.splice(0,3);
            for (var i = 0; i < returningInstances.length; i += 1) {
              OD.app.models['DB_order_pool'].create({
                'order_id': returningInstances[i].id,
                'driver_id': currentUser['realm_id'],
                'distributor_status': 'WAITING'
              });
            }
            /* !!HEAD!! Order Sorting Logic !! */ 
            G.parseAllOrderLocation(returningInstances,function (err,result){
              return G.returnStandardSuccessMsg({'order_list':returningInstances.splice(0,3)},fn);
            });
          });
        });
      });
    });
  };
  OD.remoteMethod(
    'aquireOrders',
    {
      description: 'Aquire orders from server.',
      accepts: [
        {arg: 'options', type: 'object', description: 'Order id.', required: false}
      ],
      returns:[
        {arg: 'data', type:'standardResponse', description: 'Standard Response Object', root: true},
      ], 
      http: [
        {verb: 'post', path: '/aquireOrders'}
      ]
    }
  );
  
  
  OD.remoteMethod(
    'assign',
    {
      description: 'Assign an order to driver.',
      accepts: [
        {arg: 'orderId', type: 'string', description: 'Order id.', required: true},
        {arg: 'driverId', type: 'string', description: 'Driver id.', required: true},
      ],
      returns:[
        {arg: 'data', type:'standardResponse', description: 'Standard Response Object', root: true},
      ], 
      http: [
        {verb: 'post', path: '/assign'}
      ]
    }
  );

  OD.remoteMethod(
    'hardAssign',
    {
      description: 'Force assign an order to driver (kick into status 2).',
      accepts: [
        {arg: 'order_id', type: 'string', description: 'Order id.', required: true},
        {arg: 'driver_id', type: 'string', description: 'Driver id.', required: true},
      ],
      returns:[
        {arg: 'data', type:'standardResponse', description: 'Standard Response Object', root: true},
      ], 
      http: [
        {verb: 'post', path: '/hardAssign'}
      ]
    }
  );

  OD.remoteMethod(
    'takeOrder',
    {
      description: 'Force assign an order to driver (kick into status 2).**Required Driver Login**',
      accepts: [
        {arg: 'orderId', type: 'string', description: 'Order id.', required: true},
      ],
      returns:[
        {arg: 'data', type:'standardResponse', description: 'Standard Response Object', root: true},
      ], 
      http: [
        {verb: 'post', path: '/takeOrder'}
      ]
    }
  );
  OD.remoteMethod(
    'rejectOrder',
    {
      description: 'Rejecting an order. Get off status 2 if assigned an order. **Required Driver Login**',
      accepts: [],
      returns:[
        {arg: 'data', type:'standardResponse', description: 'Standard Response Object', root: true},
      ], 
      http: [
        {verb: 'post', path: '/rejectOrder'}
      ]
    }
  );
  OD.remoteMethod(
    'getOrders',
    {
      description: 'get current assigned orders',
      accepts: [
      ],
      returns:[
        {arg: 'data', type:'standardResponse', description: 'Standard Response Object', root: true},
      ], 
      http: [
        {verb: 'post', path: '/getOrders'}
      ]
    }
  );
};
