/**
 * X-Total-Count
 * @param  {[type]} app [description]
 * @return {[type]}     [description]
 */
module.exports = function (app) {
  function deleteNullProperties(test, recurse) {
    for (var i in test) {
        if (test[i] === null) {
            // delete test[i];
            test[i] = '';
        } else if (recurse && typeof test[i] === 'object') {
            deleteNullProperties(test[i], recurse);
        }
    }
  }
  var remotes = app.remotes();

  // Set X-Total-Count for all search requests
  remotes.after('*.find', function (ctx, next) {
    var filter;
    if (ctx.args && ctx.args.filter) {
      if (typeof ctx.args.filter === 'string') {
        try{
          filter = JSON.parse(ctx.args.filter).where;
        } catch (e){
          filter = {};
        }
      } else if (Array.isArray(ctx.args.filter)){
        filter = {};
      } else if (typeof ctx.args.fiter === 'object'){
        filter = {};
      }
    }

    if (!ctx.res._headerSent) {
      this.count(filter, function (err, count) {
        ctx.res.set('X-Total-Count', count);
        next();
      });
    } else {
      next();
    }
  });

  // remotes.after('**', function (ctx, next) {
  //   // console.log(ctx.result);
  //   // if (typeof ctx.result === 'object'){
  //   //   deleteNullProperties(ctx.result);
  //   // }
  //   next();
  //   // var filter;
  //   // if (ctx.args && ctx.args.filter) {
  //   //   if (typeof ctx.args.filter === 'string') {
  //   //     try{
  //   //       filter = JSON.parse(ctx.args.filter).where;
  //   //     } catch (e){
  //   //       filter = {};
  //   //     }
  //   //   } else if (Array.isArray(ctx.args.filter)){
  //   //     filter = {};
  //   //   } else if (typeof ctx.args.fiter === 'object'){
  //   //     filter = {};
  //   //   }
  //   // }

  //   // if (!ctx.res._headerSent) {
  //   //   this.count(filter, function (err, count) {
  //   //     ctx.res.set('X-Total-Count', count);
  //   //     next();
  //   //   });
  //   // } else {
  //   //   next();
  //   // }
  // });
};