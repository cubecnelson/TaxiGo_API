var G = require('./utils/utils.js');
var _ = require('underscore');
var rq = require('request-promise');
var queryString = require('query-string');

var debug = require('debug')('taxi-go:model');
module.exports = function (Location) {
  var apiLanguage = 'ZH-TW';
  var apiKey = 'AIzaSyAsroLZ-LF6xqPn0W4Na6BwjC7Knm05v3o';
  
  Location.autocomplete = function (req,keyword,fn){
    debug('Location::autocomplete Method Called');
    var baseUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
    var mapUrl = baseUrl + '?' + queryString.stringify({
      components: 'country:mo',
      input:      keyword,
      key:        apiKey,
      language:   apiLanguage,
    });
    var returningData = [];
    var i;
    rq(mapUrl).then(function (responseSuccessBody){
      var mapJson;
      try{
        mapJson = JSON.parse(responseSuccessBody);
      }catch(e){
        console.log(e);
        return false;
      }
      if (_.isEmpty(mapJson['predictions'])){
        return G.returnStandardSuccessMsg(returningData,fn);
      }else{
        for (i = 0; i < mapJson['predictions'].length - 1; i+=1) {
          if (mapJson['predictions'][i]['terms'].length) {
          returningData.push({
            'place_id':   mapJson['predictions'][i]['place_id'],
            'first_desc': mapJson['predictions'][i]['description'],
            'sec_desc':   mapJson['predictions'][i]['terms'].map(function (item){
                            return item.value;
                          }).join(', '),
          });
          }
        }
        return G.returnStandardSuccessMsg(returningData,fn);
      }
    },function (responseFailBody){
      return G._error('102','GOOGLE_API_FAIL',responseFailBody,fn);
    });
    //Location.app.models.DB_driver.findById();

  };
  Location.nearList = function (req,location,radius,fn){
    debug('Location::nearList Method Called');
    var baseUrl = 'https://maps.googleapis.com/maps/api/place/search/json';
    var mapUrl = baseUrl + '?' + queryString.stringify({
      components: 'country:mo',
      key:        apiKey,
      language:   apiLanguage,
      location:   location,
      rankby:     'distance',
      sensor:     'false',
      types:      'establishment',
    });
    var returningData = [];
    rq(mapUrl).then(function (responseSuccessBody){
      var mapJson;
      try{
        mapJson = JSON.parse(responseSuccessBody);
      }catch(e){
        console.log(e);
        return false;
      }
      if (_.isEmpty(mapJson)){
        return G.returnServerError('Not result from Google returned.',fn);
      } else {
        if (mapJson['results'] && mapJson['results'][1] && mapJson['results'][1]['name']) {
          returningData.push({
            'first_desc': mapJson['results'][1]['name'],
            'sec_desc':   mapJson['results'][1]['vicinity'],
            'location':   mapJson['results'][1]['geometry']['location'],
            'place_id':   mapJson['results'][1]['place_id'],
          });
          return G.returnStandardSuccessMsg(returningData,fn);
        } else if (mapJson['results'][0] && mapJson['results'][0]['name']){
          returningData.push({
            'first_desc': mapJson['results'][0]['name'],
            'sec_desc':   mapJson['results'][0]['vicinity'],
            'location':   mapJson['results'][0]['geometry']['location'],
            'place_id':   mapJson['results'][0]['place_id'],
          });
          return G.returnStandardSuccessMsg(returningData,fn);
        }
        returningData.push({
          'first_desc': '某個地方',
          'sec_desc':   '地球上',
          'location':   {lat:location.split(',')[0],lng:location.split(',')[1]},
          'place_id':   'NOT_EXIST_ON_EARTH',
        });
        return G.returnStandardSuccessMsg(returningData,fn);
        
      }



    },function (responseFailBody){
      return G.returnServerError(responseFailBody,fn);
    });
  };
  Location.getDirection = function(options,fn){
    if (options.origin && options.destination){
      var baseUrl = 'https://maps.googleapis.com/maps/api/directions/json';
      var mapUrl = baseUrl + '?' + queryString.stringify(options);
      var returningData = [];
      var i;
      return rq(mapUrl).then(function (responseSuccessBody){
        var mapJson;
        try{
          mapJson = JSON.parse(responseSuccessBody);
        }catch(e){
          console.log(e);
          return false;
        }
        return fn(undefined,mapJson);
        // if (_.isEmpty(mapJson['routes'])){
        // return G.returnStandardSuccessMsg(returningData,fn);
        // 
        // }else{
        //   for (i = 0; i < mapJson['routes'].length - 1; i+=1) {
        //     if (mapJson['predictions'][i]['terms'].length) {
        //     returningData.push({
        //       'place_id':   mapJson['predictions'][i]['place_id'],
        //       'first_desc': mapJson['predictions'][i]['description'],
        //       'sec_desc':   mapJson['predictions'][i]['terms'].map(function (item){
        //                       return item.value;
        //                     }).join(', '),
        //     });
        //     }
        //   }
        //   return G.returnStandardSuccessMsg(returningData,fn);
        // }
      },function (responseFailBody){
        return G._error('102','GOOGLE_API_FAIL',responseFailBody,fn);
      });

    } else {
      fn(new Error('undefined origin or destination'));
    }
  };

  Location.remoteMethod(
    'autocomplete',
    {
      description: 'Get the driver data.',
      accepts: [
        //{arg: 'passengerInfo', type: 'passenger', required: true, http: {source: 'body'}}
        {arg: 'req', type: 'object' , http:{source:'req'} },
        {arg: 'keyword', type: 'string', description: 'Passenger id.', required:true},
      ],
      returns:[
        {arg: 'data', type:'standardResponse', description: 'Status code',root:true},
      ], 
      http: [
//        {verb: 'post', path: '/autocomplete.php'},
        {verb: 'post', path: '/autocomplete'},
      ]
    }
  );
  Location.remoteMethod(
    'nearList',
    {
      description: 'Get near place item data:[{googlePlace}].',
      accepts: [
        //{arg: 'passengerInfo', type: 'passenger', required: true, http: {source: 'body'}}
        {arg: 'req', type: 'object' , http:{source:'req'} },
        {arg: 'location', type: 'string', description: 'location X,Y .', required:true},
        {arg: 'radius', type: 'string', description: 'Radius .', required:false}      ],
      returns:[
        {arg: 'data', type:'standardResponse', description: 'TaxiGo Standard response object',root:true},
      ], 
      http: [
//        {verb: 'post', path: '/nearList.php'},
        {verb: 'post', path: '/nearList'},
      ]
    }
  );
  Location.remoteMethod(
    'getDirection',
    {
      description: 'Get near place item data:[{googlePlace}].',
      accepts: [
        //{arg: 'passengerInfo', type: 'passenger', required: true, http: {source: 'body'}}
        {arg: 'options', type: 'object', description: 'request object', required:true},
      ],
      returns:[
        {arg: 'data', type:'object', description: 'Google Response object',root:true},
      ], 
      http: [
//        {verb: 'post', path: '/nearList.php'},
        {verb: 'post', path: '/getDirection'},
      ]
    }
  );
};
