const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const User = mongoose.model('users');
const Comment = mongoose.model('commentSchema');
const Skin = mongoose.model('skins');
const Trade = mongoose.model('tradeSchema');
const Bid = mongoose.model('bids');


const async = require('async');
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

// API KEY c6cf8fd3-ca0e-4b97-a8e2-fde27c064f4b

const InventoryApi = require('steam-inventory-api');
const inventoryApi = Object.create(InventoryApi);
inventoryApi.init({
  id: 'Name of inventoryApi instance',
  // Proxy ip array
  proxy: [

  ],
  // Repeats for each proxy during rotation (default 1)
  proxyRepeat: 1,
  // Max proxy requests per specified interval (default 25)
  maxUse: 25,
  // Reset requests interval (default 1 min)
  requestInterval: 60 * 1000,
});


module.exports = app => {


  app.post('/user/post/trade', requireLogin, async (req, res, next) => {
      console.log(req.body)
      const { skinName, skinImage, currentUser, skinPrice} = req.body
      var currentTime = new Date()
      var currentHours = currentTime / 1000
      var plusHour = currentTime.setHours(currentTime.getHours() + 1)
      const trade = new Trade({
        name: skinName,
        image: skinImage,
        price: skinPrice,
        tradeBy: currentUser
      })
      async.waterfall([
        function(callback){
          Trade.create(trade, function(err, trade){
            if(err) return next(err)
            callback(err, trade)
          })
        },
        function(trade, callback){
          User.findOne({_id: currentUser }, function(err, foundUser){
            foundUser.myTrades.push(trade._id);
            foundUser.tradeDate = plusHour
            foundUser.save(function(err){
              if(err) return next(err);
            })
            res.json({
              confirmation: 'success'
            })
          })

        }
      ])
  })


  app.get('/user/get/trades', function(req, res, next){
    Trade.find({})
    .populate({path: 'tradeBy', options: { sort: { 'timestamp': -1 } } })
    .populate({path: 'bids', options: { sort: { 'timestamp': -1 } } })
    .exec(function(err, result) {
      if(err){
        res.json({
          confirmation: 'fail',
          result: null
        })
        return
      }
      res.json({
        confirmation: 'success',
        result: result
      })
    })
  })


  app.get('/update/items', requireLogin, function(req, res, next){

    const obj = JSON.parse(fs.readFileSync('../items.json', 'utf8'));
    const objects = obj.prices

      MongoClient.connect(process.env.MONGO_URL, function(err, db) {
          // Get the collection
            var col = db.collection('skins');
            var batch = col.initializeOrderedBulkOp();

            objects.forEach((object) => {

              batch.insert({
                  app_id: object.app_id,
                  context_id: object.context_id,
                  market_hash_name: object.market_hash_name,
                  price: object.price,
                  pricing_mode: object.pricing_mode,
                  skewness: object.skewness,
                  created_at: object.created_at,
                  icon_url: object.icon_url,
                  name_color: object.name_color,
                  quality_color: object.quality_color,
                  rarity_color: object.rarity_color
              }, {upsert:true})

          })

            // Execute the operations
            batch.execute(function(err, result) {
              console.dir(err);
              console.dir(result);
              db.close();
            });
        });

        res.json({
          result: 'success'
        })

  })






  app.get('/user/inventory/:id', requireLogin, function(req, res, next) {
    console.log(req.params.id)

    const contextid = 2;
    const steamid = req.params.id;
    const appid = 730;

    inventoryApi.get({
      appid,
      contextid,
      steamid,
      tradable: true,
    })
    .then((response) => {
      console.log(`Retrieved inventory 1\n${response.total} total items`);
      const name = response.items.map(item => item.market_hash_name)

      Skin.find({market_hash_name: name})
      .sort({'price': -1})
      .where('price').gt(1)
      .limit(20)
      .exec(function(err, result) {
        if(err){
          res.json({
            confirmation: 'fail',
            result: null
          })
          return
        }
        res.json({
          confirmation: 'success',
          result: result
        })
      })

      // console.log(`Item market names:\n${JSON.stringify(response.items.map(item => item.market_hash_name), null, 4)}`);
      console.log(`${inventoryApi.recentRequests} recent requests have been made`);
    })
    .catch((err) => {
      console.log('Woah! Something went wrong', err);
    });



  })

  app.get('/user/comments', function(req, res, next) {
    Comment.find({})
    .limit(5)
    .exec(function(err, result) {
      if(err){
        res.json({
          confirmation: 'fail',
          result: null
        })
        return
      }
      res.json({
        confirmation: 'success',
        result: result
      })
    })
  })

app.post('/user/comment', requireLogin,  async (req, res, next) => {
    console.log(req.body.message.comment);
    const { name, image, commentBy, currentProfile} = req.body
    var currentTime = new Date()
    var currentHours = currentTime / 1000
    var plusHour = currentTime.setHours(currentTime.getHours() + 1)
    const comment = new Comment({
      name,
      message: req.body.message.comment,
      image,
      commentBy
    })
    async.waterfall([
      function(callback){
        Comment.create(comment, function(err, comment){
          if(err) return next(err)
          callback(err, comment)
        })
      },
      function(comment, callback){
        User.findOne({_id: currentProfile }, function(err, foundUser){
          foundUser.comments.push(comment._id);
          foundUser.commentDate = plusHour
          foundUser.save(function(err){
            if(err) return next(err);
          })
          res.json({
            confirmation: 'success'
          })
        })

      }
    ])
  })


  app.post('/user/post/bid',  async (req, res, next) => {
      console.log(req.body);
      const { name, image, bidBy, bid, tradeId} = req.body
      var currentTime = new Date()
      var currentHours = currentTime / 1000
      var plusHour = currentTime.setHours(currentTime.getHours() + 1)
      const newBid = new Bid({
        name,
        bid,
        image,
        bidBy
      })
      async.waterfall([
        function(callback){
          Bid.create(newBid, function(err, bid){
            if(err) return next(err)
            callback(err, bid)
          })
        },
        function(bid, callback){
          Trade.findOne({_id: tradeId }, function(err, foundTrade){
            foundTrade.bids.push(bid._id);
            foundTrade.topBid = bid.bid;
            foundTrade.save(function(err){
              if(err) return next(err);
            })
            res.json({
              confirmation: 'success'
            })
          })

        }
      ])
    })

  app.put('/user/tradeurl', requireLogin, function(req, res, next){
    // console.log(req.body.url.tradeurl)
      User.findOne({_id: req.body.currentUser}, function(err, user){
        if(req.body.currentUser != user._id){
          console.log('ALREADY VOTED')
          res.json({
            message: 'Ikke din bruger',
            result: null
          });
          return
        }
        user.tradeurl = req.body.url.tradeurl
        user.save(function(err) {
        });
     })
  })


  app.put('/rep/plus', requireLogin, function(req, res, next){
      User.findOne({_id: req.body.user}, function(err, user){
        if(user.ratedBy.indexOf(req.body.currentUser) > -1){
          console.log('ALREADY VOTED')
          res.json({
            message: 'Du har allerede rated denne bruger',
            result: null
          });
          return
        }
        user.rep++;
        user.ratedBy.push(req.body.currentUser)
        user.save(function(err) {
        });
        res.json({
          message: 'Du har givet denne bruger 1 Rep',
          result: 1
        });
      })
  })

  app.put('/rep/minus', requireLogin, function(req, res, next){
      User.findOne({_id: req.body.user}, function(err, user){
        if(user.ratedBy.indexOf(req.body.currentUser) > -1){
          console.log('ALREADY VOTED')
          res.json({
            message: 'Du har allerede rated denne bruger',
            result: null
          });
          return
        }
        user.rep--;
        user.ratedBy.push(req.body.currentUser)
        user.save(function(err) {
        });
        res.json({
          message: 'Du har givet denne bruger -1 Rep',
          result: 1
        });
      })
  })


app.get('/user/active', function(req, res, next) {
  User.find({})
  .limit(5)
  .where({isActive: true })
  .sort({'timestamp' : -1})
  .exec(function(err, result) {
    if(err){
      res.json({
        confirmation: 'fail',
        result: null
      })
      return
    }
    res.json({
      confirmation: 'success',
      result: result
    })
  })
})

app.get('/user/middlemen', function(req, res, next) {
  User.find()
  .where({isActive: true })
  .where({isMM: true })
  .exec(function(err, result) {
    if(err){
      res.json({
        confirmation: 'fail',
        result: null
      })
      return
    }
    res.json({
      confirmation: 'success',
      result: result
    })
  })
})

app.get('/user/top', function(req, res, next) {
  User.find({})
  .where({isActive: true })
  .sort({'rep' : -1})
  .limit(20)
  .exec(function(err, result) {
    if(err){
      res.json({
        confirmation: 'fail',
        result: null
      })
      return
    }
    res.json({
      confirmation: 'success',
      result: result
    })
  })
})

app.get('/profile/:id', function(req, res, next) {
  var id = req.params.id
  User.findOne({_id: id}, {comments: { $slice: 5 }})
  .populate({path: 'comments', options: { sort: { 'timestamp': -1 } } })
  .exec(function(err, result) {
    if(err){
      res.json({
        confirmation: 'fail',
        result: null
      })
      return
    }
    res.json({
      confirmation: 'success',
      result: result
    })
  })
})


app.get('/checkSteam/:uId', function(req, res, next) {
  var uId = req.params.uId;
  if(!isNaN(uId)){
    console.log("NUMBER")
    User.findOne({"steamId" : {$regex : uId}})
      .exec(function(err, result) {
        if(err){
          res.json({
            confirmation: 'fail',
            result: null
          })
          return
        }
        res.json({
          confirmation: 'success',
          result: result
        })
      });
  } else {
    console.log("STRING")

    User.findOne({"steamName" : {$regex : uId}})
      .exec(function(err, result) {
        if(err){
          res.json({
            confirmation: 'fail',
            result: null
          })
          return
        }
        res.json({
          confirmation: 'success',
          result: result
        })
      });
  }
})

app.get('/checkFacebook/:uId', function(req, res, next) {
  var uId = req.params.uId;
  console.log(uId)
  if(!isNaN(uId)){
    console.log("NUMBER")
    User.findOne({"facebookId" : {$regex : uId}})
      .exec(function(err, result) {
        if(err){
          res.json({
            confirmation: 'fail',
            result: null
          })
          return
        }
        res.json({
          confirmation: 'success',
          result: result
        })
      });
  } else {
    console.log("STRING")

    User.findOne({"facebookName" : {$regex : uId}})
      .exec(function(err, result) {
        if(err){
          res.json({
            confirmation: 'fail',
            result: null
          })
          return
        }
        res.json({
          confirmation: 'success',
          result: result
        })
      });
  }

})



};
