var loopback = require('loopback');
var _ = require('underscore');
var debug = require('debug')('taxi-go:model');
module.exports = function(TaxiGoUsers) {
  TaxiGoUsers.addGiftPoints = function (point,callback){
    debug('TaxiGoUsers::addGiftPoints Method Called');
    if (typeof point !== 'number') return callback(new TypeError('point should be number'));
    var ctx = loopback.getCurrentContext();
    var currentUser = ctx.get('currentUser');

    point = Math.abs(Math.floor(point));
    // currentUser.reload(function (err,userInstance){
    function updateUserPoints(){
      TaxiGoUsers.findById(currentUser.id,function (err,userInstance){
        var currentGiftPoints = userInstance['gift_points'];
        TaxiGoUsers.updateAll({
         'id': currentUser.id,
         'gift_points': currentGiftPoints,
        },{
          'gift_points': userInstance['gift_points'] += point
        }, function (err,updateResult){
          if (updateResult.count){
            callback (err,userInstance);
          } else {
            updateUserPoints.call();
          }
        });
      });
    }
    updateUserPoints();
  };
  TaxiGoUsers.consumeGiftPoints = function (point,callback){
    debug('TaxiGoUsers::consumeGiftPoints Method Called');
    if (typeof point !== 'number') return callback(new TypeError('point should be number'));
    var ctx = loopback.getCurrentContext();
    var currentUser = ctx.get('currentUser');

    point = Math.abs(Math.floor(point));
    function updateUserPoints(){
      TaxiGoUsers.findById(currentUser.id,function (err,userInstance){
        var currentGiftPoints = userInstance['gift_points'];
        if (currentGiftPoints < point){
          return callback('NOT_ENOUGH_POINTS',userInstance);
        }
        TaxiGoUsers.updateAll({
         'id': currentUser.id,
         'gift_points': currentGiftPoints,
        },{
          'gift_points': userInstance['gift_points'] -= point
        }, function (err,updateResult){
          if (updateResult.count){
            callback (err,userInstance);
          } else {
            updateUserPoints.call();
          }
        });
      });
    }
    updateUserPoints();
  };
};
