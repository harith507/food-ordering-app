import { User } from "@/models/User";
import mongoose from "mongoose";

export async function POST(req) {
    try {
        const body = await req.json();
        mongoose.connect(process.env.MONGO_URL);

        // Check if the email already exists
        const existingUser = await User.findOne({ email: body.email });
        if (existingUser) {
            throw new Error("Email already in use");
        }

        const createdUser = await User.create(body); 
        return new Response(JSON.stringify(createdUser), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }
}