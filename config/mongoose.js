const mongoose = require('mongoose');

// connecting to database

mongoose.connect(process.env.mongoUrl);

const db =  mongoose.connection;
// Checking Error
db.on('error',console.error.bind(console,'Connection  Error while connection to db'));

db.once('open',()=>{
    console.log('Connection to db is successful');
})