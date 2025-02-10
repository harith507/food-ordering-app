import mongoose from "mongoose";
import { authOptions } from "../auth/[...nextauth]/route";
import { Order } from "@/models/Order";

export async function GET(req) {
    mongoose.connect(process.env.MONGO_URL);

    // const session = await getServerSession(authOptions);

    // const role = session?.user?.role;

    const url = new URL(req.url);

    const orderId = url.searchParams.get('_id');
    const today = url.searchParams.get('today');

    if (!orderId && today) {
        const since = new Date();
        since.setHours(since.getHours() - 24);
        return Response.json(await Order.find({
            createdAt: { $gte: since }
        }));
    }

    if (orderId) {
        return Response.json(await Order.findById(orderId));
    } else {
        return Response.json(await Order.find());
    }
}

export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL);

    const { _id, ...data } = await req.json();

    if (_id) {
        await Order.findOneAndUpdate({ _id }, data);
        return Response.json('ok');
    } else {
        return Response.json('error');
    }

}

export async function DELETE(req) {
    mongoose.connect(process.env.MONGO_URL);
    const url = new URL(req.url);
    const _id = url.searchParams.get("_id");
    await Order.deleteOne({ _id });
    return Response.json(true);
}