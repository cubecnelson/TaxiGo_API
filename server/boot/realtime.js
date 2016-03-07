// var es = require('event-stream');
// module.exports = function(app) {
//   console.log('Realtime.js');
//   function setChangeStreamSupport(modelName){
//     var MyModel = app.models[modelName];
//     MyModel.createChangeStream(function(err, changes) {
//       changes.pipe(es.stringify()).pipe(process.stdout);
//     });
//   }
//   var changeStreamModels = ['DB_view_order','DB_driver'];
//   for (var i = changeStreamModels.length - 1; i >= 0; i--) {
//     setChangeStreamSupport(changeStreamModels[i]);
//   };
//   // changeStreamModels.map(setChangeStreamSupport);
//   // MyModel.create({foo: 'bar'});
// }