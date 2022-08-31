const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
 name:{
     type:String,
     required:'This fiels is required'
 },
 description:{
     type:String,
     required:'This field is required'
 },
 email:{
    type:String,
    required:'This field is required'
},
ingredients:{
    type:Array,
    required:'This field is required'
},
category:{
    type:String,
    enum: ['Thai','Indian','American','Mexican','Chinese'],
    required:'This field is required'
},
image:{
    type:String,
    required:'This field is required'
},
});

recipeSchema.index({ name:'text',description:'text'});


module.exports = mongoose.model('Recipe',recipeSchema)