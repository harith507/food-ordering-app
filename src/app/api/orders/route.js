import mongoose from "mongoose";
import { authOptions } from "../auth/[...nextauth]/route";
import { Order } from "@/models/Order";



export async function GET(){
    mongoose.connect(process.env.MONGO_URL);

    const session = await getServerSession(authOptions);

    const role = session?.user?.role;

    return Response.json( await Order.find());
}