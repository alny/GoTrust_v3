var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var SkinSchema = new mongoose.Schema({
    app_id: {type: String, default: ''},
    context_id: {type: String, default: ''},
    market_hash_name: {type: String, default: ''},
    price: {type: String, default: ''},
    pricing_mode: {type: String, default: ''},
    skewness: {type: String, default: ''},
    created_at: {type: String, default: ''},
    icon_url: {type: String, default: ''},
    name_color: {type: String, default: ''},
    quality_color: {type: String, default: ''},
    rarity_color: {type: String, default: ''}
});

module.exports = mongoose.model('skins', SkinSchema)
