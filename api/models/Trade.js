var mongoose = require('mongoose')
var Schema = mongoose.Schema;


var TradeSchema = new mongoose.Schema({
    name: {type: String, default: ''},
    image: {type: String, default: ''},
    price: {type: Number, default: 0},
    topBid: {type: Number, default: 0},
    bids: [{type: Schema.Types.ObjectId, ref: 'bids'}],
    tradeBy: [{type: Schema.Types.ObjectId, ref: 'users'}],
    timestamp: {type: Date, default: Date.now}

});

TradeSchema.methods.summary = function(){
  var summary  = {
      name: this.name,
      image: this.image,
      price: this.price,
      bids: this.bids,
      tradeBy: this.tradeBy,
      timestamp: this.timestamp,
      id: this._id.toString()
  }
  return summary
}

module.exports = mongoose.model('tradeSchema', TradeSchema)
