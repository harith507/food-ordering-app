import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import { User } from "@/models/User";
import bcrypt from "bcrypt"; // Added for password encryption

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  let data = await req.json();
  
  
  if (data.password) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(data.password, salt);
    data = { ...data, password: hashedPassword };
  }
  const { _id, email } = data;
  if (_id) {
    await User.findOneAndUpdate({ _id }, data);
  } else if (email) {
    await User.findOneAndUpdate({ email }, data);
  } else {
    return Response.json({ error: "No valid identifier provided" }, { status: 400 });
  }

  return Response.json(true);
}

export async function GET() {
    mongoose.connect(process.env.MONGO_URL);
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if(!email){
        return Response.json({});
    }
    return Response.json(
        await User.findOne({email})
    )
}
