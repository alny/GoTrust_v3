var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    name: {type: String, default: ''},
    image: {type: String, default: ''},
    steamId: {type: String, unique: true},
    steamName: {type: String, lowercase: true, trim: true, default: ''},
    steamConnect: {type: Boolean, default: false},
    isActive: {type: Boolean, default: false},
    isMM: {type: Boolean, default: false},
    loginId: {type: String, default: ''},
    facebookId: {type: String, default: ''},
    facebookName: {type: String, lowercase: true, trim: true, default: ''},
    tradeurl: {type: String, default: ''},
    rep: {type:Number, default: 0},
    deposit: {type:Number, default: 0},
    trades: {type:Number, default: 0},
    topTrade: {type:Number, default: 0},
    total: {type:Number, default: 0},
    ratedBy: {type:Array, default:[]},
    comments: [{type: Schema.Types.ObjectId, ref: 'commentSchema'}],
    myTrades: [{type: Schema.Types.ObjectId, ref: 'tradeSchema'}],
    level: {type:Number, default: 0},
    commentDate: {type: Number, default: ''},
    tradeDate: {type: Number, default: ''},
    status: {type: String, default: 'unverified'},
    role: {type: String, lowercase: true, trim: true, default: 'basic'},
    timestamp: {type: Date, default: Date.now}

});

UserSchema.methods.summary = function(){
  var summary  = {
      name: this.name,
      image: this.image,
      steamId: this.steamId,
      steamName: this.steamName,
      steamConnect: this.steamConnect,
      isActive: this.isActive,
      isMM: this.isMM,
      loginId: this.loginId,
      facebookId: this.facebookId,
      facebookName: this.facebookName,
      tradeurl: this.tradeurl,
      rep: this.rep,
      deposit: this.deposit,
      trades: this.trades,
      topTrade: this.topTrade,
      ratedBy: this.ratedBy,
      comments: this.comments,
      myTrades: this.myTrades,
      total: this.total,
      level: this.level,
      commentDate: this.commentDate,
      tradeDate: this.tradeDate,
      status: this.status,
      role: this.role,
      timestamp: this.timestamp,
      id: this._id.toString()
  }
  return summary
}

module.exports = mongoose.model('users', UserSchema)
