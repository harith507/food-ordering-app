import { User } from "@/models/User";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export async function POST(req) {
    try {
        const body = await req.json();
        mongoose.connect(process.env.MONGO_URL);

        const pass = body.password;

        if (!pass?.length || pass.length < 5) {
            throw new Error("Password must be at least 8 characters long");
        }

        const notHashedPassword = pass;
        const salt = bcrypt.genSaltSync(10);
        body.password = bcrypt.hashSync(notHashedPassword, salt);

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