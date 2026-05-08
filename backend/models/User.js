import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    id: {type: String, required: true},
    senha: {type: String, required: true}
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema);

export default User