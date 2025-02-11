import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import { User } from "@/models/User";

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
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
