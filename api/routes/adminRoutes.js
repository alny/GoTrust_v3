const mongoose = require('mongoose');
const async = require('async');
const User = mongoose.model('users');


module.exports = app => {


app.get('/admin/dashboard', function(req, res, next){

  var userID = req.session.passport.user
  async.parallel([
       function(callback){
         User.findOne({_id: userID})
         .exec(function(err, user){
           callback(err, user)
         });
       },
       function(callback){
         User.find({})
         .sort({'timestamp' : -1})
         .limit(20)
         .exec(function(err, users){
           callback(err, users)
         });
       },

     ],
     function(err, results){
        if(err) next(err)
        var user = results[0]
        var users = results[1]
        res.render('admin/dashboard', {user: user, users: users})
     });
});

app.post('/admin/accept/:id', function (req, res, next){
  var id = req.params.id
  console.log(id)
  User.findOne({_id: id}, function(err, user){
    if(err) return next(err)
    console.log(user);
    if(req.body.role) user.role = req.body.role;
    if(req.body.status) user.status = req.body.status;
    if(req.body.image) user.image = req.body.image;
    if(req.body.steamId) user.steamId = req.body.steamId;
    if(req.body.steamName) user.steamName = req.body.steamName;
    if(req.body.facebookId) user.facebookId = req.body.facebookId;
    if(req.body.facebookName) user.facebookName = req.body.facebookName;
    if(req.body.deposit) user.deposit = req.body.deposit;
    if(req.body.rep) user.rep = req.body.rep;
    if(req.body.isActive) user.isActive = req.body.isActive;
    if(req.body.isMM) user.isMM = req.body.isMM;



    user.save(function(err){
      if(err) return next(err)
      res.redirect('/admin/dashboard')
      });
  });
});



  app.get('/delete', function(req, res, next){
    res.render('admin/delete')
  });



};

function isLoggedIn(req, res, next){
  if(req.session.token){
    return next();
  }
  res.redirect('/');
}

function notLoggedIn(req, res, next){
  if(!req.session.token){
    return next();
  }
  res.redirect('/');
}
