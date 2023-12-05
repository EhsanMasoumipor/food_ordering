import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import mongoose from "mongoose";
import { User } from "@/models/User";

export async function PUT(request) {
    mongoose.connect(process.env.MONGO_URI);
    const data = await request.json();
    const session = await getServerSession(authOptions);
    const email = session.user.email
    await User.updateOne({ email }, { name: data }, { new: true })
    return Response.json({ true: true })
}

export async function GET() {
    mongoose.connect(process.env.MONGO_URI);
    const session = await getServerSession(authOptions);
    const email = session.user.email
    return Response.json(
        await User.findOne({ email })
    )
}