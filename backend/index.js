import app from './app';
import mongoose from 'mongoose';
import config from './config/index';

(async()=>{
    try{
        await mongoose.connect(config.MONGO_URL);
        console.log("connected to mongodb");
        
        app.on('error', err=>{
            console.log("ERROR:", err)
        })

        app.listen(config.PORT, ()=>{
            console.log(`listening to port ${config.PORT}`);
        })
    }catch(err){
        console.log("ERROR connected mongodb");
        throw err
    }
})()
