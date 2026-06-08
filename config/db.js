const mongoose=require('mongoose')
const connection_string=process.env.CONNECTION_STRING
const seedDatabase = require('../utils/seeder');

mongoose.connect(connection_string).then(async res=>{
    console.log("mongodb connected to the server");
    await seedDatabase();
}).catch(err=>{
    console.log("connection failed");
    console.log(err);
})