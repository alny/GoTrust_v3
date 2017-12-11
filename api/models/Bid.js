var mongoose = require('mongoose')
var Schema = mongoose.Schema;


var bidSchema = new mongoose.Schema({
    name: {type: String, default: ''},
    image: {type: String, default: ''},
    bid: {type: String, default: ''},
    bidBy: {type: String, default: ''},
    timestamp: {type: Date, default: Date.now}

});

bidSchema.methods.summary = function(){
  var summary  = {
      name: this.name,
      image: this.image,
      bid: this.message,
      bidBy: this.commentBy,
      timestamp: this.timestamp,
      id: this._id.toString()
  }
  return summary
}

module.exports = mongoose.model('bids', bidSchema)
