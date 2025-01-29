import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/models/User";
import bcrypt from "bcrypt";

export async function PUT(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const email = session.user.email;

    const updateData = {};
    if ('email' in data) updateData.email = data.email;
    if ('username' in data) updateData.username = data.username;
    if ('phone' in data) updateData.phone = data.phone;
    if ('role' in data) updateData.role = data.role;
    if ('password' in data) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    await User.updateOne({ email }, { $set: updateData });

    return new Response(JSON.stringify({ message: "Profile updated" }), { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error);
    return new Response(JSON.stringify({ message: "Failed to update profile" }), { status: 500 });
  }
}