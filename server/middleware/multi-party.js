var Busboy = require('busboy');
var multer = require('multer');
module.exports = function(req,res,next){
	if(req.method==='POST' && req.headers['content-type'] && req.headers['content-type'].indexOf('ultipart/form-data')){

	}	else {
		next();
	}
}