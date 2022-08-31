const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL ,{useUnifiedTopology:true})

const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection failed :'));
db.once('open',function(){
    console.log('connected !!')
})
//Models

require('./Category');
require('./Recipe');