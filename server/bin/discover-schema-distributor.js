var path = require('path');
var app = require(path.resolve(__dirname, '../server'));
var fs = require('fs');

var dataSource = app.dataSources['sans_taxigo'];
var dataTableNames = [
'order_pool'
];
var modelConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../model-config.json')));


// dataSource.discoverSchema('passenger_order', {schema: 'sans_taxigo'},
//     function(err, schema) {
//   if (err) throw err;

//   console.log(JSON.stringify(schema, null, '  '));

//   dataSource.disconnect();
// });
function deleteNullProperties(test, recurse) {
    for (var i in test) {
        if (test[i] === null) {
            delete test[i];
        } else if (recurse && typeof test[i] === 'object') {
            deleteNullProperties(test[i], recurse);
        }
    }
}
function discoverAndBuild(tableName,callback){
	// dataSource.discoverAndBuildModels(tableName,{schema: 'sans_taxigo'},function(err, models){
	// 		console.log(app.models);
	// });X
	dataSource.discoverSchema(tableName,{schema: 'sans_taxigo'},function(err,schema){
		if (err) {
			throw err;
		} else{
			var tempModel = schema;
			tempModel.base = 'PersistedModel';
			tempModel.name = 'DB_'+tableName;
			tempModel.name = 'DB_'+tableName;
			// Remove null properties to avoid swagger crash.
			deleteNullProperties(tempModel,true);
			// Keep the mysql table name
			var tempProperties = {};
			var _propertiesList = Object.keys(tempModel.properties);
			// Properties Overriding functions:
			(function keepMysqlNames(){
				var propertyKey = _propertiesList.shift();
				if(propertyKey !== undefined){
					tempProperties[tempModel.properties[propertyKey].mysql.columnName]=tempModel['properties'][propertyKey];
					tempProperties[tempModel.properties[propertyKey].mysql.columnName]['required'] = false;
					return keepMysqlNames();
				}else{
					tempModel.properties = tempProperties;
				}
			})();


			// Write JSON Config!!
			fs.writeFile(path.resolve(__dirname, '../../common/models/mysqlModel/'+tableName+'.json'), JSON.stringify(tempModel, null, '  '),
			function (err) {
			  if (err) throw err;
			  console.log(tableName,' is saved!');
			});
			if(!fs.existsSync('../../common/models/'+tableName+'.json')){
				fs.writeFile(
					path.resolve(
						__dirname, '../../common/models/mysqlModel/'+tableName+'.js'
					),
					'module.exports = function(DB_'+tableName+') {\n\n};',
					function (err) {
						if (err) throw err;
				  		console.log(tableName,' is saved!');
				  	}
			  	);

			}


			// if(!modelConfig[tableName]){
				modelConfig['DB_'+tableName]={
					dataSource:'sans_taxigo',
					'public':false
				};
				fs.writeFile(path.resolve(__dirname, '../model-config.json'), JSON.stringify(modelConfig, null, '  '), 
				function (err) {
				  if (err) throw err;
				  console.log('model-config.json is Updated!');
				});
				if (typeof callback === 'function')callback();
			// }
		}
	});
}
for (var i = dataTableNames.length - 1; i >= 0; i--) {
	discoverAndBuild(dataTableNames[i]);
}
module.exports = {
  app:app
};