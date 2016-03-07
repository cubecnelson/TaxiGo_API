var fs = require('fs');
var assert = require('assert');
var rq = require('request-promise');
var promise = require('bluebird');
var utils = require(__dirname+'/utils/utils.js');
/* globals describe,it */
// var API_BASE = 'http://www.sans.hk/beta/taxigo/api/';

// var API_BASE = 'http://taxigo/api/';
var API_BASE = 'http://localhost:3000/api/';
// rq("http://www.google.com").then(function(response,contents){
//           console.log(contents);
//       })
var tempStorage = {};

describe('TaxiGo Tests @'+API_BASE, function () {
  var tel = (Math.random().toString(10)+'00000000').substr(2,8);
  var promiseChain;
  var ApiTokenHolder = new utils.ApiSecretToken();
  describe('TaxiGo new passenger registration test.',function(){

    it('@member/genVerificationCode.php Generate verification code for new user.',function (done){
      var requestSettings = {
        uri: API_BASE+'member/genVerificationCode.php',
        method: 'POST',
        resolveWithFullResponse: true,
        // json: true,
        form:{
          'api_send_time': ApiTokenHolder['api_send_time'],
          'api_token': ApiTokenHolder['api_token'],
          'country_code': '000',
          tel: tel
        }
      };
      promiseChain = rq(requestSettings).then(function (response){
          var returnedObject = JSON.parse(response.body);
          assert.equal(1,returnedObject.code,'Response code=1 Success');
          // assert.equal(1,contents.code);
          // console.dir(contents);
          done();
      });

    });
    // describe('Should be able to get user_token by verifying', function () {
      it('@member/verifyVerificationCode.php Verify verification code and get user token.',function (done){
        var requestSettings = {
          uri: API_BASE+'member/verifyVerificationCode.php',
          method: 'POST',
          resolveWithFullResponse: true,
          // json: true,
          form:{
            'api_send_time': ApiTokenHolder['api_send_time'],
            'api_token': ApiTokenHolder['api_token'],
            'country_code': '000',
            tel: tel,
            verification: '8888'
          }
        };
        if(promiseChain.then){
          promiseChain = promiseChain.then(function (){
            rq(requestSettings).then(function (response){
                var returnedObject = JSON.parse(response.body);
                // console.log(returnedObject);
                tempStorage['user_id'] = returnedObject.data['id'];
                tempStorage['user_token'] = returnedObject.data['user_token'];
                assert.equal(true,!!returnedObject.data['user_token'],'Should return a user_token.');
                // assert.equal(1,contents.code);
                // console.dir(contents);
                done();
            });
          });
        }
      });
      
    // });


    it('@member/setInfo.php Should able to set user name.', function (done){
      var tempDeviceId = (Math.random().toString(10)+'00000000').substr(2,8);
      tempStorage['tempDeviceId'] = tempDeviceId;
      if(promiseChain.then){
        promiseChain = promiseChain.then(function (){
          var requestSettings = {
            uri: API_BASE+'member/setInfo.php',
            method: 'POST',
            resolveWithFullResponse: true,
            // json: true,
            form:{
              'api_send_time': ApiTokenHolder['api_send_time'],
              'api_token': ApiTokenHolder['api_token'],

              'id': tempStorage['user_id'],
              'user_token': tempStorage['user_token'],
              'device_id': tempDeviceId,
              'given_name': '試者',
              'family_name': '測'
            }
          };
          rq(requestSettings).then(function (response){
              // console.log(response.body);
              var returnedObject = JSON.parse(response.body);
              // console.log(returnedObject);
              // console.log(returnedObject);
              // tempStorage['user_token'] = returnedObject.data['user_token'];
              // assert.equal(true,!!returnedObject.data['user_token'],'Should return a user_token.');
              assert.equal('測',returnedObject.data['passenger_data']['family_name']);
              assert.equal('試者',returnedObject.data['passenger_data']['given_name']);
              assert.equal(1,returnedObject.data['passenger_data']['status']);
              assert.equal(tempDeviceId,returnedObject.data['passenger_data']['device_id']);
              done();
          });
        });
      }
    });
  
    it('@member/getStatus.php Should able to login via id & user_token.', function (done){
      var tempDeviceId = (Math.random().toString(10)+'00000000').substr(2,8);
      if(promiseChain.then){
        promiseChain = promiseChain.then(function (){
          var requestSettings = {
            uri: API_BASE+'member/getStatus.php',
            method: 'POST',
            resolveWithFullResponse: true,
            // json: true,
            form:{              
              'api_send_time': ApiTokenHolder['api_send_time'],
              'api_token': ApiTokenHolder['api_token'],

              'id': tempStorage['user_id'],
              'user_token': tempStorage['user_token']
            }
          };
          return rq(requestSettings).then(function (response){
              // console.log(response.body);
              var returnedObject = JSON.parse(response.body);
              // console.log(returnedObject);
              // console.log(returnedObject);
              // tempStorage['user_token'] = returnedObject.data['user_token'];
              // assert.equal(true,!!returnedObject.data['user_token'],'Should return a user_token.');
              assert.equal('測',returnedObject.data['passenger_data']['family_name']);
              assert.equal('試者',returnedObject.data['passenger_data']['given_name']);
              fs.writeFileSync(__dirname+'/testUser.json', JSON.stringify(tempStorage, null, '  '),'utf8');
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