import { Schema } from "mongoose";
import { model, models } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    username:{type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone:{type: String, required: true},
    role:{type: String, required: true, enum: ["businessOwner", "waiter", "kitchenStaff","cashier"], default: "waiter"}
},{timestamps: true}) 

export const User = models?.User || model("User", UserSchema);
