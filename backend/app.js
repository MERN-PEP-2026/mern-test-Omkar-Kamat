import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({extended:true, limit: "10mb"}));
app.use(cookieParser());

app.get("/health",(req,res)=>{
    res.send({
        status: "ok"
    })
})

export default app;