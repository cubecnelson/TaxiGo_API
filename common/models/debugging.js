var debug = require('debug')('taxi-go:model');
module.exports = function(Debugging) {
  Debugging.dangerExec = function (func,fn){
    debug('Debugging::dangerExec Method Called');
    var fun = new Function(func);
    return fn(null,fun());
  };
  Debugging.safeExec = function (func,fn){
    debug('Debugging::safeExec Method Called');
    var fun = new Function(func);
    var result;
    try{
      result = fun();
    }catch(e){
      return fn(e);
    }
    return fn(undefined,result);
  };
  Debugging.genUncaughtExpection = function (func,fn){
    debug('Debugging::safeExec Method Called');
    setTimeout(function (){
      Debugging.app.m();

    },100);
    return fn(undefined,func());
  };
  Debugging.remoteMethod(
    'dangerExec',
    {
      description: 'For debugging',
      accepts: [
        {arg: 'func', type: 'string' },
      ],
      returns:[
        {arg: 'data', type: 'standardResponse', description: 'Taxi-GO standard return object.',root:true},
      ],
      http: [
//        {verb: 'post', path: '/setInfo.php'},
        {verb: 'post', path: '/dangerExec'},
      ],
      notes: [
       'For update passenger\'s infomation from client side.'
      ] 
    }
  );
  Debugging.remoteMethod(
    'genUncaughtExpection',
    {
      description: 'For debugging',
      accepts: [
        {arg: 'func', type: 'string' },
      ],
      returns:[
        {arg: 'data', type: 'standardResponse', description: 'Taxi-GO standard return object.',root:true},
      ],
      http: [
//        {verb: 'post', path: '/setInfo.php'},
        {verb: 'post', path: '/genUncaughtExpection'},
      ],
      notes: [
       'For update passenger\'s infomation from client side.'
      ] 
    }
  );
  Debugging.remoteMethod(
    'safeExec',
    {
      description: 'For debugging',
      accepts: [
        {arg: 'func', type: 'string' },
      ],
      returns:[
        {arg: 'data', type: 'standardResponse', description: 'Taxi-GO standard return object.',root:true},
      ],
      http: [
//        {verb: 'post', path: '/setInfo.php'},
        {verb: 'post', path: '/safeExec'},
      ],
      notes: [
       'For update passenger\'s infomation from client side.'
      ] 
    }
  );
};
