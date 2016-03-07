var debug = require('debug')('taxi-go:model');
var _ = require('underscore');
var loopback = require('loopback');
var G = require('./utils/utils.js');
module.exports = function (News) {
  var filters = {};
    filters.isOngoing = function (newsInstance){
      var NOW = new Date();
      if (newsInstance['publish_since'] === null || newsInstance['publish_since']>NOW) {
        return false;
      }
      if (newsInstance['publish_till'] !== null && newsInstance['publish_till']<NOW) {
        return false;
      }
      return true;
    };
    filters.isRealm = function (currentUser){
      if(currentUser){
        return function (newsInstance){
          return newsInstance.realm.indexOf('public') >= 0 || newsInstance.realm.indexOf(currentUser.realm) >= 0;
        };
      }
      return function (newsInstance){
        return newsInstance.realm.indexOf('public') >= 0;
      };
    };
   News.getNewsJSON = function (req,res,fn){
    debug('News::getNes Method Called');
    var NOW = new Date();
    var ctx = loopback.getCurrentContext();
    var currentUser = ctx.get('currentUser');
    News.find({
      where:{
        'publish_since':{
          lt: NOW
        }
      }
    },function (err,newsInstances){
      newsInstances = newsInstances || [];
      var bodies = [];
      var validNews = newsInstances.filter(filters.isOngoing).filter(filters.isRealm(currentUser));
      _.each(validNews, function(newsInstance, key, newsInstances){
        bodies.push(newsInstance['content']);
      });
      // res.send('<news>'+bodies.join('</news><news>')+'</news>');
      return G.returnStandardSuccessMsg({'news_content':'<news>'+bodies.join('</news><news>')+'</news>'},fn);
    });
  };
  News.getNews = function (req,res,fn){
    debug('News::getNes Method Called');
    var NOW = new Date();
    var ctx = loopback.getCurrentContext();
    var currentUser = ctx.get('currentUser');
    News.find({
      where:{
        'publish_since':{
          lt: NOW
        }
      }
    },function (err,newsInstances){
      newsInstances = newsInstances || [];
      // var bodies = [];
      var validNews = newsInstances.filter(filters.isOngoing).filter(filters.isRealm(currentUser));
      // _.each(validNews, function(newsInstance, key, newsInstances){
      //   bodies.push(newsInstance['content']);
      // });
      // res.send('<news>'+bodies.join('</news><news>')+'</news>');
      return G.returnStandardSuccessMsg({'news_items':newsInstances},fn);
    });
  };
  News.getHtml = function (req,res){
    debug('News::getHtml Method Called');
    var NOW = new Date();
    var ctx = loopback.getCurrentContext();
    var currentUser = ctx.get('currentUser');
    News.find({
      where:{
        'publish_since':{
          lt: NOW
        }
      }
    },function (err,newsInstances){
      newsInstances = newsInstances || [];
      var bodies = [];
      var validNews = newsInstances.filter(filters.isOngoing).filter(filters.isRealm(currentUser));
      _.each(validNews, function(newsInstance, key, newsInstances){
        bodies.push(newsInstance['content']);
      });

      var styleText='<html><head><style>body{background:#F1F1F1;padding:10px;}.news{margin:5px 5px;background:white;padding:10px}p img{margin-top:-1em;}</style><title>最新消息</title></head>';
      res.send(styleText+'<body><div class="news">'+bodies.join('</div><div class="news">')+'</div></body></html>');
    });
  };
  News.getHtmlJson = function(req,fn){
    debug('News::getHtml Method Called');

    var NOW = new Date();
    var ctx = loopback.getCurrentContext();
    var currentUser = ctx.get('currentUser');
    News.find({
      where:{
        'publish_since':{
          lt: NOW
        }
      }
    },function (err,newsInstances){
      newsInstances = newsInstances || [];
      var bodies = [];
      var validNews = newsInstances.filter(filters.isOngoing).filter(filters.isRealm(currentUser));
      _.each(validNews, function(newsInstance, key, newsInstances){
        bodies.push(newsInstance['content']);
      });

      var styleText='<html><head><style>body{background:#F1F1F1;padding:5px;}.news{margin:0px 5px 10px;background:white;padding:10px}p img{margin-top:-1em;}</style><title>最新消息</title></head>';
      G.returnStandardSuccessMsg({
        'news_content':styleText+'<body><div class="news">'+bodies.join('</div><div class="news">')+'</div></body></html>'
      },fn);
      // fn(undefined,styleText+'<body><div class="news">'+bodies.join('</div><div class="news">')+'</div></body></html>');
    });

  };
  News.remoteMethod(
    'getNewsJSON',
    {
      description: 'Some description of this remote Method.',
      accepts: [
        {arg: 'req', type:'object', http:{source:'req'}},
        {arg: 'res', type:'object', http:{source:'res'}}
      ],
      returns: {arg: 'data', type: 'object', description: '{\'news_items\':newsInstances}',root:true},
      http: {verb: 'get', path: '/getNewsJSON'}
    }
  );
  News.remoteMethod(
    'getNews',
    {
      description: 'Some description of this remote Method.',
      accepts: [
        {arg: 'req', type:'object', http:{source:'req'}},
        {arg: 'res', type:'object', http:{source:'res'}}
      ],
      returns: {arg: 'data', type: 'standardResponse', description: 'Taxi-GO standard return object.',root:true},
      http: {verb: 'get', path: '/getNews'}
    }
  );
  News.remoteMethod(
    'getHtml',
    {
      description: 'Some description of this remote Method.',
      accepts: [
        {arg: 'req', type:'object', http:{source:'req'}},
        {arg: 'res', type:'object', http:{source:'res'}}
      ],
      returns: {
        arg: 'HTML', type: 'string', root: true,
        description:
          'The HTML text of news.'
      },
      http: {verb: 'get', path: '/HTML'}
    }
  );
  News.remoteMethod(
    'getHtmlJson',
    {
      description: 'Some description of this remote Method.',
      accepts: [
        {arg: 'req', type:'object', http:{source:'req'}}
      ],
      returns: {
        arg: 'HTML', type: 'string', root: true,
        description:
          'The HTML text of news.'
      },
      http: {verb: 'get', path: '/HTMLjson'}
    }
  );
};
