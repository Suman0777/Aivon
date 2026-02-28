import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv();

mongoose.connect(process.env.MONGOOSE_URL).then(()=>{
    console.log("Data BAse Is COnnected!")
}).catch((error)=>{
    console.error(error.message);
    
})

const USerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
        minlenght: 10
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        maxlength: 50,
        minlenght: 10
    }
})

const User  = mongoose.model("User", USerSchema);

export default  User;