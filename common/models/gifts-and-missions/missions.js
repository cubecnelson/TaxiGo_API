var _ = require('underscore');
var G = require('../utils/utils.js');
var loopback = require('loopback');
var debug = require('debug')('taxi-go:model');
module.exports = function(Missions) {
  var filters={};
    filters.isOngoing = function (missionInstances){
      var NOW = new Date();
      if (missionInstances['available_since'] === null || missionInstances['available_since']>NOW) {
        return false;
      }
      if (missionInstances['available_till'] !== null && missionInstances['available_till']<NOW) {
        return false;
      }
      if (missionInstances['void_after'] !== null && missionInstances['void_after']<NOW) {
        return false;
      }
      return true;
    };
  Missions.getCutoff = function (missionInstance){
    debug('Messions::getCutoff Method Called');
    var NOW = new Date();
    switch (missionInstance['mission_type']){
      case 'DAILY_MISSION':
        var cutoff;
        if (missionInstance['cutoff_time']) {
          cutoff = new Date(missionInstance['cutoff_time']);
          cutoff.setFullYear(NOW.getFullYear());
          cutoff.setMonth(NOW.getMonth());
          cutoff.setDate(NOW.getDate());
          if (cutoff < NOW) cutoff.setHours(cutoff.getHours()+24);
        } else {
          cutoff = new Date();
          cutoff.setHours(0);
          cutoff.setMinutes(0);
          cutoff.setSeconds(0);
          cutoff.setMilliseconds(0);
          cutoff.setHours(cutoff.getHours()+24);
        }
        return cutoff;
      default:
      case 'REPEATING_MISSION':
      case 'PRESISTED_MISSION':
        if (missionInstance['available_till']===null) {
          return missionInstance['void_after'] || Infinity;
        } else {
          if(missionInstance['available_till'] instanceof Date){
            return missionInstance['available_till'];
          }
          return new Date(missionInstance['available_till']);
        }
    }
  };
  Missions.validMissionProgress = function (missionInstance,missionProgressInstance){
    debug('Messions::validMissionProgress Method Called');
    var NOW = new Date();
    var cutoff = Missions.getCutoff(missionInstance);
    if (_.isEmpty(missionProgressInstance)) return false;
    // if (_.isEmpty(missionProgressInstance['begining_timestamp'])) return false;
    // if (NOW > cutoff) return false;
    switch(missionInstance['mission_type']){
      case 'DAILY_MISSION':
        cutoff.setHours(cutoff.getHours()-24);
        if(missionProgressInstance['begining_timestamp']<cutoff) return false;
        cutoff.setHours(cutoff.getHours()+24);
        return true;
      case 'REPEATING_MISSION':
      case 'PRESISTED_MISSION':
        if(missionProgressInstance['begining_timestamp']<missionInstance['available_since']) return false;
        return true;
    }
  };
  Missions.getUserMissionProgresses = function (userInstance,fn){
    debug('Messions::getUserMissionProgresses Method Called');
    return Missions.app.models['view_distinct_mission_progress'].find({
      'user_id': userInstance.id,
    },function (err,userMissionProgresses){
      if (err) return fn (err);
      return fn(err,userMissionProgresses);
    });
  };
  Missions.getUserMissionProgress = function (userInstance,missionId,fn){
    debug('Messions::getUserMissionProgress Method Called');
    return Missions.app.models['view_distinct_mission_progress'].findOne({
      'user_id': userInstance.id,
      'mission_id': missionId
    },fn);
  };
  Missions.getMyMissionProgresses = function(fn){
    debug('Messions::getMyMissionProgresses Method Called');
    var ctx = loopback.getCurrentContext();
    var currentUser = ctx.get('currentUser');
    if (!currentUser) return G._error('102','User not defined',{},fn);
    return Missions.getUserMissionProgresses(currentUser,function (err,userMissionProgresses){
      return G.returnStandardSuccessMsg({
        'mission_progresses_data':userMissionProgresses
      });
    });
  };
  Missions.getUserMissions = function (userInstance,fn){
    debug('Messions::getUserMissions Method Called');
    var NOW = new Date();
    return Missions.find({
      where: {
        'available_since':{
          lt: NOW
        }
      }
    },function (err,missionInstances){
      if (err) return G.returnServerError(err,fn);
      missionInstances = missionInstances || [];
      missionInstances = missionInstances.filter(function (missionInstance){
        return missionInstance.realm.indexOf(userInstance.realm)>-1;
      });
      return fn(err,missionInstances || []);
    });
  };
  
  Missions.getMissionProgress = function (missionInstance,userInstance,fn){
    debug('Messions::getMissionProgress Method Called');
    var NOW = new Date();
    Missions.app.models['mission_progress'].findOne({
      where:{
        'mission_id': missionInstance.id,
        'user_id': userInstance.id,
      },
      order:'id DESC'
    },function (err,progressInstance){
      if(Missions.validMissionProgress(missionInstance,progressInstance)){
        missionInstance.progress = progressInstance;
        return fn(err,progressInstance);
      } else {
        Missions.app.models['mission_progress'].create({
          'gift_id': missionInstance['gift_id'],
          'mission_name': missionInstance['name'],
          'gift_points': missionInstance['gift_points'],
          'mission_id': missionInstance.id,
          'user_id': userInstance.id,
          'required_count': missionInstance['required_count'],
          'progress_count': 0,
          'last_update': NOW,
          'begining_timestamp': NOW,
          'completed': false
        },function (err,createdInstance){
          missionInstance.progress = createdInstance;
          return fn(err,createdInstance);
        });
      }
    });
  };
  Missions.getMyMissionRecords = function (filter,fn){
    debug('Messions::getMyMissionRecords Method Called');
    var ctx = loopback.getCurrentContext();
    var currentUser = ctx.get('currentUser');
    if (!currentUser) return G._error('102','User not defined',{},fn);
    filter = filter || {};
    _.extend(filter,{
      where:{
        'user_id':currentUser.id
      }  
    });
    Missions.app.models['mission_progress'].find(
      filter,
    function (err,Instances){
      //Instances: Array of Instances' Instance
      if(err){
        //Error Handling
      }
      if(!Instances){
        Instances = [];
      }
      // Do Something
      return G.returnStandardSuccessMsg({'mission_history':Instances},fn);
    });
  };
  /**
   * [getMyMissions description]
   * @param  {Function} fn [description]
   * @return {[type]}      [description]
   */
  Missions.getMyMissions = function (fn){
    debug('Messions::getMyMissions Method Called');
    var ctx = loopback.getCurrentContext();
    var currentUser = ctx.get('currentUser');
    if (!currentUser) return G._error('102','User not defined',{},fn);
    Missions.getUserMissions(currentUser,function (err,missionInstances){
    debug('Messions::getUserMissions(currentUser,function Method Called');
      var availableMissions = missionInstances.filter(filters.isOngoing);
      var returnWhenReady = _.after(availableMissions.length+1, function(){
        G.returnStandardSuccessMsg({
          'available_missions': availableMissions
        },fn);
      });
      _.each(availableMissions, function(missionInstance, key, list){
        Missions.getMissionProgress(missionInstance,currentUser,function (err,missionProgressInstance){          
    debug('Messions::getMissionProgress(missionInstance,currentUser,function Method Called');
          returnWhenReady();
        });
      });
      returnWhenReady();
    });
  };
  // };
  Missions.resolveMissionTrigger = function (trigger,fn){
    debug('Messions::resolveMissionTrigger Method Called');
    var NOW = new Date();
    var ctx = loopback.getCurrentContext();
    var currentUser = ctx.get('currentUser');
    Missions.getMyMissions(function (err,standardResponse){
    debug('Messions::getMyMissions(function Method Called');
      var missionInstances = standardResponse.data['available_missions'];
      var missionResolveResult = {
        giftPoints:0,
        triggeredMissions:[],
        triggeredMissionsIds:[],
        completedMission:[],
        completedMissionIds:[],
        countedMissions:[],
      };
      missionInstances = missionInstances.filter(function (item){return item['mission_trigger'] && item['mission_trigger'].indexOf(trigger)>-1;});
      var returnWhenReady = _.after(missionInstances.length+1,function(){
          Missions.app.models.TaxiGoUsers.addGiftPoints(missionResolveResult.giftPoints,function (err,userInstance){
            fn(err,missionResolveResult);
          });
      });
      _.each(missionInstances, function(missionInstance, key, list){
        var progressInstance = missionInstance.progress;
        var progressUntill = Math.floor(missionInstance['required_count'] - progressInstance['progress_count']);
            switch(true){
              case progressUntill <= 0:
                if(missionInstance['mission_type']==='REPEATING_MISSION'){
                  Missions.app.models['mission_progress'].create({
                    'gift_id': missionInstance['gift_id'],
                    'mission_name': missionInstance['name'],
                    'gift_points': missionInstance['gift_points'],
                    'mission_id': missionInstance.id,
                    'user_id': progressInstance['user_id'],
                    'required_count': missionInstance['required_count'],
                    'progress_count': 1,
                    'last_update': new Date(),
                    'begining_timestamp': new Date(),
                    'completed': missionInstance['required_count']===1
                  },function (err,createdInstance){
                    missionInstance.progress = createdInstance;
                    missionResolveResult.triggeredMissions.push(missionInstance);
                    missionResolveResult.triggeredMissionsIds.push(missionInstance['id']);
                    if(missionInstance['required_count']===1){
                      missionResolveResult.completedMission.push(missionInstance);
                      missionResolveResult.giftPoints += missionInstance['gift_points'];
                      missionResolveResult.completedMissionIds.push(missionInstance['id']);
                      if(missionInstance['rewardId']!==0){
                        Missions.app.models['Gifts'].missionRedeem(missionInstance['rewardId'],function (err,giftRedeemInstance){
                          createdInstance.updateAttributes({'gift_redeem_id': giftRedeemInstance.id});
                        });
                      }
                    }
                    return returnWhenReady();
                  });                  
                } else {
                  returnWhenReady();
                }
                break;
              case progressUntill === 1:
                missionInstance.progress.completed = 1;
                missionInstance.progress['last_update'] = NOW;
                missionResolveResult.triggeredMissions.push(missionInstance);
                missionResolveResult.triggeredMissionsIds.push(missionInstance['id']);
                missionResolveResult.completedMission.push(missionInstance);
                missionResolveResult.giftPoints += missionInstance['gift_points'];
                missionResolveResult.completedMissionIds.push(missionInstance['id']);
                if(missionInstance['rewardId']!==0){
                  Missions.app.models.Gifts.missionRedeem(missionInstance['rewardId'],function (err,giftRedeemInstance){
                    progressInstance.updateAttributes({
                      'progress_count': missionInstance.progress['progress_count'] += 1,
                      'last_update': NOW,
                      'completed': 1,
                      'gift_redeem_id': giftRedeemInstance.id
                    });
                  });
                } else {
                  progressInstance.updateAttributes({
                    'progress_count': missionInstance.progress['progress_count'] += 1,
                    'last_update': NOW,
                    'completed': 1,
                  });
                }
                returnWhenReady();
                break;
              default:
                progressInstance.updateAttributes({
                  'progress_count': missionInstance.progress['progress_count'] += 1,
                  'last_update':NOW
                });
                missionInstance.progress['last_update'] = NOW;
                missionResolveResult.triggeredMissions.push(missionInstance);
                missionResolveResult.triggeredMissionsIds.push(missionInstance['id']);
                returnWhenReady();
            }
      });
      returnWhenReady();
    });
  };
  Missions.emulateMissionTrigger = function (trigger,fn){
    debug('Messions::emulateMissionTrigger Method Called');
    var NOW = new Date();
    var ctx = loopback.getCurrentContext();
    var currentUser = ctx.get('currentUser');
    Missions.getMyMissions(function (err,standardResponse){
    debug('Messions::getMyMissions(function Method Called');
      var missionInstances = standardResponse.data['available_missions'];
      var missionResolveResult = {
        giftPoints:0,
        triggeredMissions:[],
        triggeredMissionsIds:[],
        completedMission:[],
        completedMissionIds:[],
        countedMissions:[],
      };
      missionInstances = missionInstances.filter(function (item){return item['mission_trigger'] && item['mission_trigger'].indexOf(trigger)>-1;});
      var returnWhenReady = _.after(missionInstances.length+1,function(){
          Missions.app.models.TaxiGoUsers.addGiftPoints(missionResolveResult.giftPoints,function (err,userInstance){
    debug('Messions::app.models.TaxiGoUsers.addGiftPoints(missionResolveResult.giftPoints,function Method Called');
            fn(err,missionResolveResult);
          });
      });
      _.each(missionInstances, function(missionInstance, key, list){
        var progressInstance = missionInstance.progress;
        var progressUntill = Math.floor(missionInstance['required_count'] - progressInstance['progress_count']);
            switch(true){
              case progressUntill <= 0:
                if(missionInstance['mission_type']==='REPEATING_MISSION'){
                  switch(true){
                    case missionInstance['required_count'] >1:
                      missionResolveResult.triggeredMissions.push(missionInstance);
                      missionResolveResult.triggeredMissionsIds.push(missionInstance['id']);
                      returnWhenReady();
                    case missionInstance['required_count'] === 1:
                      missionResolveResult.triggeredMissions.push(missionInstance);
                      missionResolveResult.triggeredMissionsIds.push(missionInstance['id']);
                      missionResolveResult.completedMission.push(missionInstance);
                      missionResolveResult.giftPoints += missionInstance['gift_points'];
                      missionResolveResult.completedMissionIds.push(missionInstance['id']);
                      returnWhenReady();
                    break;
                    default:
                      returnWhenReady();
                  }             
                } else {
                  returnWhenReady();
                }
                break;
              case progressUntill === 1:
                missionResolveResult.triggeredMissions.push(missionInstance);
                missionResolveResult.triggeredMissionsIds.push(missionInstance['id']);
                missionResolveResult.completedMission.push(missionInstance);
                missionResolveResult.giftPoints += missionInstance['gift_points'];
                missionResolveResult.completedMissionIds.push(missionInstance['id']);
                returnWhenReady();
                break;
              default:
                missionResolveResult.triggeredMissions.push(missionInstance);
                missionResolveResult.triggeredMissionsIds.push(missionInstance['id']);
                returnWhenReady();
            }
      });
      returnWhenReady();
    });
  };
  Missions.remoteMethod(
    'getMyMissions',
    {
      description: 'Get available missions and progress. Initialize a valid mission-progress if not exist .',
      accepts: [
        // {arg: 'ctx', type: 'object' , http:{source:'context'} },
      ],
      returns:[
        {arg: 'data', type:'standardResponse', description: 'Standard Response Object',root:true},
      ], 
      http: [
//        {verb: 'post', path: '/submit_order.php'},
        {verb: 'get', path: '/myMissions'},
      ]
    }
  );
  Missions.remoteMethod(
    'emulateMissionTrigger',
    {
      description: 'Some description of this remote Method.',
      accepts: [
        {arg: 'trigger', type:'string'}
      ],
      returns: [
        {arg: 'data', type:'standardResponse', description: 'Standard Response Object',root:true},
      ],
      http: {verb: 'post', path: '/emulateMissionTrigger'}
    }
  );
  Missions.remoteMethod(
    'getMyMissionRecords',
    {
      description: 'Get available missions and progress. Initialize a valid mission-progress if not exist .',
      accepts: [
        { arg: 'filter', type: 'object', description: 'Filter defining fields, where, include, order, offset, and limit' },
        // {arg: 'ctx', type: 'object' , http:{source:'context'} },
      ],
      returns:[
        {arg: 'data', type:'standardResponse', description: 'Standard Response Object',root:true},
      ], 
      http: [
//        {verb: 'post', path: '/submit_order.php'},
        {verb: 'post', path: '/myMissionRecords'},
      ]
    }
  );
//   Missions.remoteMethod(
//     'resolveMission',
//     {
//       description: 'Update driver Status.',
//       accepts: [
//         {arg: 'ctx', type: 'object' , http:{source:'context'} },
//         {arg: 'passenger_id', type: 'string', description: 'Passenger id.', required:true},
//         {arg: 'start_reference_code', type: 'string', description: 'Location reference code.', required:true},
//         {arg: 'end_reference_code', type: 'string', description: 'Location reference code.', required:true},
//         {arg: 'memo', type: 'string', description: 'Driver id.', required:false},
//         {arg: 'require_vip', type: 'boolean', description: 'If the order requires a VIP car.', required:false}
//       ],
//       returns:[
//         {arg: 'data', type:'standardResponse', description: 'Standard Response Object',root:true},
//       ], 
//       http: [
// //        {verb: 'post', path: '/submit_order.php'},
//         {verb: 'post', path: '/resolve'},
//       ]
//     }
//   );
};