import mongoose from "mongoose";
import {hashPassword} from "../utils/password"

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true,
        minLength: 8,
        select: false
    },
    role:{
        type: String,
        role: ["STUDENT","INSTRUCTOR"]
    }
},{
    timestamps: true
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = hashPassword(this.password);
})

export default mongoose.model("User",userSchema);