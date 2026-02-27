import "dotenv/config"
import app from "./app.js"
import {connectDB} from "./config/db.config.js"

const PORT = process.env.PORT || 5000;

const startServer = async () =>{
    try{
        await connectDB();
        app.listen(PORT, ()=>{
        console.log(`Server Listening on PORT ${PORT}`);
        })
    }catch(err){
        console.log(err.message);
    }
}

startServer();