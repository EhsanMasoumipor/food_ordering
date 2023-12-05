import { Category } from "@/models/Category";
import mongoose from "mongoose";

export async function POST(request) {
    mongoose.connect(process.env.MONGO_URI);
    const { name } = await request.json();
    const categoryDoc = await Category.create({ name });
    return Response.json(categoryDoc);
}

export async function PUT(request) {
    const { _id, name } = await request.json();
    await Category.updateOne({ _id }, { name });
    return Response.json(true)
}

export async function GET() {
    return Response.json(
        await Category.find()
    )
}