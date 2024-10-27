//import mongoose 
const mongoose = require('mongoose')

//access connection string of mongodb
const connectionString = process.env.DATABASE

//connect server with the mongodb 
mongoose.connect(connectionString).then((res)=>{console.log('mongodb connected successfully');}).catch((err)=>{console.log(`mongodb connection failed due to :${err}`);})

// lua1Un1AJ4zCb6MO
// meghasaji2002