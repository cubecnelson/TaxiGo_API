var loopback = require('loopback');
var G = require('../utils/utils.js');
var debug = require('debug')('taxi-go:model');
var _ = require('underscore');
module.exports = function(Gifts) {
  var filters={};
  // filters.inRealm = function (giftInstance){
  //   return giftInstance.realm.indexOf()
  // }
  Gifts.getAvailableGifts = function (fn){
    debug('Gifts::getAvailableGifts Method Called');
    var ctx = loopback.getCurrentContext();
    var currentUser = ctx.get('currentUser');
    if (currentUser){
      Gifts.find({
        // where:{
        //   'realm':currentUser.realm
        // }  
      },function (err,Instances){
        //Instances: Array of Instances' Instance
        if(err){
          //Error Handling
        }
        Instances = Instances || [];
        Instances = Instances.filter(function (giftInstance){
          return giftInstance.realm.indexOf(currentUser.realm)> -1;
        });
        // Do Something
        return G.returnStandardSuccessMsg({'available_gifts':Instances},fn);
      });
    } else {
      return G._error('102','Login required',{},fn);
    }
  };
  Gifts.getMyRedeemRecords = function (filter,fn){
    debug('Gifts::getMyRedeemRecords Method Called');
    // console.log("getMyRedeemRecords fired");
    var ctx = loopback.getCurrentContext();
    var currentUser = ctx.get('currentUser');
    filter = filter || {};
    _.extend(filter, {
      where:{
        'user_id':currentUser.id  
      }
    });
    console.log('currentUser',currentUser);
    if (currentUser){
      Gifts.app.models['gift_redeem'].find(
        filter,
      function (err,giftRedeemInstances){
        console.log(giftRedeemInstances);
        var Instances = giftRedeemInstances || [];
        return G.returnStandardSuccessMsg({
          'redeem_records': Instances,
        },fn);
      });
    } else {
      return G._error('102','Login required',{},fn);
    }
  };
  Gifts.missionRedeem = function (giftId,fn){
    debug('Gifts::missionRedeem Method Called');
    var NOW = new Date();
    var ctx = loopback.getCurrentContext();
    var currentUser = ctx.get('currentUser');
    Gifts.findById(giftId, function (err,giftInstance){
      if(err){
        return G.returnServerError(err,fn);
      }
      if(!giftInstance){
        return G._error('104','Gift not found.',{
          'gift_data':{},
          'current_gift_points':currentUser['gift_points'],
          'consumed_gift_points':0,
        },fn);
      }
      Gifts.app.models['gift_redeem'].create({
        'gift_id': giftInstance.id,
        'user_id': currentUser.id,
        'redeem_datetime': NOW,
        'redeem_type': 'MISSION',
        'cost': 0,
      },function (err,giftRedeemInstance){
        fn(err,giftRedeemInstance);
      });
    });
  };
  Gifts.redeem = function (giftId,fn){
    debug('Gifts::redeem Method Called');
    var NOW = new Date();
    var ctx = loopback.getCurrentContext();
    var currentUser = ctx.get('currentUser');
    Gifts.findById(giftId, function (err,giftInstance){
      if(err){
        return G.returnServerError(err,fn);
      }
      if(!giftInstance){
        return G._error('104','Gift not found.',{
          'gift_data':{},
          'current_gift_points':currentUser['gift_points'],
          'consumed_gift_points':0,
        },fn);
      }
      if(giftInstance['realm'].indexOf(currentUser.realm)<0){
        return G._error('105','REALM_INCORRECT',{},fn);
      }
      // Do Something
      if(giftInstance.cost >= giftInstance.cost){
        Gifts.app.models.TaxiGoUsers.consumeGiftPoints(giftInstance.cost,function (err,userInstance){
          if (err && err==='NOT_ENOUGH_POINTS'){
            return G._error('102','Not Enough Gift Points.',{
              'gift_data':{},
              'current_gift_points':userInstance['gift_points'],
              'consumed_gift_points':0,
            },fn);
          }
          Gifts.app.models['gift_redeem'].create({
            'gift_id': giftInstance.id,
            'user_id': userInstance.id,
            'redeem_datetime': NOW,
            'redeem_type': 'GIFT',
            'cost': giftInstance.cost,
          },function (err,giftRedeemInstance){

          });
          return G.returnStandardSuccessMsg({
            'gift_data':giftInstance,
            'current_gift_points':userInstance['gift_points'],
            'consumed_gift_points':giftInstance.cost,
          },fn);
        });
      } else {
        return G._error('102','Not Enough Gift Points.',{
          'gift_data':{},
          'current_gift_points':currentUser['gift_points'],
          'consumed_gift_points':0,
        },fn);
      }
    });
  };

  Gifts.afterRemote('find', function (ctx,Instances, next) { 
    if(ctx.result && ctx.result.length){
      var host = ctx.req.get('host');
      var reqRoot = ctx.req.protocol + '://'+host;
      for (var i = ctx.result.length - 1; i >= 0; i--) {
        if (ctx.result[i].icon && ctx.result[i].icon.length){
          ctx.result[i].image = reqRoot +'/public/gift-icons/'+ ctx.result[i].icon;
        }
      }
    }
    if(typeof next === 'function')next();
  });
  Gifts.afterRemote('findById', function (ctx,Instance, next) { 
    if(ctx.result && ctx.result.icon && ctx.result.icon.length){
      var host = ctx.req.get('host');
      var reqRoot = ctx.req.protocol + '://'+host;
      if (ctx.result.icon && ctx.result.icon.length){
        ctx.result.image = reqRoot +'/public/gift-icons/'+ ctx.result.icon;
      }
    }
    if(typeof next === 'function')next();
  });

  Gifts.remoteMethod(
    'getAvailableGifts',
    {
      description: 'Show available gifts. *Require login.',
      returns: {
        arg: 'data', type: 'standardResponse', root: true,
        description:
          'Taxi-GO standard return object.\n'
      },
      http: {verb: 'post', path: '/getAvailableGifts'}
    }
  );
  Gifts.remoteMethod(
    'getMyRedeemRecords',
    {
      description: 'Show redeem records. *Require login.',
      accepts: [
        { arg: 'filter', type: 'object', description: 'Filter defining fields, where, include, order, offset, and limit' },
      ],
      returns: {
        arg: 'data', type: 'standardResponse', root: true,
        description:
          'Taxi-GO standard return object.\n'
      },
      http: {verb: 'post', path: '/getMyRedeemRecords'}
    }
  );
  Gifts.remoteMethod(
    'redeem',
    {
      description: 'Method for claiming a gift *Require login.',
      accepts: [
        {arg: 'giftId', type:'string'}
      ],
      returns: {
        arg: 'data', type: 'standardResponse', root: true,
        description:
          'Taxi-GO standard return object.\n'
      },
      http: {verb: 'post', path: '/redeem'}
    }
  );
};