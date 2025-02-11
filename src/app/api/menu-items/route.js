import { MenuItem } from "@/models/menuItem";
import mongoose from "mongoose";

export async function POST(req) {

    mongoose.connect(process.env.MONGO_URL);

    const data = await req.json();

    // Remove empty category value to avoid casting error.
    if (data.category === "") {
        delete data.category;
    }

    const menutItemDoc = await MenuItem.create(data);
    return Response.json(menutItemDoc);



}

export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL);
    const {_id, ...data} = await req.json();
    
    // Remove empty category value to avoid casting error.
    if (data.category === "") {
        delete data.category;
    }

    await MenuItem.findByIdAndUpdate(_id, data);
    return Response.json(true);
}


export async function GET() {
    mongoose.connect(process.env.MONGO_URL);
    return Response.json(
        await MenuItem.find()
    )
}

export async function DELETE(req) {
    mongoose.connect(process.env.MONGO_URL);
        const url = new URL(req.url);
        const _id = url.searchParams.get("_id");
        await MenuItem.deleteOne({_id});
        return Response.json(true);
    
}