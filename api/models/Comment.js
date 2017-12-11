var mongoose = require('mongoose')
var Schema = mongoose.Schema;


var CommentSchema = new mongoose.Schema({
    name: {type: String, default: ''},
    image: {type: String, default: ''},
    message: {type: String, default: ''},
    commentBy: {type: String, default: ''},
    timestamp: {type: Date, default: Date.now}

});

CommentSchema.methods.summary = function(){
  var summary  = {
      name: this.name,
      image: this.image,
      message: this.message,
      commentBy: this.commentBy,
      timestamp: this.timestamp,
      id: this._id.toString()
  }
  return summary
}

module.exports = mongoose.model('commentSchema', CommentSchema)
