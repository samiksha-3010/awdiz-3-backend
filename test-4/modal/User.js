import Mongoose ,{Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["Buyer", "Seller", "Admin"],
        default: "Buyer"
    }
})

export default Mongoose.model("User",userSchema);