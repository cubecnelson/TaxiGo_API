// var loopback  = require('loopback');
// var path = require('path');
// module.exports = function publicFileContainer(server) {
//   var ds = loopback.createDataSource({
//     'name': 'publicStorage',
//     connector: require('loopback-component-storage'),
//     'provider': 'filesystem',
//     'root': path.join(__dirname, '..', '..', 'client', 'public')
//   });
//   var container = ds.createModel('PublicFiles');
//   // server.dataSource(ds);
//   server.model(container);
//   // loopback.configureModel()
//   // server.model(container,{
//   //   dataSource:ds,
//   //   public:true
//   // });
// };