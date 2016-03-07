# Sans TaxiGO API



### Setup Procedure
1. Clone this repo.
2. Run `npm install` in terminal to install dependencies.
3. Import demo data into database DemoData.sql
4. Configure MySQL database and server/datasources.json (template: [datasource.tpl.json](src/master/server/datasources.tpl.json)
5. Run `node .` to start the server.



### Known Issues:
#### SQL Server compatibility issue:
The database is know to be incompatible with Oracle MySQL 5.6 & 5.7!
Tested on MySQL 5.5 & MariaDB 10.1.

#### Framework misbehaviour:
The 'like', 'nlike', 'regexp' statements in filter query doesn't work.
Submitted Fix & [pull request](https://github.com/strongloop/loopback-datasource-juggler/pull/747) to loopback-datasource-juggler 