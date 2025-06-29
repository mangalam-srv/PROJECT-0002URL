const mongoose = require('mongoose');

async function connecttomongodb(){
    try{
        const connectioninstance= await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.MONGODB_NAME}`)
        console.log(`mongodb connected /n dbhost = ${connectioninstance.connection.host}`)

    }catch(err){
        console.log("error in connection");
    }
}

module.exports = {
    connecttomongodb,

}