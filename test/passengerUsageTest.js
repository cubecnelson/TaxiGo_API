
var assert = require('assert');
var rq = require('request-promise');
var promise = require('bluebird');
var fs = require('fs');
/* globals describe,it */
var API_BASE = 'http://www.sans.hk/beta/taxigo/api/';
var utils = require(__dirname+'/utils/utils.js');
// var API_BASE = 'http://taxigo/api/';
// var API_BASE = 'http://localhost:3000/api/';
// rq("http://www.google.com").then(function(response,contents){
//           console.log(contents);
//       })
var ApiTokenHolder = new utils.ApiSecretToken();

var tempStorage = JSON.parse(fs.readFileSync(__dirname+'/testUser.jsoJSON.parse(n'));

describe('TaxiGo passenger function test.',function(){
  describe('When updating passenger location @update_current_loc', function () {
    var ReturnedData = {};
    var locX = 22+Math.random();
    var locY = 114+Math.random();
    var promiseChain = new promise(function(resolve,reject){
      resolve(1);
    });

    it('It should response with a JSON ',function(done){
      if(promiseChain.then){
        promiseChain = promiseChain.then(function (){
          var requestSettings = {
            uri: API_BASE+'update_current_loc.php',
            method: 'POST',
            resolveWithFullResponse: true,
            // json: true,
            form:{
              'api_send_time': ApiTokenHolder['api_send_time'],
              'api_token': ApiTokenHolder['api_token'],

              'id': tempStorage['user_id'],
              'user_token': tempStorage['user_token'],
              'loc_x': locX,
              'loc_y': locY
            }
          };
          rq(requestSettings).then(function (response){
              // console.log(response.body);
              assert.doesNotThrow(
                function(){
                  ReturnedData = JSON.parse(response.body);
                },'Should be able to parse responsed JSON');
              // console.log(returnedObject);
              // console.log(returnedObject);
              // tempStorage['user_token'] = returnedObject.data['user_token'];
              // assert.equal(true,!!returnedObject.data['user_token'],'Should return a user_token.');
              // assert.equal('測',returnedObject.data['passenger_data']['family_name']);
              // assert.equal('試者',returnedObject.data['passenger_data']['given_name']);
              done();
          },function(err){
            console.log(err);
            done();
          });
        });
      }
    });
    
  });

});
// var apiBase = 'http://www.sans.hk/beta/taxigo/api/';
// rq.post(apiBase+'member/genVerificationCode.php').then(function(contents){
//   console.log(contents);
// });