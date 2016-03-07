module.exports = function() {
  return function(err, req, res, next) {
    if(err.status===404){
      res.status(404).sendFile(require('path').join(__dirname, '../../error-pages/404.html'));
    } else {
      next();
    }
  };
};
