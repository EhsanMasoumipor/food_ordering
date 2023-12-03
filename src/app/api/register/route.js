import { User } from "@/models/User";
import mongoose from "mongoose";

export async function POST(request) {
    try {
        const body = await request.json();
        mongoose.connect(process.env.MONGO_URI);
        const user = await User.create(body);
        return Response.json(user, { status: 201 });
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}