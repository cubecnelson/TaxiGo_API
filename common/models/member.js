var G = require('./utils/utils.js');
var _ = require('underscore');
var loopback = require('loopback');
var debug = require('debug')('taxi-go:model');
module.exports = function(Member) {
  'use strict';
  var returnServerError = G.returnServerError;
  var returnStandardSuccessMsg = G.returnStandardSuccessMsg;
  /**
   * genVerificationCode remoteMethod.
   * @param  {[type]}   req         [description]
   * @param  {[type]}   countryCode [description]
   * @param  {[type]}   tel         [description]
   * @param  {Function} fn          [description]
   * @return {[type]}               [description]
   */
  Member.genVerificationCode = function (req,countryCode,tel,fn){
    debug('Member::genVerificationCode Method Called');
    // var verificationCode=(Math.random().toString(10)+'00000').slice(2,6);
    var verificationCode = '8888';
    Member.app.models['DB_passenger'].find(
      {
        where:{
          'country_code':countryCode,
          'tel':tel        
        }
      },function (err,passengerInstances){
        if(err) G.returnServerError(err,fn);
        if (!_.isEmpty(passengerInstances)){
          var passenger = passengerInstances[0];
          passenger.updateAttributes({
            'verification': verificationCode,
          });
          if (passenger.userId === 0){
            Member.app.models['taxiGoUsers'].create(
              {
                'realm': 'passenger',
                'username': 'p'+countryCode.toString()+tel.toString(),
                'email': countryCode.toString()+tel+'@passenger.telephone.taxigomo',
                'password': verificationCode.toString(),
                'realm_id': passenger.id.toString(),
                'country_code': countryCode,
                'tel': tel,
              },function(err,userInstance){
                passenger.updateAttributes({
                  'userId': userInstance.id.toString()
                });
              }
            );
          }
          return returnStandardSuccessMsg({},fn);
        } else {
          Member.app.models['taxiGoUsers'].create(
            {
              'realm': 'passenger',
              'username': countryCode.toString()+tel.toString(),
              'email': countryCode.toString()+tel.toString()+'@passenger.telephone.taxigo',
              'password': verificationCode,
              'country_code': countryCode,
              'tel': tel,
            },function (err,userInstance){
              Member.app.models['DB_passenger'].create(
                {
                  'country_code': countryCode,
                  'tel': tel,
                  'verification': verificationCode,
                  'userId': userInstance.id,
                },function (err,passenger) {
                  if (err) return returnServerError(err,fn);
                  userInstance.updateAttributes({'realm_id':passenger.id});
                  return G.returnStandardSuccessMsg({},fn);
                }
              );
            }
          );
        }
      }
    );
    // Member.app.models['DB_passenger'].findOrCreate({
    //   where:{
    //     'country_code':countryCode,
    //     'tel':tel
    //   }
    // },{
    //   'country_code':countryCode,
    //   'tel':tel
    // },function genVerificationCodeCallback (err,passengerInfo) {
    //   if(err){ G.returnServerError(err,fn); }
    //   var now = new Date();
    //   passengerInfo.updateAttributes({
    //     // verification: (Math.random().toString(10)+'00000').slice(2,6),
    //     verification: 8888,
    //     // 'last_login': now //now.setHours(now.getHours() + 8)
    //   });
    //   return returnStandardSuccessMsg('null',fn);
    // });
  };
  /**
   * verifyVerificationCode remoteMethod.
   * @param  {[type]}   req         [description]
   * @param  {[type]}   countryCode [description]
   * @param  {[type]}   tel         [description]
   * @param  {[type]}   vCode       [description]
   * @param  {Function} fn          Loopback output callback
   * @return {[type]}               [description]
   */
  Member.verifyVerificationCode = function (req,countryCode,tel,vCode,fn) {
    debug('Member::verifyVerificationCode Method Called');
    // console.log('verifyVerificationCode Fired');
    Member.app.models['DB_passenger'].findOne({
      where:{
        'country_code': countryCode,
        'tel': tel
      }
    },function verificationCodeCallback(err, passengerInfo){
      if(err){
        return G.returnServerError(err,fn);
      } else {
        if (_.isEmpty(passengerInfo)){
          return G._error('102','Member not found','null',fn);  
          // return fn(null,{
          //   code: '404',
          //   msg: 'Member not found',
          //   data: 'null'
          // });
        } else {
          if (passengerInfo.verification === vCode){
            // console.log('vCode Verified');
            // VerificationCode Correct Case:
            Member.app.models['taxiGoUsers'].findById(passengerInfo.userId,function (err,userInstance){
              if (err) return G.returnServerError(err,fn);
              if (!userInstance) return G._error('102','User invalid',{},fn);
              userInstance.createAccessToken(5184000,{},function (err,accessToken){
                if (err) return G.returnServerError(err,fn);
                // console.log(accessToken);
                // delete passengerInfo.__data['user_token'];
                return G.returnStandardSuccessMsg({
                  'id': passengerInfo.id,
                  'user_token': accessToken.id,
                  'passenger_data': passengerInfo,
                },fn);
              });
            });
            // (function genUserToken(){
            //   var userToken = G.randomString(12);
            //   Member.app.models['DB_passenger'].findOne(
            //     {
            //       where:{
            //         'user_token': userToken
            //       }
            //     },
            //     function (err,verifyPassengerInfo){
            //       if(err){ return returnServerError(err,fn); }
            //       if(!verifyPassengerInfo){
            //         passengerInfo.updateAttribute('user_token',userToken,function(err,Instance){
            //           return returnStandardSuccessMsg({
            //             'id': passengerInfo.id,
            //             'user_token': userToken,
            //             'passenger_data': passengerInfo
            //           },fn);
            //         });
            //       } else {
            //         return genUserToken();
            //       }
            //     }
            //   );
            // })();
            // var userToken = G.randomString(12);
            // passengerInfo.setAttribute('user_token',userToken);
            // passengerInfo.save();
            // return fn({
            //   code: '1',
            //   msg: 'Success',
            //   data: {
            //     'id': passengerInfo.id,
            //     'user_token': userToken,
            //     'passenger_data': passengerInfo
            //   }
            // });
          } else {
            // VerificationCode inCorrect Case:
            return G._error('102','VerificationCode incorrect.','null',fn);
          }
        }
      }
    });
  };
  /**
   * [getStatus description]
   * @param  {[type]}   req       [description]
   * @param  {[type]}   id        [description]
   * @param  {[type]}   userToken [description]
   * @param  {Function} fn        [description]
   * @return {[type]}             [description]
   */
  Member.getStatus = function (req,id,userToken,fn){
    debug('Member::getStatus Method Called');
    Member.app.models['DB_passenger'].findOne({
      where:{
        'id': id,
        // 'user_token': userToken
      }
    },function(err,passengerInfo){
      if(err){
        return G.returnServerError(err,fn);
      }
      if (_.isEmpty(passengerInfo)){
        return G._error('102','Passenger id or user_token incorrect!','null',fn);
      } else {
        return returnStandardSuccessMsg({
            'passenger_data':passengerInfo
        },fn);
      }
    });
  };
  
  /**
   * [setInfo description]
   * @param {[type]}   req        [description]
   * @param {[type]}   id         [description]
   * @param {[type]}   userToken  [description]
   * @param {[type]}   deviceId   [description]
   * @param {[type]}   familyName [description]
   * @param {[type]}   givenName  [description]
   * @param {Function} fn         [description]
   */
  Member.setInfo = function (req,id,userToken,deviceId,familyName,givenName,fn){
    debug('Member::setInfo Method Called');
    var ctx = loopback.getCurrentContext();
    var currentUser = ctx.get('currentUser');
    if (+id !== currentUser['realm_id']){
      return G._error('101','CANNOT UPDATE OTHER USERS',{},fn);
    }
    Member.app.models['DB_passenger'].findById(id,function(err,passengerInfo){
      // if(_.isEmpty(passengerInfo) || passengerInfo['user_token'] !== userToken){
      if(req.body.family_name&&req.body.given_name&&!req.body.name) req.body.name = req.body.family_name+req.body.given_name;
      if(_.isEmpty(passengerInfo)){  
        return G._error('102', 'Fail to identify passenger. id or user_token incorrent!!','null',fn);
      } else {
        var protectedProperties = ['id','user_token','tel','country_code'];
        var userInfoFields = ['family_name','given_name','name','tel','country_code','title'];
        var updateAttributes = {};
        var userUpdateAttributes = {};
        Member.app.models['DB_passenger'].forEachProperty(function(PropertyKey){
          if( protectedProperties.indexOf(PropertyKey) === -1 ){
            if( req.body[PropertyKey] ){
              updateAttributes[PropertyKey]=req.body[PropertyKey];
              if(userInfoFields.indexOf(PropertyKey)>-1){
                userUpdateAttributes[PropertyKey]=req.body[PropertyKey];
              }
            }
          }
        });
        // if( _.isEmpty(req.body['status']) ){ updateAttributes['status'] = 1; }
        Member.app.models['taxiGoUsers'].updateAll({
          id: passengerInfo.userId,
        },userUpdateAttributes,function (err,updateResult){
          // console.log(updateResult);
        });
        passengerInfo.updateAttributes(updateAttributes,function(err,updatedPassengerInfo){
          if(err){
            return G.returnServerError(err,fn);
          }
          return G.returnStandardSuccessMsg({
            'passenger_data': updatedPassengerInfo
          },fn);
        });
      }
    });
  };
  Member.getMyOrderRecords = function (req,passengerId,where,limit,fn){
    debug('Member::getMyOrderRecords Method Called');
    if(typeof where === 'string'){
      try{
        where = JSON.parse(where);
      }catch(e){}
    }
    if (typeof where !== 'object') {
      where = {'passenger_id':passengerId};
    }else{
      where = _.extend(where,{'passenger_id':passengerId});
    }
    if(!(+limit>=0))limit = 20;
    limit = limit || 20;
    Member.app.models['DB_passenger_order'].find({
      where:where,
      limit:limit,
      order:'id DESC',
    },function (err,orderInstances){
      if (err) return G.returnServerError(err,fn);
      return G.returnStandardSuccessMsg({'orders':orderInstances},fn);
    });
  };
  Member.updateCurrentLocation = function (req,passengerId,locX,locY,fn){
    debug('Member::updateCurrentLocation Method Called');
    Member.app.models['DB_passenger'].findById(passengerId,function (err,passengerInstance){
      if (err){ return returnServerError(err,fn);}
      var now = new Date();
      passengerInstance.updateAttributes({
        'last_login': now //now.setHours(now.getHours()+8),
      });
      if (_.isEmpty(passengerInstance)) {
        return G._error('102', 'No passenger', 'null', fn);
      }
      locX = +locX;locY = +locY;
      passengerInstance.updateAttributes({
        'loc_x': locX || passengerInstance['loc_x'],
        'loc_y': locY || passengerInstance['loc_y'],
      },function (err,Instance){});
      var currentPoint = new loopback.GeoPoint([locX,locY]);
      switch(passengerInstance['status'].toString()){
        case '1':
          return G.getNearDrivers(currentPoint,{
            'nearDistanceKm' : 100,
            'copyObject' : true,
          },function (err,driversList){
            var i,tempLocStr;
            if (err) { return G.returnServerError(err,fn); }
            for (i = 0; i < driversList.length; i++) {
              try{
                tempLocStr = driversList[i]['loc_str'];
                // delete driversList[i]['loc_str'];
                driversList[i]['loc_str'] = JSON.parse(tempLocStr);

              } catch (e) { driversList[i]['loc_str'] = {}; }
            }

            return G.returnStandardSuccessMsg({
              'driver': driversList,
              'passenger_data': passengerInstance,
            },fn);
          });
        case '2':
          return Member.app.models['DB_passenger_order'].findOne({
            where:{
              'passenger_id': passengerId,
              'status': passengerInstance['status'].toString(),
            },
            order:'id DESC'
          },function (err,orderInstance){
            if (err) { return returnServerError(err,fn); }
            if (_.isEmpty(orderInstance)){ // Case activate order not found!
              return G._error('104','Active order not found!','null',fn);
            } else {
              return G.getNearDrivers(currentPoint,{
                'nearDistanceKm' : 100,
                'copyObject' : true,
              },function (err,driversList){
                var i,tempLocStr;
                if (err) { return G.returnServerError(err,fn); }
                for (i = 0; i < driversList.length; i++) {
                  try{
                    tempLocStr = driversList[i]['loc_str'];
                    // delete driversList[i]['loc_str'];
                    driversList[i]['loc_str'] = JSON.parse(tempLocStr);

                  } catch (e) { driversList[i]['loc_str'] = {}; }
                }

                return G.returnStandardSuccessMsg({
                  'driver': driversList,
                  'passenger_data': passengerInstance,
                  'order_data': orderInstance,
                  'order_id': orderInstance.id
                },fn);
              });
            }
          });          
        case '0':  
        case '3':
        case '5':
          Member.app.models['DB_passenger_order'].findById(
            passengerInstance['waitting_id'],
          function (err,orderInstance){
            if (err) { return returnServerError(err,fn); }
            if (_.isEmpty(orderInstance)){ // Case activate order not found!
              return G._error('104','Active order not found!','null',fn);
            } else {
              var requiredFields = {
                  'id': true,
                  'country_code':true,
                  'direction': true,
                  'during': true,
                  'image': true,
                  'loc_str': true,
                  'loc_x': true,
                  'loc_y': true,
                  'name': true,
                  'order_id': true,
                  'phone': true,
                  'ref_index': true,
                  'license': true,
                };
              return Member.app.models['DB_driver'].findById(
                orderInstance['driver_id'],
                {
                  fields: requiredFields
                },
                function (err,driverInstance){
                  if (err) { return returnServerError(err,fn); }
                  if (!driverInstance){
                    return G.returnStandardSuccessMsg({
                      'passenger_data': passengerInstance,
                    }, fn);
                  }
                  var myDriver = {};
                  Object.keys(requiredFields).map(function (myDriverKey){
                    myDriver[myDriverKey] = driverInstance.__data[myDriverKey];
                    // console.log(myDriverKey, driverInstance.__data['myDriverKey'])
                  });
                  try{
                    myDriver['loc_str'] = JSON.parse(myDriver['loc_str']);
                  }catch(e){
                    myDriver['loc_str'] = {};
                  }
                  // console.log('myDriver: ',myDriver);
                  // console.log('myDriver: ',driverInstance.__data);
                  return G.parseOrderLocation(orderInstance,function (err,orderDataObject){
                    return G.returnStandardSuccessMsg({
                      'order': _.extend( orderInstance.__data, {
                        'start': orderDataObject['start'],
                        'end': orderDataObject['end'],
                      }),
                      'driver': [myDriver],
                      'passenger_data': passengerInstance,
                    }, fn);
                  });
                }
              );
            }
          });
          break;
        default:
          return G._error('105','Passenger Status Error','null',fn);
      }

    });
  };
  Member.getMyDriverDistance = function(fn){
    var ctx = loopback.getCurrentContext();
    var currentUser = ctx.get('currentUser');
    Member.findById(currentUser['realm_id'],function (err,passengerInstance){
      if (err) return G.returnServerError(err,fn);
      if (!passengerInstance) return G._error('104','PASSENGER_NOT_FOUND',{},fn);
      if (passengerInstance['status'].toString()!=='3') return G._error('105','PASSENGER_STATUS_INCORRECT',{},fn);
      Member.app.models['DB_passenger_order'].findById(passengerInstance['waitting_id'],function (err,orderInstance){
        if (err) return G.returnServerError(err,fn);
        if (!orderInstance) return G._error('104','ORDER_NOT_FOUND',{},fn);
        if (!orderInstance['driver_id']) return G._error('104','DRIVER_NOT_FOUND',{},fn);
        Member.app.models['driver'].findById(orderInstance['driver_id'],function (err,driverInstance){
          if (err) return G.returnServerError(err,fn);
          if (!driverInstance) return G._error('104','DRIVER_NOT_FOUND',{},fn);
          G.getSearchLog(orderInstance['starting_point'],function (err,searchLogInstance){
            Member.app.models['location'].getDirection({
              origin:driverInstance['loc_x']+','+driverInstance['loc_y'],
              destination:searchLogInstance['loc_x']+','+searchLogInstance['loc_y']
            },function parseGoogleResult(err,googleResult){
              var returningData = {};
              if(!googleResult['routes']){
                return G._error('102','GOOGLE_API_FAIL',googleResult,fn);
              }
              if(googleResult['routes'][0] && googleResult['routes'][0]['legs'] && googleResult['routes'][0]['legs'][0]){
                returningData = googleResult['routes'][0] && googleResult['routes'][0]['legs'] && googleResult['routes'][0]['legs'] && googleResult['routes'][0]['legs'][0];
                delete returningData.steps;
                return G.returnStandardSuccessMsg(returningData,fn);
              }
              return G._error('105','DIRECTION_NOT_FOUND',{},fn);
            });
          });
        });
      });
    });
  };
  Member.login = function (req,userToken,fn){
    debug('Member::login Method Called');

    // Member.app.models['DB_passenger'].findOne({
    //   where:{
    //     'user_token': userToken
    //   }
    // },function(err,passengerInfo){
    //   if(err){
    //     return G.returnServerError(err,fn);
    //   }
    //   if (_.isEmpty(passengerInfo)){
    //     return G._error('102','Passenger user_token incorrect!','null',fn);
    //   } else {
    //     return returnStandardSuccessMsg({
    //       'passenger_data':passengerInfo
    //     },fn);
    //   }
    // });
  };

  Member.observe('before save', function updateName(ctx, next) {
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
  Member.observe('after save', function updateCorespondingUser(ctx, next) {
    var MemberInstance = ctx.instance;
    var countryCode = ctx.instance['country_code'];
    var tel = ctx.instance['tel'];
    var familyName = ctx.instance['family_name'];
    var givenName = ctx.instance['given_name'];
    var title = ctx.instance['title'];
    var NOW = new Date();
      if (MemberInstance.userId === 0){
        Member.app.models['taxiGoUsers'].create(
          {
            'realm': 'passenger',
            'username': 'p'+countryCode.toString()+tel.toString(),
            'email': countryCode.toString()+tel+'@passenger.telephone.taxigomo',
            'password': '8888',
            'realm_id': MemberInstance.id.toString(),
            'country_code': countryCode,
            'tel': tel,
            'created': NOW,
            'lastUpdated': NOW,
            'family_name': familyName,
            'given_name': givenName,
            'name': familyName+' '+givenName,
            'title': title
          },function(err,userInstance){
            MemberInstance.updateAttributes({
              'userId': userInstance.id.toString()
            });
          }
        );
      } else {
        MemberInstance.user(function (err,user){
          user.updateAttributes({
            'realm': 'passenger',
            'username': 'p'+countryCode.toString()+tel.toString(),
            'email': countryCode.toString()+tel+'@passenger.telephone.taxigomo',
            'country_code': countryCode,
            'tel': tel,
            'lastUpdated': NOW,
            'family_name': familyName,
            'given_name': givenName,
            'name': familyName+' '+givenName,
            'title': title
          },function (err,result){});
        });
      }
    next();
  });
  Member.remoteMethod(
    'genVerificationCode',
    {
      description: 'Generate verification code and send through SMS.',
      accepts: [
        //{arg: 'passengerInfo', type: 'passenger', required: true, http: {source: 'body'}}
        {arg: 'req', type: 'object' , http:{source:'req'} },
        {arg: 'country_code', type: 'string', description: 'Country code.', required: true},
        {arg: 'tel', type: 'string', description: 'Phone Number.', required: true}
      ],
      returns:[
        {arg: 'data', type:'standardResponse', description: 'Status code',root:true},
      ], 
      http: [
//        {verb: 'post', path: '/genVerificationCode.php'},
        {verb: 'post', path: '/genVerificationCode'}
      ],
      notes: [
       'Generate Verification Code and send to the client through SMS to validate the ownership of phone number.'+
       '\n\n**Caution:** Currently verification code is always "8888" and send SMS function not implemented.'
      ] 
    }
  );

  Member.remoteMethod(
    'verifyVerificationCode',
    {
      description: 'Verify the verification entered by client.',
      accepts: [
        {arg: 'req', type: 'object' , http:{source:'req'} },
        {arg: 'country_code', type: 'string', description: 'Country code.', required: true},
        {arg: 'tel', type: 'string', description: 'Phone Number.', required: true},
        {arg: 'verification', type: 'string', description: 'Verification code.', required: true},

      ],
      returns:[
        {arg: 'data', type: 'standardResponse', description: 'Taxi-GO standard return object.',root:true},
      ],
      http: [
//        {verb: 'post', path: '/verifyVerificationCode.php'},
        {verb: 'post', path: '/verifyVerificationCode'},
      ],
      notes:[
        'Generate a new token when client entered correct verification code.'
      ]
    }
  );

  Member.remoteMethod(
    'getStatus',
    {
      description: 'Get the status information of the passenger.',
      accepts: [
        {arg: 'req', type: 'object' , http:{source:'req'} },
        {arg: 'id', type: 'string', description: 'Passenger id.', required: true},
        {arg: 'user_token', type: 'string', description: 'Passenger user_token. (deprecating)', required: true},
      ],
      returns:[
       {arg: 'data', type: 'standardResponse', description: 'Taxi-GO standard return object.',root:true},
      ],
      http: [
//        {verb: 'post', path: '/getStatus.php'},
        {verb: 'post', path: '/getStatus'},
      ],
      notes: [
       'Get status and all infomations of the passenger by providing id & token.'
      ] 
    }
  );
  Member.remoteMethod(
    'login',
    {
      description: 'Get the status information of the passenger by userToken.',
      accepts: [
        {arg: 'req', type: 'object' , http:{source:'req'} },
        {arg: 'user_token', type: 'string', description: 'Passenger user_token. (deprecating)', required: true},
      ],
      returns:[
       {arg: 'data', type: 'standardResponse', description: 'Taxi-GO standard return object.',root:true}
      ],
      http: [
//        {verb: 'post', path: '/login.php'},
        {verb: 'post', path: '/login'},
      ]
    }
  );
  Member.remoteMethod(
    'setInfo',
    {
      description: 'Set additional passenger information after telephone number verified.',
      accepts: [
        {arg: 'req', type: 'object' , http:{source:'req'} },
        {arg: 'id', type: 'string', description: 'Passenger id.', required: true},
        {arg: 'user_token', type: 'string', description: 'Passenger user_token. (deprecating)', required: true},
        {arg: 'device_id', type: 'string', description: 'Passenger device_id.', required: true},
        {arg: 'family_name', type: 'string', description: 'Passenger name.', required: false},
        {arg: 'given_name', type: 'string', description: 'Passenger name.', required: false},
      ],
      returns:[
        {arg: 'data', type: 'standardResponse', description: 'Taxi-GO standard return object.',root:true},
      ],
      http: [
//        {verb: 'post', path: '/setInfo.php'},
        {verb: 'post', path: '/setInfo'},
      ],
      notes: [
       'For update passenger\'s infomation from client side.'
      ] 
    }
  );
  Member.remoteMethod(
    'updateCurrentLocation',
    {
      description: 'Set additional passenger information after telephone number verified.',
      accepts: [
        {arg: 'req', type: 'object' , http:{source:'req'} },
        {arg: 'id', type: 'string', description: 'Passenger id.', required: true},
        {arg: 'loc_x', type: 'string', description: 'Passenger user_token.', required: true},
        {arg: 'loc_y', type: 'string', description: 'Passenger device_id.', required: true},
      ],
      returns:[
        {arg: 'data', type: 'standardResponse', description: 'Taxi-GO standard return object.',root:true},
      ],
      http: [
//        {verb: 'post', path: '/update_current_loc.php'},
        {verb: 'post', path: '/updateCurrentLocation'}
      ],
      notes: [
        'Update passenger location.'
      ]
    }
  );
  Member.remoteMethod(
    'getMyOrderRecords',
    {
      description: 'Set additional passenger information after telephone number verified.',
      accepts: [
        {arg: 'req', type: 'object' , http:{source:'req'} },
        {arg: 'passenger_id', type: 'string', description: 'Passenger id.', required: true},
        {arg: 'where', type: 'string', description: 'Where object JSON stringified [reference](https://docs.strongloop.com/display/public/LB/Where+filter).', required: false},
        {arg: 'limit', type: 'string', description: 'Limit on number of results returned, default 20', required: false},
      ],
      returns:[
        {arg: 'data', type: 'standardResponse', description: 'Taxi-GO standard return object.',root:true},
      ],
      http: [
//        {verb: 'post', path: '/update_current_loc.php'},
        {verb: 'post', path: '/getMyOrderRecords'}
      ]
    }
  );
  Member.remoteMethod(
    'getMyDriverDistance',
    {
      description: 'Get distance and estimate time for driver to come.',
      accepts: [
      ],
      returns: {
        arg: 'data', type: 'standardResponse', root: true,
        description: 'Taxi-GO standard return object.'
      },
      http: {verb: 'post', path: '/getMyDriverDistance'}
    }
  );
};
