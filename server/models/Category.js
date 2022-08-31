const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
 name:{
     type:String,
     required:'This fiels is required'
 },
 image:{
    type:String,
    required:'This fiels is required'
}
});
module.exports = mongoose.model('Category',categorySchema)