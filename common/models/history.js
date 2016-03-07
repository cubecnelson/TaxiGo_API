var G = require('./utils/utils.js');
var _ = require('underscore');
var rq = require('request-promise');
var queryString = require('query-string');

var debug = require('debug')('taxi-go:model');
module.exports = function (History) {
  var apiLanguage = 'ZH-TW';
  var apiKey = 'AIzaSyAsroLZ-LF6xqPn0W4Na6BwjC7Knm05v3o';
  /**
   * [getHotel description]
   * @param  {[type]}   req [description]
   * @param  {Function} fn  [description]
   * @return {[type]}       [description]
   */
  History.getHotel = function (req,fn){
    debug('History::getHotel Method Called');
    History.app.models['DB_search_hotel'].find({
      fields:{
        'id':true, 'place_id': true, 'first_desc': true, 'loc_x': true, 'loc_y': true,
        'reference_code': true, 'image': true
      },
      where:{
        'reference_code':{
          neq: 'AP_0',
        }
      },
      order: 'sort'
    },function (err,searchHotelInstances){
      return G.returnStandardSuccessMsg(searchHotelInstances,fn);
    });
  };
  /**
   * [getSearchLogs description]
   * @param  {[type]} uid  [description]
   * @param  {[type]} type [description]
   * @return {[type]}      [description]
   */
  History.getSearchLogs = function (req,uid,fn){
    debug('History::getSearchLogs Method Called');
    var numberOfQuries = 4;
    var returningObject = {};
    function returnWhenReady(){
      numberOfQuries -= 1;
      if (numberOfQuries === 0) {
        return G.returnStandardSuccessMsg(returningObject,fn);
      }
    }
    History.app.models['DB_search_home'].find({
      'where' : {
        'user_id': uid
      },
      'limit':'50',
      order:'date DESC',
    },function (err,results){
      returningObject['home'] = results;
      returnWhenReady();
    });
    History.app.models['DB_search_company'].find({
      'where' : {
        'user_id': uid
      },
      'limit':'50',
      order:'date DESC',
    },function (err,results){
      returningObject['company'] = results;
      returnWhenReady();
    });
    History.app.models['DB_search_log'].find({
      'where' : {
        'user_id': uid
      },
      'limit':'50',
      order:'date DESC',
    },function (err,results){
      returningObject['normal'] = results;
      returnWhenReady();
    });
    History.app.models['DB_search_hotel'].find({
      'where' : {
        'reference_code':{
          'neq' : 'AP_0',
        }
      },
      order:'date DESC',
    },function (err,results){
      returningObject['hotel'] = results;
      returnWhenReady();
    });
  };
  /**
   * [setCompany description]
   * @param {[type]}   req         [description]
   * @param {[type]}   passengerId [description]
   * @param {[type]}   placeId     [description]
   * @param {[type]}   firstDesc   [description]
   * @param {[type]}   secDesc     [description]
   * @param {Function} fn          [description]
   */
  History.setCompany = function (req,passengerId,placeId,firstDesc,secDesc,fn){
    debug('History::setCompany Method Called');
    var now = new Date();
    var requestUrl = 'https://maps.googleapis.com/maps/api/geocode/json?'+queryString.stringify({
      'key'   : apiKey,
      'language' : apiLanguage,
      'place_id' : placeId,
    });
    rq(requestUrl).then(function (resBody){
      var responseObject;
      try{
        responseObject = JSON.parse(resBody);
      }catch(e){
        return G._error('110','Google Api error','null',fn); 
      }
      if (responseObject['status'] !== 'OK'){
        console.error(responseObject);
        return G._error('110','Google Api error','null',fn);
      }
      var point =responseObject['results'][0]['geometry']['location'];
      (function genReferenceCode(){
        var generatedReferenceCode = 'CO_'+G.md5(Math.random().toString().substr(2,8));
        History.app.models['DB_search_company'].findOne(
          {
            where:{
              'reference_code': generatedReferenceCode
            }
          },
          function (err,searchLogInstance){
            if(err){ return G.returnServerError(err,fn); }
            if(_.isEmpty(searchLogInstance)){
              // console.log('creating searchLog');
              History.app.models['DB_search_company'].create({
                'user_id'        : passengerId,
                'place_id'       : placeId,
                'reference_code' : generatedReferenceCode,
                'date'           : now ,//now.setHours(now.getHours() + 8),
                'first_desc'     : firstDesc,
                'sec_desc'       : secDesc,
                'loc_x'          : point['lat'],
                'loc_y'          : point['lng'],
              },function (err,insertedInstance){
                if (err){ return G.returnServerError(err,fn); }
                return G.getSearchLog(generatedReferenceCode,function (err,searchLogInstance){
                  return G.returnStandardSuccessMsg(searchLogInstance,fn);
                });
              });
            } else {
              return genReferenceCode();
            }
          }
        );
      })();
    }, function (err){
      return G._error('110','Google Api error','null',fn);
    });
  };
  History.setHome = function (req,passengerId,placeId,firstDesc,secDesc,fn){
    debug('History::setHome Method Called');
    var now = new Date();
    var requestUrl = 'https://maps.googleapis.com/maps/api/geocode/json?'+queryString.stringify({
      'key'   : apiKey,
      'language' : apiLanguage,
      'place_id' : placeId,
    });
    rq(requestUrl).then(function (resBody){
      var responseObject;
      try{
        responseObject = JSON.parse(resBody);
      }catch(e){
        console.log(e);
        return G._error('110','Google Api error','null',fn);
      }
      if (responseObject['status'] !== 'OK'){
        console.error(responseObject);
        return G._error('110','Google Api error','null',fn);
      }
      var point =responseObject['results'][0]['geometry']['location'];
      (function genReferenceCode(){
        var generatedReferenceCode = 'HO_'+G.md5(Math.random().toString().substr(2,8));
        History.app.models['DB_search_home'].findOne(
          {
            where:{
              'reference_code': generatedReferenceCode
            }
          },
          function (err,searchLogInstance){
            if(err){ return G.returnServerError(err,fn); }
            if(_.isEmpty(searchLogInstance)){
              // console.log('creating searchLog');
              History.app.models['DB_search_home'].create({
                'user_id'        : passengerId,
                'place_id'       : placeId,
                'reference_code' : generatedReferenceCode,
                'date'           : now ,//now.setHours(now.getHours() + 8),
                'first_desc'     : firstDesc,
                'sec_desc'       : secDesc,
                'loc_x'          : point['lat'],
                'loc_y'          : point['lng'],
              },function (err,insertedInstance){
                if (err){ return G.returnServerError(err,fn); }
                return G.getSearchLog(generatedReferenceCode,function (err,searchLogInstance){
                  return G.returnStandardSuccessMsg(searchLogInstance,fn);
                });
              });
            } else {
              return genReferenceCode();
            }
          }
        );
      })();
    }, function (err){
      return G._error('110','Google Api error','null',fn);
    });
  };
  History.setNormal = function (req,referenceCode,passengerId,placeId,firstDesc,secDesc,fn){
    debug('History::setNormal Method Called');
    if (placeId == 'NOT_EXIST_ON_EARTH')return;
    var now = new Date();

    if (referenceCode) {
      return History.app.models['DB_search_log'].findOne({
        'reference_code':referenceCode
      },function (err,searchLogInstance){
        if (err) return G.returnServerError(err,fn);
        searchLogInstance.updateAttributes({
          'date': now //now.setHours(now.getHours() + 8),
        },function (err,updatedSearchLog) {
          if (err) return G.returnServerError(err,fn);
          return G.returnStandardSuccessMsg({
            'reference_code': updatedSearchLog['reference_code']
          },fn);
        });

      });
    } else {
      History.app.models['DB_search_log'].findOne({
        where: {
          'user_id': passengerId,
          'place_id': placeId,
          'reference_code':{
            'regexp':'^NO'
          }
        }
      },function (err,searchLogInstance){
        if (err) return G.returnServerError(err,fn);
        if (_.isEmpty(searchLogInstance)){
          return askGoogleForLocation();
        } else {
          searchLogInstance.updateAttributes({
            'date': now //now.setHours(now.getHours() + 8),
          },function (err,updatedSearchLogInstance){
            if (err) return G.returnServerError(err,fn);
            return G.returnStandardSuccessMsg(updatedSearchLogInstance,fn);
          });
        }
      });
    }
    function askGoogleForLocation(){
      var requestUrl = 'https://maps.googleapis.com/maps/api/geocode/json?'+queryString.stringify({
        'key'   : apiKey,
        'language' : apiLanguage,
        'place_id' : placeId,
      });
      rq(requestUrl).then(function (resBody){
        var responseObject;
        try{
          responseObject = JSON.parse(resBody);
        }catch(e){
          return G._error('110','Google Api error','null',fn); 
        }
        if (responseObject['status'] !== 'OK'){
          return G._error('110','Google Api error','null',fn);
        }
        var point = responseObject['results'][0]['geometry']['location'];
        if (!_.isEmpty(point)){
          (function genReferenceCode(){
            var generatedReferenceCode = 'NO_'+G.md5(Math.random().toString().substr(2,8));
            History.app.models['DB_search_log'].findOne(
              {
                where:{
                  'reference_code': generatedReferenceCode
                }
              },
              function (err,searchLogInstance){
                if(err){ return G.returnServerError(err,fn); }
                if(_.isEmpty(searchLogInstance)){
                  // console.log('creating searchLog');
                  History.app.models['DB_search_log'].create({
                    'user_id'        : passengerId,
                    'place_id'       : placeId,
                    'reference_code' : generatedReferenceCode,
                    'date'           : now ,//now.setHours(now.getHours() + 8),
                    'first_desc'     : firstDesc,
                    'sec_desc'       : secDesc,
                    'loc_x'          : point['lat'],
                    'loc_y'          : point['lng'],
                  },function (err,insertedInstance){
                    if (err){ return G.returnServerError(err,fn); }
                    return G.getSearchLog(generatedReferenceCode,function (err,searchLogInstance){
                      return G.returnStandardSuccessMsg(searchLogInstance,fn);
                    });
                  });
                } else {
                  return genReferenceCode();
                }
              }
            );
          })();
        }

      },function (err){ 
        return G._error('110','Google Api error','null',fn); 
      });
    }
  };
  History.remoteMethod(
    'getSearchLogs',
    {
      description: 'Get the hotel location definition.',
      accepts: [
        //{arg: 'passengerInfo', type: 'passenger', required: true, http: {source: 'body'}}
        {arg: 'req', type: 'object' , http:{source:'req'} },
        {arg: 'uid', type: 'string', description: 'User id.', required:true},
      ],
      returns:[
        {arg: 'data', type:'standardResponse', description: 'Status code',root:true},
      ], 
      http: [
//        {verb: 'post', path: '/searchLog.php'},
        {verb: 'post', path: '/searchLog'},
      ]
    }
  );
  History.remoteMethod(
    'getHotel',
    {
      description: 'Get the hotel location definition.',
      accepts: [
        //{arg: 'passengerInfo', type: 'passenger', required: true, http: {source: 'body'}}
        {arg: 'req', type: 'object' , http:{source:'req'} },
      ],
      returns:[
        {arg: 'data', type:'standardResponse', description: 'Status code',root:true},
      ], 
      http: [
//        {verb: 'post', path: '/getHotel.php'},
        {verb: 'post', path: '/getHotel'},
      ]
    }
  );
  History.remoteMethod(
    'setCompany',
    {
      description: 'Get the driver data.',
      accepts: [
        //{arg: 'passengerInfo', type: 'passenger', required: true, http: {source: 'body'}}
        {arg: 'req', type: 'object' , http:{source:'req'} },
        {arg: 'passenger_id', type: 'string', description: 'Passenger id.', required:true},
        {arg: 'place_id', type: 'string', description: 'Place id.', required:true},
        {arg: 'first_desc', type: 'string', description: 'Place id.', required:true},
        {arg: 'sec_desc', type: 'string', description: 'Place id.', required:true}
      ],
      returns:[
        {arg: 'data', type:'standardResponse', description: 'Status code',root:true},
      ], 
      http: [
//        {verb: 'post', path: '/setCompany.php'},
        {verb: 'post', path: '/setCompany'},
      ]
    }
  );
  History.remoteMethod(
    'setHome',
    {
      description: 'Get the driver data.',
      accepts: [
        //{arg: 'passengerInfo', type: 'passenger', required: true, http: {source: 'body'}}
        {arg: 'req', type: 'object' , http:{source:'req'} },
        {arg: 'passenger_id', type: 'string', description: 'Passenger id.', required:true},
        {arg: 'place_id', type: 'string', description: 'Place id.', required:true},
        {arg: 'first_desc', type: 'string', description: 'Place id.', required:true},
        {arg: 'sec_desc', type: 'string', description: 'Place id.', required:true}
      ],
      returns:[
        {arg: 'data', type:'standardResponse', description: 'Status code',root:true},
      ], 
      http: [
//        {verb: 'post', path: '/setHome.php'},
        {verb: 'post', path: '/setHome'},
      ]
    }
  );
  // History.setNormal = function (req,referenceCode,passengerId,placeId,firstDesc,secDesc,fn){
  History.remoteMethod(
    'setNormal',
    {
      description: 'Get the driver data.',
      accepts: [
        //{arg: 'passengerInfo', type: 'passenger', required: true, http: {source: 'body'}}
        {arg: 'req', type: 'object' , http:{source:'req'} },
        {arg: 'reference_code', type: 'string', description: 'Place referenceCode.'},
        {arg: 'passenger_id', type: 'string', description: 'Passenger id.', required:true},
        {arg: 'place_id', type: 'string', description: 'Place id.', required:true},
        {arg: 'first_desc', type: 'string', description: 'Place id.', required:true},
        {arg: 'sec_desc', type: 'string', description: 'Place id.', required:true}
      ],
      returns:[
        {arg: 'data', type:'standardResponse', description: 'Status code',root:true},
      ], 
      http: [
//        {verb: 'post', path: '/setNormal.php'},
        {verb: 'post', path: '/setNormal'},
      ]
    }
  );
};
