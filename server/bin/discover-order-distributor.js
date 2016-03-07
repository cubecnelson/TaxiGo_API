var path = require('path');
var app = require(path.resolve(__dirname, '../server'));
var fs = require('fs');
var _ = require('underscore');

var dataSource = app.dataSources['sans_taxigo'];
var dataTableNames = [
'order_pool','logs_order_distributor'
];



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
	var modelConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../model-config.json')));
	// dataSource.discoverAndBuildModels(tableName,{schema: 'sans_taxigo'},function(err, models){
	// 		console.log(app.models);
	// });X
	dataSource.discoverSchema(tableName,{schema: 'sans_taxigo'},function(err,schema){
		if (err) {
			throw err;
		} else{
			var tempModel = schema;
			tempModel.base = 'PersistedModel';
			tempModel.name = tableName;
			tempModel.name = tableName;
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
			var jsonFilePath = path.resolve(__dirname, '../../common/models/order-distributor/'+tableName+'.json');
			fs.writeFileSync(
				jsonFilePath, 
				JSON.stringify(tempModel, null, '  '));
			// ,
			// 	function (err) {
			// 	  if (err) throw err;
			// 	  console.log(tableName,' is saved!');
			// });
			console.log(tableName+' JSON is saved\n');
			var jsFilePath = path.resolve(
						__dirname, '../../common/models/order-distributor/'+tableName+'.js'
					);
			if(!fs.existsSync(jsFilePath)){
				fs.writeFileSync(
					jsFilePath,
					'module.exports = function('+tableName+') {\n\n};');
				console.log(tableName,' JS is written\n');
				// ,
				// 	function (err) {
				// 		if (err) throw err;
				//   		console.log(tableName,' is saved!');
				//   	}
			 //  	);

			}


			// if(!modelConfig[tableName]){
				modelConfig[tableName]={
					dataSource:'sans_taxigo',
					'public':false
				};
				fs.writeFileSync(path.resolve(__dirname, '../model-config.json'), JSON.stringify(modelConfig, null, '  '));
				// console.log("model-config.json is updated");
				// , 
				// function (err) {
				//   if (err) throw err;
				//   console.log('model-config.json is Updated!');
				// });
				if (typeof callback === 'function')callback();
			// }
		}
	});
}
function buildTables(tableNames){
	var tableName = tableNames.shift();
	discoverAndBuild(tableName,function (){
		if (tableNames.length){
			return buildTables(tableNames);
		} else {
			// discoverAndBuild(undefined,function (){
				console.log('Process End');
				process.exit(0);
			// });
		}
	});
}
buildTables(dataTableNames);
// for (var i = dataTableNames.length - 1; i >= 0; i--) {
// 	discoverAndBuild(dataTableNames[i]);
// }
module.exports = {
  app:app
};