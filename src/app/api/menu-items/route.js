import { MenuItem } from "@/models/MenuItem";
import mongoose from "mongoose";

export async function POST(request) {
    mongoose.connect(process.env.MONGO_URI);
    const data = await request.json();
    const menuItemDoc = await MenuItem.create(data);
    return Response.json(menuItemDoc)
}

export async function PUT(request) {
    mongoose.connect(process.env.MONGO_URI);
    const { _id, ...data } = await request.json();
    await MenuItem.findByIdAndUpdate(_id, data);
    return Response.json(true)
}


export async function GET() {
    mongoose.connect(process.env.MONGO_URI);
    return Response.json(
        await MenuItem.find()
    )
}


export async function DELETE(request) {
    mongoose.connect(process.env.MONGO_URI);
    const url = new URL(request.url);
    const _id = url.searchParams.get('_id');
    await MenuItem.deleteOne({ _id })
    return Response.json(true);
}   