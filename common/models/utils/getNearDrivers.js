var loopback = require('loopback');
var _ = require('underscore');
var app = require('../../../server/server.js');
/**
 * getNearDrivers Function.
 * @param  {GeoPoint} geoPoint         loopback GeoPoint Object
 * @param  {Number}   distanceKm       [description]
 * @param  {Function} callbackFunction [description]
 * @return {Array}    nearbyDrivers    Array of nearby drivers DriverInstance.
 */
var debug = require('debug')('taxi-go:model');
module.exports = function(geoPoint,options,callbackFunction){


  var distanceKm,geoNearDistance;
  var searchConditions = {};
  var startX = geoPoint.lat;
  var startY = geoPoint.lng;

  

  if (typeof options === 'number' || typeof options === 'string') {
    distanceKm = +options;
  } else{
    distanceKm = +options.nearDistanceKm || +options.distanceKm || 2;
  }
  geoNearDistance = distanceKm*0.01; // Approx distance KM->lat/lng ~ 1*1/9

  searchConditions.where =  {
    'status': 1,
    'loc_x':{between:[startX-geoNearDistance,startX+geoNearDistance]},
    'loc_y':{between:[startY-geoNearDistance,startY+geoNearDistance]},
  };

  searchConditions.fields = options.fields || {
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
  };

  app.models['DB_driver'].find(searchConditions ,function (err,drivers){
      if (err) { callbackFunction(err,undefined);}
      var i,driverLocation;
      var nearbyDrivers = [];
      var tempDriveritem;
      var driverInstanceKeys;
      for (i = 0; i < drivers.length; i++) {
        driverLocation = new loopback.GeoPoint([
          drivers[i]['loc_x'], drivers[i]['loc_y']
        ]);
        drivers[i]['distanceRange'] = driverLocation.distanceTo(geoPoint,{type:'kilometers'});
        if (typeof options === 'object') {
          if(typeof options.driversIteritor === 'function') options.driversIteritor(drivers);
          if(options.copyObject){
            tempDriveritem = {};
            driverInstanceKeys = Object.keys(drivers[i]['__data']);
            for (var j = 0; j < driverInstanceKeys.length; j++) {
              tempDriveritem[driverInstanceKeys[j]] = drivers[i]['__data'][driverInstanceKeys[j]];
            }
          } else {
            tempDriveritem = drivers[i];
          }
          if (drivers[i]['distanceRange'] < distanceKm) nearbyDrivers.push(tempDriveritem);
        } else {
          if (drivers[i]['distanceRange'] < distanceKm) nearbyDrivers.push(drivers[i]);  
        }

        
      }
      // Array.filter implementation (Hide as temporarily much slower.).
      // var nearbyDrivers = drivers.filter(function (driverInstance,index){
      //   var driverLocation = new loopback.GeoPoint([
      //     driverInstance['loc_x'],driverInstance['loc_y']
      //   ]);
      //   var driverDistance = driverLocation.distanceTo(geoPoint,{type:'kilometers'});
      //   driverInstance['distanceRange'] = driverDistance;
      //   // Define near driver (within 2km).
      //   return driverDistance < distanceKm;
      // });
      return callbackFunction(undefined,nearbyDrivers);
    }
  );
};
