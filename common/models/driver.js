var G = require('./utils/utils.js');
var _ = require('underscore');
var rq = require('request-promise');
var queryString = require('query-string');
var loopback = require('loopback');
var debug = require('debug')('taxi-go:model');
module.exports = function(Driver) {
  'use strict';
  var returnServerError = G.returnServerError;
  var returnStandardSuccessMsg = G.returnStandardSuccessMsg;
  var getSearchLog = G.getSearchLog;
  var parseOrderLocation = G.parseOrderLocation;
  
  /**
   * [getDriverData description]
   * @param  {[type]}   req      [description]
   * @param  {[type]}   driverId [description]
   * @param  {Function} fn       [description]
   * @return {[type]}            [description]
   */
  Driver.getDriverData = function(req,driverId,fn){
    debug('Driver::getDriverData Method Called');
    Driver.app.models['DB_driver'].findById(driverId,
      {
        fields:{
          id:true, license:true, name:true, image:true, status:true
        }
      },
      function getDriverDataCallback(err,driverInstance){
      if (err) {
        return returnServerError(err,fn);
      } else {
        if (_.isEmpty(driverInstance)) {
          return G._error('104','The id has no driver','null',fn);
        } else {
          var returningData = {
            'driver_data':driverInstance
          };
          Driver.app.models['DB_passenger_order'].findOne(
            { 
              where:{
                and:[
                  {'driver_id' : driverInstance.id},
                  {'status'    : { 'neq' : '999' }},
                ]
              }
            },
            function driverOrderCallback(err,orderInstance){
              if (err) {
                return returnServerError(err,fn);
              } else {
                if (_.isEmpty(orderInstance)){
                  return G.returnStandardSuccessMsg(returningData,fn);
                } else {
                  returningData['order_data'] = orderInstance;
                  parseOrderLocation(returningData['order_data'],function(err,orderDataObject){
                    if (err){ return fn(err); }
                    return returnStandardSuccessMsg(returningData,fn);
                  });
                }
              }
            }
          );
        }
      }
    });
  };
  Driver.getDriverLocation = function(){};
  Driver.getDriversInBoundry = function (pointOneX,pointOneY,pointTwoX,pointTwoY,fn){
    debug('Driver::getDriversInBoundry Method Called');
    var minX = Math.min(pointOneX,pointTwoX);
    var minY = Math.min(pointOneY,pointTwoY);
    var maxX = Math.max(pointOneX,pointTwoX);
    var maxY = Math.max(pointOneY,pointTwoY);
    Driver.app.models['DB_driver'].find({
      where:{
        'loc_x':{between:[minX,maxX]},
        'loc_y':{between:[minY,maxY]},
      },
      fields:{
        'id':true, 'name':true, 'family_name':true, 'given_name':true,
        'country_code':true, 'tel':true, 'status':true,'loc_x':true,'loc_y':true
      }
    },function (err,drivers){
      if (err) return G.returnServerError(err,fn);
      return G.returnStandardSuccessMsg({
        drivers:drivers
      },fn);
    });
  };
  Driver.setGPSPoints = function (locArray,googleResponseObject,time,userId){
    // console.log('Set GPS Points Called');
    locArray = locArray || '';
    time = time || new Date();
    var rawPoints = locArray.split('|');
    var storingPoints = [];
    if (googleResponseObject && Array.isArray(googleResponseObject.snappedPoints)){
      var matchedPoints = googleResponseObject.snappedPoints.filter(function (item){ return Boolean(item.originalIndex);});
      time.setSeconds(time.getSeconds()-matchedPoints.length);
      for (var i = 0; i < matchedPoints.length; i++) {
        var point = rawPoints[i].split(',');
        storingPoints.push({
          'loc_x': matchedPoints[i].location.latitude,
          'loc_y': matchedPoints[i].location.longitude,
          'brust_index': i,
          'place_id': matchedPoints[i].placeId,
          'raw_x': point[0],
          'raw_y': point[1],
          'time': new Date(time.setSeconds(time.getSeconds()+1)),
          'user_id': userId
        });
      }
      Driver.app.models['DB_logs_location'].create(storingPoints,function (err,result){
        if (err) console.error(err);
      });
    }
  };
  Driver.updateLocation = function(req,id,locArray,during,direction,fn){
    debug('Driver::updateLocation Method Called');
    var googleRoadUrl = 'https://roads.googleapis.com/v1/';
    var apiSecret = '2TatUM_JrpvYj2ubrWKN!qCmqGsn';
    var apiKey = 'AIzaSyAsroLZ-LF6xqPn0W4Na6BwjC7Knm05v3o';
    var now = new Date();

    var locArraryTest = locArray.split('|');

    // var ctx = loopback.getCurrentContext();
    // var currentUser = ctx.get('currentUser');

    Driver.app.models['DB_driver'].findById(id,function (err,driverInstance){
      if (err) { return G.returnServerError(err,fn); }
      if ( _.isEmpty(driverInstance) ) {
        return G._error('104','The id has no driver','null',fn);
      } else {
        var apiUrl = googleRoadUrl+'snapToRoads?path='+locArray+'&interpolate=true&key='+apiKey;
        // console.log(apiUrl);
        var googleResponse = {};
        rq(apiUrl).then(function (responseBody){
          var responseObject;
          try {
            responseObject = JSON.parse(responseBody);
            Driver.setGPSPoints(locArray, responseObject,new Date(now),driverInstance['userId']);
          } catch (e){
            console.error(e);
          }
          // Parse returned data from google.
          googleResponse['loc_str'] = responseObject['snappedPoints'];
          if (googleResponse['loc_str'] && googleResponse['loc_str'].length){
            googleResponse['loc_x'] = googleResponse['loc_str'][googleResponse['loc_str'].length -1]['location']['latitude'];
            googleResponse['loc_y'] = googleResponse['loc_str'][googleResponse['loc_str'].length -1]['location']['longitude'];
          } else {
            googleResponse['loc_x'] = driverInstance['loc_x'];
            googleResponse['loc_y'] = driverInstance['loc_y'];            
          }
        },function (rejectedResponse){
          console.log('Google API call failed:',rejectedResponse['body']);
          return G.returnServerError(rejectedResponse,fn);
        }).then(function (){
          var updatingAttributes = _.clone(googleResponse);
          // console.log(googleResponse);
          // console.log(updatingAttributes);
          updatingAttributes['last_update'] = now; //now.setHours(now.getHours() + 8);
          if (during) updatingAttributes.during = during;
          if (direction) updatingAttributes.direction = direction;
          if (updatingAttributes['loc_str']){
            updatingAttributes['loc_str'] = JSON.stringify(updatingAttributes['loc_str']);
          }
          updatingAttributes['ref_index'] = driverInstance['ref_index']+1 || 1;
          driverInstance.updateAttributes(
            updatingAttributes,
            function (err,updateDriverInstance){
            var waitingOrderIds = driverInstance['waitting_id'].trim().split(',');
            switch (updateDriverInstance['status'].toString()){
              case '1':
                return G.returnStandardSuccessMsg({
                  'driver_data': {
                    'id': updateDriverInstance['id'],
                    'name': updateDriverInstance['name'],
                    'loc_str': googleResponse['loc_str'],
                    'during': updateDriverInstance['during'],
                    'direction': updateDriverInstance['direction'],
                    'status': updateDriverInstance['status'],
                    'waitting_id': updateDriverInstance['waitting_id'],
                    'driver_type': updateDriverInstance['driver_type'],
                  }
                },fn);
              case '0':
              case '2':
              case '3':
              return Driver.app.models['DB_passenger_order'].findById(waitingOrderIds[0],
                function (err,orderInstance){
                  if (err) return G.returnServerError(err,fn);
                  Driver.app.models['DB_passenger'].findById(orderInstance['passenger_id'],
                    {
                      fields:{
                        'id':true, 'name':true, 'family_name':true, 'given_name':true,
                        'country_code':true, 'tel':true, 'status':true
                      }
                    },
                    function (err,passengerInstance){
                      if (err) return G.returnServerError(err,fn);
                      G.parseOrderLocation(orderInstance,function (err,orderDataObject){
                        if (err) return G.returnServerError(err,fn);
                        return G.returnStandardSuccessMsg({
                          'order_data': orderDataObject,
                          'passenger_data': passengerInstance,
                        },fn);
                      });
                    }
                  );
                }
              );
            }
          });
        });
      }
    });
  };
  /**
   * [genVerificationCode description]
   * @param  {[type]}   req         [description]
   * @param  {[type]}   countryCode [description]
   * @param  {[type]}   tel         [description]
   * @param  {Function} fn          [description]
   * @return {[type]}               [description]
   */
  Driver.genVerificationCode = function (req,countryCode,tel,fn){
    debug('Driver::genVerificationCode Method Called');
    // var verificationCode = (Math.random().toString(10)+'00000').slice(2,6);
    var verificationCode = '8888';
    Driver.app.models['DB_driver'].findOne({
      where:{
        'country_code':countryCode,
        'phone':tel
      }
    },function genVerificationCodeCallback (err,DriverInstance) {
      if(err){ G.returnServerError(err,fn); }
      if(_.isEmpty(DriverInstance)) return G._error('104','Driver not found',{},fn);
      var now = new Date();
      DriverInstance.updateAttributes({
        // verification: (Math.random().toString(10)+'00000').slice(2,6),
        verification: verificationCode.toString(),
        // 'last_login': now //now.setHours(now.getHours() + 8)
      });
      if (DriverInstance.userId === 0){
        Driver.app.models['taxiGoUsers'].create(
          {
            'realm': 'driver',
            'username': 'd'+countryCode.toString()+tel.toString(),
            'email': countryCode.toString()+tel+'@driver.telephone.taxigomo',
            'password': verificationCode.toString(),
            'realm_id': DriverInstance.id.toString(),
            'country_code': countryCode,
            'tel': tel,
          },function(err,userInstance){
            DriverInstance.updateAttributes({
              'userId': userInstance.id.toString()
            });
          }
        );
      }
      return returnStandardSuccessMsg({},fn);
      // Driver.app.models['taxiGoUsers'].findOrCreate({
      //   'realm': 'driver',
      //   'realm_id': DriverInstance.id.toString(),
      // },{
      //   'realm': 'driver',
      //   'username': 'd'+countryCode.toString()+tel.toString(),
      //   'email': countryCode.toString()+tel.toString()+'@driver.telephone.taxigomo',
      //   'realm_id': DriverInstance.id.toString(),
      //   'password': verificationCode,
      // },function (err,userInstance){
      //   if (err) return G.returnServerError(err,fn);
      //   if (!_.isEmpty(userInstance)){
      //     DriverInstance.updateAttributes({'userId':userInstance.id});
      //     return returnStandardSuccessMsg({},fn);
      //   }
      // });
      
    });
  };
  /**
   * [verifyVerificationCode description]
   * @param  {[type]}   req         [description]
   * @param  {[type]}   countryCode [description]
   * @param  {[type]}   tel         [description]
   * @param  {[type]}   vCode       [description]
   * @param  {Function} fn          [description]
   * @return {[type]}               [description]
   */
  Driver.verifyVerificationCode = function (req,countryCode,tel,vCode,deviceToken,deviceType,fn) {
    debug('Driver::verifyVerificationCode Method Called');
    Driver.app.models['DB_driver'].findOne({
      where:{
        'country_code': countryCode,
        'phone': tel
      }
    },function verificationCodeCallback(err, driverInstance){
      if(err){
        return fn(null,{
          code: '101',
          msg: 'Server error.',
          data:{
            err:err
          }
        });
      } else {
        if (_.isEmpty(driverInstance)){
          return fn(null,{
            code: '404',
            msg: 'Driver not found',
            data: 'null'
          });
        } else {
          if (driverInstance.verification === vCode){
            // VerificationCode Correct Case:
            Driver.app.models['taxiGoUsers'].findById(driverInstance.userId,function (err,userInstance){
              if (err) return G.returnServerError(err,fn);
              var loopbackContext =loopback.getCurrentContext();
              loopbackContext.set('currentUser', userInstance);
              if( req.body.deviceToken && req.body.deviceType){
                Driver.registerDevice(req.body.deviceToken,req.body.deviceType,function(err,result){console.log(err,result);});
              }
              userInstance.createAccessToken(5184000,{},function (err,accessToken){
                if (err) return G.returnServerError(err,fn);
                delete driverInstance.__data['user_token'];
                return G.returnStandardSuccessMsg({
                  'id': driverInstance.id,
                  'user_token': accessToken.id,
                  'driver_data': driverInstance,
                },fn);
              });
            });

            // !! OLD Generate User Token Function..
            // (function genUserToken(){
            //   // var userToken = G.randomString(12);
            //   var userToken = ;
            //   Driver.app.models['DB_driver'].findOne(
            //     {
            //       where:{
            //         'user_token': userToken
            //       }
            //     },
            //     function (err,verifyDriverInfo){
            //       if(err){ return returnServerError(err,fn); }
            //       if(!verifyDriverInfo){
            //         driverInstance.updateAttribute('user_token',userToken,function(err,Instance){
            //           return returnStandardSuccessMsg({
            //             'id': driverInstance.id,
            //             'user_token': userToken,
            //             'driver_data': driverInstance
            //           },fn);
            //         });
            //       } else {
            //         return genUserToken();
            //       }
            //     }
            //   );
            // })();

          } else {
            // VerificationCode inCorrect Case:
            return fn(null,{
              code: '102',
              msg: 'VerificationCode incorrect.',
              data: 'null'
            });
          }
        }
      }
    });
  };
  Driver.registerDevice = function (deviceToken,deviceType,fn){
    var ctx = loopback.getCurrentContext();
    var currentUser = ctx.get('currentUser');
    if(currentUser && Driver.app.models['installation'] && deviceToken && deviceType){
      Driver.app.models['installation'].create({
          appId: 'taxigo-driver-app',
          userId: currentUser.id,
          deviceToken: deviceToken,
          deviceType: deviceType,
          created: new Date(),
          modified: new Date(),
          status: 'Active'
      }, function (err, result) {
        console.log('registerDevice');
        if (err) return G.returnServerError(err,fn);
        return G.returnStandardSuccessMsg(result,fn);
      });
    } else {
      console.log('registerDevice Fail missing infomation');
    }
  };
  /**
   * [getStatus description]
   * @param  {[type]}   req [description]
   * @param  {[type]}   id  [description]
   * @param  {Function} fn  [description]
   * @return {[type]}       [description]
   */
  Driver.getStatus = function(req,id,fn){
    debug('Driver::getStatus Method Called');
    Driver.app.models['DB_driver'].findById(
      id,
      function (err,driverInstance){
        if (err) return returnServerError(err,fn);
        if (_.isEmpty(driverInstance)){
          return fn(null,{
            code: '404',
            msg: 'Driver not found.',
            data: 'null'
          });
        }
        var locStr;
        try{
          locStr = JSON.parse(driverInstance['loc_str']);
        }catch(e){
          locStr = {};
        }
        var returningDriverData={
          'id':         driverInstance.id,
          'name':       driverInstance.name,
          'loc_str':    locStr,
          'during':     driverInstance.during,
          'ref_index':  driverInstance.ref_index, // jshint ignore:line
          'direction':  driverInstance.direction,
          'status':     driverInstance.status,
          'waitting_id': driverInstance.waitting_id, // jshint ignore:line
        };
        var returningData = {
          'driver_data':returningDriverData
        };
        switch(driverInstance['status']){
          case '0':case '2':case '3':
            Driver.app.models['DB_passenger_order'].findById(
              driverInstance['waitting_id'],
              {
                where:{
                  status: driverInstance['status']
                }
              },
              function(err,orderInstance){
                if (err) return returnServerError(err,fn);
                if (_.isEmpty(orderInstance)){
                  return returnStandardSuccessMsg(returningData,fn);
                } else {
                  var requiredQueries = 2;
                  var returnIfReady = function (){
                    requiredQueries-=1;
                    if(requiredQueries === 0){
                      return returnStandardSuccessMsg(returningData,fn);
                    }
                  };
                  returningData['order_data']=_.clone(orderInstance.__data);
                  if (driverInstance['status']!==2) {
                    Driver.app.models['DB_passenger'].findById(
                      orderInstance['passenger_id'],
                      function (err,passengerInstance){
                        if (err) return returnServerError(err,fn);
                        if (passengerInstance){
                          returningData['passenger_data'] = passengerInstance;
                        }
                        returnIfReady();
                      }
                    );
                  } else { returnIfReady(); }
                  parseOrderLocation(returningData['order_data'],function(err,orderDataObject){
                    if (err){ return fn(err); }
                    return returnIfReady();
                  });
                }
              }
            );
            break;
          default:
            return returnStandardSuccessMsg(returningData,fn);
        }
      }
    );
  };
  Driver.observe('before save', function updateName(ctx, next) {
    if (ctx.instance) {
      if ( ctx.instance['family_name'] && ctx.instance['given_name']){
        ctx.instance['name'] = ctx.instance['family_name'] + ctx.instance['given_name'];
      }
    } else {
      if ( ctx.data['family_name'] && ctx.data['given_name']){
        ctx.data['name'] = ctx.data['family_name'] + ctx.data['given_name'];
      }
    }
    next();
  });
  Driver.observe('after save', function updateCorespondingUser(ctx, next) {
    var DriverInstance = ctx.instance;
    var countryCode = ctx.instance['country_code'];
    var tel = ctx.instance['phone'];
    var familyName = ctx.instance['family_name'];
    var givenName = ctx.instance['given_name'];
    var NOW = new Date();
      if (DriverInstance.userId === 0 || !DriverInstance.userId){
        Driver.app.models['taxiGoUsers'].create(
          {
            'realm': 'driver',
            'username': 'd'+countryCode.toString()+tel.toString(),
            'email': countryCode.toString()+tel+'@driver.telephone.taxigomo',
            'password': '8888',
            'realm_id': DriverInstance.id.toString(),
            'country_code': countryCode,
            'tel': tel,
            'created': NOW,
            'lastUpdated': NOW,
            'family_name': familyName,
            'given_name': givenName,
            'name': familyName+' '+givenName
          },function(err,userInstance){
            DriverInstance.updateAttributes({
              'userId': userInstance.id.toString()
            });
          }
        );
      } else {
        DriverInstance.user(function (err,user){
          user.updateAttributes({
            'realm': 'driver',
            'username': 'd'+countryCode.toString()+tel.toString(),
            'email': countryCode.toString()+tel+'@driver.telephone.taxigomo',
            'country_code': countryCode,
            'tel': tel,
            'lastUpdated': NOW,
            'family_name': familyName,
            'given_name': givenName,
            'name': familyName+' '+givenName
          },function (err,result){});
        });
      }
    next();
  });
  /**
   * [setStatus description]
   * @param {[type]}   req    [description]
   * @param {[type]}   id     [description]
   * @param {[type]}   status [description]
   * @param {Function} fn     [description]
   */
  Driver.setStatus = function(req,id,status,fn){
    debug('Driver::setStatus Method Called');
    Driver.app.models['DB_driver'].findById(id,function setStatusCallback(err, driverInstance){
      driverInstance.updateAttribute('status',status,function (err,instance){
        if(err){ return returnServerError(err,fn); }
        return returnStandardSuccessMsg('null',fn);
      });
    });
  };
  /**
   * [resetStatus description]
   * @return {[type]} [description]
   */
  Driver.resetStatus = function(){
    debug('Driver::resetStatus Method Called');

  };

  // Driver.getMyOrderRecords = function (req,driverId,where,limit,fn){
  //   debug('Driver::getMyOrderRecords Method Called');
  //   if(typeof where === 'string'){
  //     try{
  //       where = JSON.parse(where);
  //     }catch(e){}
  //   }
  //   if (typeof where !== 'object') {
  //     where = {'driver_id':driverId};
  //   }else{
  //     where = _.extend(where,{'driver_id':driverId});
  //   }
  //   if(!+limit)limit = 20;
  //   limit = limit || 20;
  //   Driver.app.models['DB_passenger_order'].find({
  //     where:where,
  //     limit:limit,
  //     order:'id DESC',
  //   },function (err,orderInstances){
  //     if (err) return G.returnServerError(err,fn);
  //     return G.returnStandardSuccessMsg({'orders':orderInstances},fn);
  //   });
  // };
  Driver.observe('before save', function updateName(ctx, next) {
    if (ctx.instance) {
      if (_.isEmpty(ctx.instance['name']) && ctx.instance['family_name'] && ctx.instance['given_name']){
        ctx.instance['name'] = ctx.instance['family_name'] + ctx.instance['given_name'];
      }
    } else {
      if (_.isEmpty(ctx.data['name']) && ctx.data['family_name'] && ctx.data['given_name']){
        ctx.data['name'] = ctx.data['family_name'] + ctx.data['given_name'];
      }
    }
    next();
  });
  Driver.remoteMethod(
    'genVerificationCode',
    {
      description: 'Generate verification code and send through SMS.',
      accessType: 'EXECUTE',
      accepts: [
        {arg: 'req', type: 'object' , http:{source:'req'} },
        {arg: 'country_code', type: 'string', description: 'Country code.', required:true},
        {arg: 'tel', type: 'string', description: 'Phone Number.', required:true}
      ],
      returns:[
        {arg: 'data', type:'standardResponse', description: 'Status code', root:true},
      ], 
      http: [
//        {verb: 'post', path: '/genVerificationCode.php'},
        {verb: 'post', path: '/genVerificationCode'}
      ]
    }
  );

  Driver.remoteMethod(
    'verifyVerificationCode',
    {
      description: 'Verify the verification entered by client.',
      accessType: 'EXECUTE',
      accepts: [
        {arg: 'req', type: 'object' , http:{source:'req'} },
        {arg: 'country_code', type: 'string', description: 'Country code.', required:true},
        {arg: 'tel', type: 'string', description: 'Phone Number.', required:true},
        {arg: 'verification', type: 'string', description: 'Verification code.', required: true},
        {arg: 'deviceToken', type: 'string', description: 'Device Token.', required: false},
        {arg: 'deviceType', type: 'string', description: 'Device Type (ios/android)', required: false}
      ],
      returns:[
        {arg: 'data', type: 'standardResponse', description: 'Taxi-GO standard return object.',root:true}
      ],
      http: [
//        {verb: 'post', path: '/verifyVerificationCode.php'},
        {verb: 'post', path: '/verifyVerificationCode'},
      ]
    }
  );
 Driver.remoteMethod(
    'registerDevice',
    {
      description: 'Register device for notification.',
      accessType: 'EXECUTE',
      accepts: [
        {arg: 'deviceToken', type: 'string', description: 'Device Token.', required: false},
        {arg: 'deviceType', type: 'string', description: 'Device Type (ios/android)', required: false}
      ],
      returns:[
        {arg: 'data', type: 'standardResponse', description: 'Taxi-GO standard return object.',root:true}
      ],
      http: [
//        {verb: 'post', path: '/verifyVerificationCode.php'},
        {verb: 'post', path: '/registerDevice'},
      ]
    }
  );
// getDriversInBoundry
  Driver.remoteMethod(
    'getDriverData',
    {
      description: 'Get the driver data.',
      accessType: 'EXECUTE',
      accepts: [
        //{arg: 'passengerInfo', type: 'passenger', required: true, http: {source: 'body'}}
        {arg: 'req', type: 'object' , http:{source:'req'} },
        {arg: 'driver_id', type: 'string', description: 'Driver id.', required:true}
      ],
      returns:[
        {arg: 'data', type:'standardResponse', description: 'Status code',root:true},
      ], 
      http: [
//        {verb: 'post', path: '/getDriverData.php'},
        {verb: 'post', path: '/getDriverData'},
      ]
    }
  );
  Driver.remoteMethod(
    'getDriversInBoundry',
    {
      description: 'Get the driver within boundry.',
      accessType: 'EXECUTE',
      accepts: [
        //{arg: 'passengerInfo', type: 'passenger', required: true, http: {source: 'body'}}
        {arg: 'minX', type: 'number', description: 'Left-bottom latitude.', required:true},
        {arg: 'minY', type: 'number', description: 'Left-bottom longitude.', required:true},
        {arg: 'maxX', type: 'number', description: 'Right-top latitude.', required:true},
        {arg: 'maxY', type: 'number', description: 'Right-top longitude.', required:true},
      ],
      returns:[
        {arg: 'data', type:'standardResponse', description: 'Status code',root:true},
      ], 
      http: [
//        {verb: 'post', path: '/getDriverData.php'},
        {verb: 'post', path: '/getDriversInBoundry'},
      ]
    }
  );
  Driver.remoteMethod(
    'getStatus',
    {
      description: 'Get the driver status.',
      accessType: 'EXECUTE',
      accepts: [
        //{arg: 'passengerInfo', type: 'passenger', required: true, http: {source: 'body'}}
        {arg: 'req', type: 'object' , http:{source:'req'} },
        {arg: 'id', type: 'string', description: 'Driver id.', required:true}
      ],
      returns:[
        {arg: 'data', type:'standardResponse', description: 'Status code',root:true},
      ], 
      http: [
//        {verb: 'post', path: '/getStatus.php'},
        {verb: 'post', path: '/getStatus'},
      ]
    }
  );
  Driver.remoteMethod(
    'setStatus',
    {
      description: 'Update driver Status.',
      accessType: 'EXECUTE',
      accepts: [
        //{arg: 'passengerInfo', type: 'passenger', required: true, http: {source: 'body'}}
        {arg: 'req', type: 'object' , http:{source:'req'} },
        {arg: 'id', type: 'string', description: 'Driver id.', required:true},
        {arg: 'status', type: 'string', description: 'Driver id.', required:true}
      ],
      returns:[
        {arg: 'data', type:'standardResponse', description: 'Status code',root:true},
      ], 
      http: [
//        {verb: 'post', path: '/setStatus.php'},
        {verb: 'post', path: '/setStatus'},
      ]
    }
  );
  Driver.remoteMethod(
    'updateLocation',
    {
      description: 'Update driver location.',
      accessType: 'EXECUTE',
      accepts: [
        //{arg: 'passengerInfo', type: 'passenger', required: true, http: {source: 'body'}}
        {arg: 'req', type: 'object' , http:{source:'req'} },
        {arg: 'id', type: 'string', description: 'Driver id.', required:true},
        {arg: 'loc_array', type: 'string', description: 'loc_array string "lat,lng".', required:true},
        {arg: 'during', type: 'string', description: 'Taxi during ???.'},
        {arg: 'direction', type: 'string', description: 'Taxi direction.'},
      ],
      returns:[
        {arg: 'data', type:'standardResponse', description: 'Status code',root:true},
      ], 
      http: [
//        {verb: 'post', path: '/updateLocation.php'},
        {verb: 'post', path: '/updateLocation'},
      ]
    }
  );
//   Driver.remoteMethod(
//     'getMyOrderRecords',
//     {
//       description: 'Set additional passenger information after telephone number verified.',
//       accessType: 'EXECUTE',
//       accepts: [
//         {arg: 'req', type: 'object' , http:{source:'req'} },
//         {arg: 'driver_id', type: 'string', description: 'Driver id.', required: true},
//         {arg: 'where', type: 'string', description: 'Where object JSON stringified [reference](https://docs.strongloop.com/display/public/LB/Where+filter).', required: false},
//         {arg: 'limit', type: 'string', description: 'Limit on number of results returned, default 20', required: false},
//       ],
//       returns:[
//         {arg: 'data', type: 'standardResponse', description: 'Taxi-GO standard return object.',root:true},
//       ],
//       http: [
// //        {verb: 'post', path: '/update_current_loc.php'},
//         {verb: 'post', path: '/getMyOrderRecords'}
//       ]
//     }
//   );
};
