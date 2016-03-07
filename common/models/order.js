var _ = require('underscore');
var G = require('./utils/utils.js');
var loopback = require('loopback');
var events = require('events');

var debug = require('debug')('taxi-go:model:order');
module.exports = function(Order) {
  Order.getMyRecords = function (filter,fn){
    debug('Order::getMyRecords Method Called');
    filter = filter || {};
    var ctx = loopback.getCurrentContext();
    var currentUser = ctx.get('currentUser');

    if (currentUser){
      switch(currentUser.realm){
        case 'driver':
        _.extend(filter,{
          where:{
            'driver_id': currentUser['realm_id']
          }
        });
        break;
        case 'passenger':
        _.extend(filter,{
          where:{
            'passenger_id': currentUser['realm_id']
          }
        });
      }
      _.extend(filter,{
        limit: filter.limit || 100,
      });
      Order.app.models['DB_passenger_order'].find(filter,function (err,passengerOrderInstances){
        passengerOrderInstances = passengerOrderInstances || [];
        var returnWhenReady = _.after(passengerOrderInstances.length+1,function(){
          return G.returnStandardSuccessMsg({'orders':passengerOrderInstances},fn);
        });
        _.each(passengerOrderInstances, function(passengerOrderInstance, key, list){
          G.parseOrderLocation(passengerOrderInstance,function(){
            return returnWhenReady();  
          });
        });
        return returnWhenReady();
      });
    }
  };
  /**
   * [cancelOrder description]
   * @param  {[type]}   req         [description]
   * @param  {[type]}   orderId     [description]
   * @param  {[type]}   driverId    [description]
   * @param  {[type]}   passengerId [description]
   * @param  {Function} fn          [description]
   * @return {[type]}               [description]
   */
  // Order.events = new events.EventEmitter();
  Order.cancelOrder = function (req,orderId,driverId,passengerId,fn) {
    debug('Order::cancelOrder Method Called');
    var NOW = new Date();
    Order.app.models['DB_passenger_order'].findById(orderId,function (err,orderInstance){
      if (err) {return G.returnServerError(err,fn);}
      if (_.isEmpty(orderInstance)){
        return G._error('102','No record : order ID not found','null',fn);
      }
      var clientObject = G.getClientType(driverId,passengerId);

      switch (orderInstance['status'].toString()){
        default:
        case '999':
          if (orderInstance['driver_id']){
            Order.app.models['DB_driver'].findById(orderInstance['driver_id'],function (err,driverInstance) {
              driverInstance.updateAttributes({'status':1});
            });
          }
          orderInstance.updateAttributes({
            'reject_id': clientObject.clientId,
            'reject_type': clientObject.clientType,
            'complete_time': NOW,
            'status': 999,
          },function (err,updatedOrderInstance){
            switch(clientObject.clientType){
              case 'P': // Order cancelled by passenger.
                return Order.app.models['DB_passenger'].findById(passengerId,function (err,passengerInstance){
                  if (err) return G.returnServerError(err,fn);
                  passengerInstance.updateAttributes({
                    'status':'1',
                    'waitting_id':'',
                  },function (err,updatedPassengerInstance){
                    return Order.app.models['member'].updateCurrentLocation(
                    req,passengerId,0,0,function (err,result){
                      if (err) return fn(err);
                      var data = result.data;
                      if (typeof data === 'object' && typeof data['passenger_data'] === 'object'){
                        data['id'] = data['passenger_data']['id'];
                        data['loc_x'] = data['passenger_data']['loc_x'];
                        data['loc_y'] = data['passenger_data']['loc_y'];
                        data['status'] = data['passenger_data']['status'];
                      }
                      return fn (err,result);
                    });                    
                  });
                });
              case 'D': // Order cancelled by driver.
                return Order.app.models['DB_driver'].findById(
                  driverId,{
                    fields:{
                      'id': true,
                      'name': true,
                      'loc_str': true,
                      'during': true,
                      'direction': true,
                      'status': true,
                      'waitting_id': true,
                    }
                  },
                  function (err,driverInstance){
                  if(err) G.returnServerError(err,fn);
                  if(!_.isEmpty(driverInstance)){
                    driverInstance.updateAttributes({
                      'status':'1',
                      'waitting_id':'',
                    },function (err,updateDriverInstance){
                      Order.app.models['DB_passenger'].findById(
                        updatedOrderInstance['passenger_id'],function (err,passengerInstance){
                        if(!_.isEmpty(passengerInstance)){
                          passengerInstance.updateAttributes({
                            'status':1,
                            'waitting_id':''
                          });
                        }   
                      });
                      return G.returnStandardSuccessMsg({
                        'driver_data': driverInstance
                       },fn);
                    });
                  }
                   
                });
              default:
                
                break;
            }
          });

          break;
        case '5':

        case '0':
          return G._error('105','Unable to cancel order after on board.',{},fn);
        // case '999':
        //   return G._error('105','Order has already been cancelled',{},fn);

      }
    });
  };
  Order.completeOrder = function (req,orderId,driverId,passengerId,fn) {
    debug('Order::completeOrder Method Called');
    var ctx = loopback.getCurrentContext();
    var currentUser = ctx.get('currentUser');
    var NOW = new Date();
    Order.app.models['DB_passenger_order'].findById(orderId,function (err,orderInstance){
      if (err) {return G.returnServerError(err,fn);}
      if (_.isEmpty(orderInstance)){
        return G._error('102','No record : order ID not found','null',fn);
      }
      var clientObject = G.getClientType(driverId,passengerId);
      var upsertData = {
        'status': 5,
        'reject_id': clientObject.clientId,
        'reject_type': clientObject.clientType,
      };
      if (clientObject.clientType === 'D'){
        upsertData['complete_time']= NOW;        
      }
      orderInstance.updateAttributes(upsertData,function (err,updatedOrderInstance){
        switch(clientObject.clientType){
          case 'P':
            Order.app.models['DB_passenger'].findById(orderInstance['passenger_id'],function (err,passengerInstance){
              if (!passengerInstance) return;
              passengerInstance.updateAttributes({
                'status':1,
                'waitting_id': '',
              },function (err,updatedPassengerInstance){
                // Order.events.emit('ORDER_COMPLETE',{clientObject:clientObject,passenger:updatedPassengerInstance});
                if (currentUser){
                  Order.app.models.Missions.resolveMissionTrigger('COMPLETE_ORDER',function(err,missionResolveResult){
                    Order.app.models['member'].updateCurrentLocation(req,passengerId,0,0,function (err,data){
                      data.data['mission_results'] = missionResolveResult;
                      console.log(err);
                      fn (err,data);
                    });
                  });  
                } else {
                  return Order.app.models['member'].updateCurrentLocation(req,passengerId,0,0,fn);
                }
                // return Order.app.models['member'].updateCurrentLocation(req,passengerId,0,0,fn);
              });
            });
            break;
          case 'D':
            return Order.app.models['DB_driver'].findById(orderInstance['driver_id'],function (err,driverInstance){
              if (err) { return G.returnServerError(err,fn); }
              if (!driverInstance) return;
              driverInstance.updateAttributes({
                'status':1, 'waitting_id': ''
              },function (err,updateDriverInstance){
                var returningData = {
                  'driver_data': {
                    'id': driverInstance['id'],
                    'name': driverInstance['name'],
                    'during': driverInstance['during'],
                    'direction': driverInstance['direction'],
                    'status': driverInstance['status'],
                    'waitting_id': driverInstance['waitting_id'],
                  }
                };
                try{
                  returningData['loc_str'] = JSON.parse(driverInstance['loc_str']);
                }catch(e){ returningData['loc_str'] = {}; }
                // Order.events.emit('ORDER_COMPLETE',{clientObject:clientObject,driver:driverInstance});
                if (currentUser){
                  Order.app.models.Missions.resolveMissionTrigger('COMPLETE_ORDER',function(err,missionResolveResult){
                    console.log("After Add Gift Points");
                    returningData['mission_results']=missionResolveResult;
                    return G.returnStandardSuccessMsg(returningData,fn);
                  });  
                } else {
                  return G.returnStandardSuccessMsg(returningData,fn);
                }
              });
            });
          default:
            return G._error('102','Unexpected complete type','null',fn);
        }
      });
    });
  };
  Order.confirmOrder = function (req,orderId,driverId,passengerId,fn) {
    debug('Order::confirmOrder Method Called');
    var clientObject = G.getClientType(driverId,passengerId);
    Order.app.models['DB_passenger_order'].findById(
      orderId,function (err,orderInstance) {
        if(orderInstance['status']!='3'){
          if (clientObject.clientType==='P')return Order.app.models['member'].updateCurrentLocation(
                req,passengerId,0,0,fn);
          if (clientObject.clientType==='D')return Order.app.models['DB_passenger'].findById(
                orderInstance['passenger_id'],
                function (err,passengerInstance){
                  if(err) G.returnServerError(err,fn);
                  return G.parseOrderLocation(orderInstance,function (err,orderDataObject){
                    if (err) return G.returnServerError(err,fn);
                    // Order.events.emit('ORDER_CONFIRM',{clientObject:clientObject,passenger:passengerInstance});
                    return G.returnStandardSuccessMsg({
                      'order_data': orderDataObject,
                      'passenger_data': passengerInstance,
                    },fn);
                  });
                }
              );
          return G._error('102','ORDER_STATUS_INCORRECT',{},fn);
        }
        orderInstance.updateAttributes({
          'status': '0',
          'confirm_id': clientObject.clientId,
          'confirm_type': clientObject.clientType,
        },function (err,updatedOrderInstance){
          Order.app.models['DB_passenger'].updateAll({
            'id'     : orderInstance['passenger_id'],
            'waitting_id': orderId,
          },{
            'status' : '0',
          });
          Order.app.models['DB_driver'].updateAll({
            'id'     : orderInstance['driver_id'],
            'waitting_id':orderId,
          },{
            'status' : '0',
          });
          switch (clientObject.clientType) {
            case 'D':
              Order.app.models['DB_passenger'].findById(
                orderInstance['passenger_id'],
                function (err,passengerInstance){
                  if(err) G.returnServerError(err,fn);
                  return G.parseOrderLocation(updatedOrderInstance,function (err,orderDataObject){
                    if (err) return G.returnServerError(err,fn);
                    // Order.events.emit('ORDER_CONFIRM',{clientObject:clientObject,passenger:passengerInstance});
                    return G.returnStandardSuccessMsg({
                      'order_data': orderDataObject,
                      'passenger_data': passengerInstance,
                    },fn);
                  });
                }
              );
              break;
            case 'P':
              return Order.app.models['member'].updateCurrentLocation(
                req,passengerId,0,0,fn);
          }
        });  
      }
    );
  };
  Order.distribute = function (req,orderId,driverId,fn){
    debug('Order::distribute Method Called');
    Order.app.models['DB_driver'].findById(driverId,function (err,driverInstance){
      if (err) return G.returnServerError(err,fn);
      // if (driverInstance['driver_id'].toString() !== '0') return G._error('102', 'Cannot assign order',{}, fn);
      if (_.isEmpty(driverInstance)) return G._error('102', 'No record : Driver ID not found',{}, fn);
      switch (driverInstance['status'].toString()){
        case '0':
        case '2':
        case '3':
          return G._error('102','Driver not able to take order',{},fn);
        case '1':
          driverInstance.updateAttributes({
            'status'      : 2,
            'waitting_id' : orderId.toString(),
          },function (err,updateDriverInstance){
            if(err) return G.returnServerError(err,fn);
            Order.app.models['DB_passenger_order'].findById(orderId,function (err,orderInstance){
              if(err) return G.returnServerError(err,fn);
              return orderInstance.updateAttributes({
                'driver_id':driverInstance['id']
              },function (err,updatedOrderInstance){
                if(err)return G.returnServerError(err,fn);
                return G.returnStandardSuccessMsg({},fn);
              });
            });


            // Order.app.models['DB_passenger_order'].updateAll({
            //   where:{
            //     'id':orderId,
            //   }
            // },{
            //   'driver_id': driverId,
            // },function (err,Info){
            //   if (err) return G.returnServerError(err,fn);
            //   return G.returnStandardSuccessMsg({},fn);
            // });
          });
      }
    });
  };
  Order.setRating = function (req,orderId,passengerId,userToken,rating,fn) {
    debug('Order::setRating Method Called');
    var ctx = loopback.getCurrentContext();
    var currentUser = ctx.get('currentUser');
    var locX,locY;
    locX = req.body['loc_x'] || 0;
    locY = req.body['loc_y'] || 0;
    if(currentUser && currentUser.realm === 'passenger' && currentUser['realm_id']) passengerId = currentUser['realm_id'];
    Order.app.models['DB_passenger'].findById(passengerId,function (err,passengerInstance){
      Order.app.models['DB_passenger_order'].findById(passengerInstance['waitting_id'],function (err,orderInstance){
        if (err) G.returnServerError(err,fn);
        if (!orderInstance) return G._error('104','ORDER_NOT_FOUND',{},fn);
        // if (orderInstance['rating']!==0) return G._error('102','CANNOT_MODIFY_RATING',{},fn)
        orderInstance.updateAttributes({
          'rating': rating
        },function (err,updatedOrderInstance){
          if (err) G.returnServerError(err,fn);
          if (!updatedOrderInstance) return G._error('104','CANOT_SET_RATING',{},fn);
          if (passengerInstance['status']=='0'){
            return Order.completeOrder(req,orderId,0,passengerId,fn);
          } else {
            return G.returnStandardSuccessMsg({'order_data':updatedOrderInstance},fn);
          }
        });
      });
    });
  };
  

  Order.driverReply = function (req,orderId,driverId,reply,fn) {
    debug('Order::driverReply Method Called');
    Order.app.models['DB_passenger_order'].findById(orderId,function (err,orderInstance){
      if (_.isEmpty(orderInstance) || orderInstance['status'].toString()!=='2'){
        return G._error('102','No order record',{},fn);
      }
      switch(reply){
        case 'N':
          Order.app.models['DB_driver'].findById(driverId,function (err,driverInstance){
            if (err) return G.returnServerError(err,fn);
            driverInstance.updateAttributes({
              'status': '1',
              'waitting_id': ''
            },function (err,updateDriverInstance){
              if (err) G.returnServerError(err,fn);
              var rejectIdString = orderInstance['reject_id'];
              if (rejectIdString.length){ rejectIdString +=','+driverId;}else{
                rejectIdString = driverId;
              }
              orderInstance.updateAttributes({
                'driver_id': '0',
                'reject_id': rejectIdString,
                'status': '2',
              });
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
          });
          break;
        case 'Y':
          Order.app.models['DB_driver'].findById(driverId,function (err,driverInstance){
            if(err) return G.returnServerError(err,fn);
            Order.app.models['DB_passenger'].findById(orderInstance['passenger_id'],function (err,passengerInstance){
              if (err) return G.returnServerError(err,fn);
              passengerInstance.updateAttributes({'status':3});
              orderInstance.updateAttributes({
                  'status': 3,
                  'driver_id':driverId.toString(),
                },
                function (err,updatedOrderInstance){
                  driverInstance.updateAttributes({
                    'status':3,
                    'waitting_id':orderId.toString(),
                  }, function (err,updateDriverInstance){
                    if (updateDriverInstance['driver_type'].toString() === '2'){
                      Order.app.models['DB_driver'].updateAll({
                        'waitting_id': orderId.toString(),
                        'status': '2',
                        'driver_type': '2',
                      },{
                        'status': '1',
                        'waitting_id': '',
                      });
                    }
                    var returningDriverInstance = {
                      'id': updatedOrderInstance['id'],
                      'name': updatedOrderInstance['name'],
                      'loc_str': updatedOrderInstance['loc_str'],
                      'during': updatedOrderInstance['during'],
                      'direction': updatedOrderInstance['direction'],
                      'status': updatedOrderInstance['status'],
                      'waitting_id': updatedOrderInstance['waitting_id'],
                      'driver_type': updatedOrderInstance['driver_type'],
                    };
                    try{
                      returningDriverInstance['loc_str'] = JSON.parse(returningDriverInstance['loc_str']);
                    }catch(e){
                      returningDriverInstance['loc_str'] = {};
                    }
                    if(err) return G.returnServerError(err,fn);
                    return G.parseOrderLocation(updatedOrderInstance,function (err,orderDataObject){
                      if (err) return G.returnServerError(err,fn);

                      return G.returnStandardSuccessMsg({
                        'order_data': orderDataObject,
                        'driver_data': returningDriverInstance
                      },fn);
                    });
                });
              });
            });
          });
          break;
        default:
          return G._error('102','Unexpected reply',{},fn);
      }
    });
  };
  /**
   * [submitOrder description]
   * @param  {Object}   req                    [description]
   * @param  {[type]}   passengerId            [description]
   * @param  {[type]}   startLocationReference [description]
   * @param  {[type]}   endLocationReference   [description]
   * @param  {Function} fn                     [description]
   * @return {Object}                          [description]
   */
  Order.submitOrder = function (req,passengerId,startLocationReference,endLocationReference,memo,requireVIP,fn){
    debug('Order::submitOrder Method Called');
    var ctx = loopback.getCurrentContext();
    var currentUser = ctx.get('currentUser');
    var now = new Date();
    
    Order.app.models['DB_passenger'].findById(passengerId,function (err,passengerInstance){
      if (err) {return G.returnServerError(err,fn); }
      if (_.isEmpty(passengerInstance)){
        return G._error('102','No record : passenger ID not found','null',fn);
      }
      if (passengerInstance['status'] != '1'){ // jshint ignore:line
        return G._error('104','The user has a order already','null',fn);
      }
      G.getSearchLog(startLocationReference,function (err,startLocation){
        if (_.isEmpty(startLocation)) return G._error('104','Cannot find the location details', 'null',fn);
        var startGeoPoint = new loopback.GeoPoint({
          lat: +startLocation['loc_x'], lng: +startLocation['loc_y']
        });
        G.getNearDrivers(startGeoPoint,100,function (err,nearDrivers){
          // if (_.isEmpty(nearDrivers)){
          //   return G._error('102','No Driver Near Starting Point','null',fn);
          // }
          Order.app.models['DB_passenger_order'].create({
            'passenger_id': passengerId,
            'starting_point':startLocationReference,
            'destination':endLocationReference,
            'send_time': now ,//now.setHours(now.getHours()+8),
            'complete_time':now,
            'require_vip': !!requireVIP,
            'memo': memo,
            'status': 2,
            'start_x':startLocation['loc_x'],
            'start_y':startLocation['loc_y']
          },function (err,orderInstance){
            // console.log(orderInstance);
            var autoDistributorDealy = 15000;
            var Id = orderInstance.id;
            if (err) return G.returnServerError(err,fn);
            setTimeout(function (){
              Order.app.models['OrderDistributor'].kickOff(Id,function(){
                console.log('Auto Distributor started');
              });
            }, autoDistributorDealy);
            G.getSearchLog(endLocationReference,function (err,endLocation){
              orderInstance.updateAttributes({
                'end_x': endLocation['loc_x'],
                'end_y': endLocation['loc_y'],
              });
            });
            return passengerInstance.updateAttributes({
              'status': 2,
              'waitting_id': orderInstance['id'].toString(),
            }, function (err,updatedPassengerInstance){
              if (err) G.returnServerError(err,fn);
              return G.returnStandardSuccessMsg({
                // 'order_id': orderInstance['id'].toString(),
                'order_data': orderInstance,
              },fn);
            });
          });
        });
      });
    });
  };
  Order.remoteMethod(
    'getMyRecords',
    {
      description: 'Cancel Order.',
      accepts: [
        {arg: 'filter', type: 'object', description: '[Filter](https://docs.strongloop.com/display/public/LB/Querying+data) defining fields, where, include, order, offset, and limit'},
      ],
      returns:[
        {arg: 'data', type:'standardResponse', description: 'Standard Response Object',root: true},
      ], 
      http: [
//        {verb: 'post', path: '/cancelOrder.php'},
        {verb: 'post', path: '/myRecords'},
      ]
    }
  );
  Order.remoteMethod(
    'cancelOrder',
    {
      description: 'Cancel Order.',
      accepts: [
        {arg: 'req', type: 'object' , http:{source:'req'} },
        {arg: 'order_id', type: 'string', description: 'Passenger id.', required: true},
        {arg: 'driver_id', type: 'string', description: 'Driver id.'},
        {arg: 'passenger_id', type: 'string', description: 'Driver id.'}
      ],
      returns:[
        {arg: 'data', type:'standardResponse', description: 'Standard Response Object',root: true},
      ], 
      http: [
//        {verb: 'post', path: '/cancelOrder.php'},
        {verb: 'post', path: '/cancelOrder'},
      ]
    }
  );
  Order.remoteMethod(
    'completeOrder',
    {
      description: 'Set Order as completed.',
      accepts: [
        {arg: 'req', type: 'object' , http:{source:'req'} },
        {arg: 'order_id', type: 'string', description: 'Passenger id.', required: true},
        {arg: 'driver_id', type: 'string', description: 'Driver id.'},
        {arg: 'passenger_id', type: 'string', description: 'Driver id.'}
      ],
      returns:[
        {arg: 'data', type:'standardResponse', description: 'Standard Response Object', root: true},
      ], 
      http: [
//        {verb: 'post', path: '/completeOrder.php'},
        {verb: 'post', path: '/completeOrder'},
      ]
    }
  );
  Order.remoteMethod(
    'confirmOrder',
    {
      description: 'Confirm Order.',
      accepts: [
        {arg: 'req', type: 'object' , http:{source:'req'} },
        {arg: 'order_id', type: 'string', description: 'Order id.', required: true},
        {arg: 'driver_id', type: 'string', description: 'Driver id.'},
        {arg: 'passenger_id', type: 'string', description: 'Passenger id.'}
      ],
      returns:[
        {arg: 'data', type:'standardResponse', description: 'Standard Response Object', root: true},
      ], 
      http: [
//        {verb: 'post', path: '/confirmOrder.php'},
        {verb: 'post', path: '/confirmOrder'},
      ],
      notes:['Testing']
    }
  );
  Order.remoteMethod(
    'distribute',
    {
      description: 'Assign order to a VIP driver.',
      accepts: [
        {arg: 'req', type: 'object' , http:{source:'req'} },
        {arg: 'order_id', type: 'string', description: 'Order id.', required: true},
        {arg: 'driver_id', type: 'string', description: 'Driver id.', required: true},
      ],
      returns:[
        {arg: 'data', type:'standardResponse', description: 'Standard Response Object', root: true},
      ], 
      http: [
//        {verb: 'post', path: '/order_distribute.php'},
        {verb: 'post', path: '/order_distribute'},
        {verb: 'post', path: '/distribute'},
      ]
    }
  );
  Order.remoteMethod(
    'driverReply',
    {
      description: 'Handel driver\'s reply.',
      accepts: [
        {arg: 'req', type: 'object' , http:{source:'req'} },
        {arg: 'order_id', type: 'string', description: 'Order id.', required: true},
        {arg: 'driver_id', type: 'string', description: 'Driver id.', required: true},
        {arg: 'reply', type: 'string', description: 'Driver\s reply Y/N.', required: true}
      ],
      returns:[
        {arg: 'data', type:'standardResponse', description: 'Standard Response Object', root: true},
      ], 
      http: [
//        {verb: 'post', path: '/driver_reply.php'},
        {verb: 'post', path: '/driver_reply'},
        {verb: 'post', path: '/driverReply'},
      ]
    }
  );
  // req,orderId,passengerId,userToken,rating,fn
  Order.remoteMethod(
    'setRating',
    {
      description: 'Set order rating.',
      accepts: [
        {arg: 'req', type: 'object' , http:{source:'req'} },
        {arg: 'order_id', type: 'string', description: 'Order id.', required:true  },
        {arg: 'passenger_id', type: 'string', description: 'Passenger id.', required:true},
        {arg: 'user_token', type: 'string', description: 'Passenger token.', required:true},
        {arg: 'rating', type: 'number', description: 'Integer 1~5 as rating.', required:true},
      ],
      returns:[
        {arg: 'data', type:'standardResponse', description: 'Standard Response Object',root:true},
      ], 
      http: [
//        {verb: 'post', path: '/setRating.php'},
        {verb: 'post', path: '/setRating'},
      ],
      notes:['Set ']
    }
  );
  Order.remoteMethod(
    'submitOrder',
    {
      description: 'Update driver Status.',
      accepts: [
        {arg: 'req', type: 'object' , http:{source:'req'} },
        {arg: 'passenger_id', type: 'string', description: 'Passenger id.', required:true},
        {arg: 'start_reference_code', type: 'string', description: 'Location reference code.', required:true},
        {arg: 'end_reference_code', type: 'string', description: 'Location reference code.', required:true},
        {arg: 'memo', type: 'string', description: 'Driver id.', required:false},
        {arg: 'require_vip', type: 'boolean', description: 'If the order requires a VIP car.', required:false}
      ],
      returns:[
        {arg: 'data', type:'standardResponse', description: 'Standard Response Object',root:true},
      ], 
      http: [
//        {verb: 'post', path: '/submit_order.php'},
        {verb: 'post', path: '/submit'},
      ]
    }
  );
};
