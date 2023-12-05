import { MenuItem } from "@/models/MenuItem";
import mongoose from "mongoose";

export async function POST(request) {
    mongoose.connect(process.env.MONGO_URI);
    const data = await request.json();
    const menuItemDoc = await MenuItem.create(data);
    return Response.json(menuItemDoc)
}


export async function GET() {
    mongoose.connect(process.env.MONGO_URI);
    return Response.json(
        await MenuItem.find()
    )
}    