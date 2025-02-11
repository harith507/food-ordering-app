import mongoose from "mongoose";
import { User } from "@/models/User";

export async function GET(){
    mongoose.connect(process.env.MONGO_URL);
    const users = await User.find();
    return Response.json(users);
}

export async function PATCH(request) {
    mongoose.connect(process.env.MONGO_URL);
    const { id, active } = await request.json();
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { active },
      { new: true }
    );
    return Response.json(updatedUser);
}