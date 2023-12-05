import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import mongoose from "mongoose";
import { User } from "@/models/User";

export async function PUT(request) {
    mongoose.connect(process.env.MONGO_URI);

    const data = await request.json();
    const session = await getServerSession(authOptions);
    const email = session.user.email
    if ('name' in data) {
        await User.updateOne({ email }, { name: data.name })
    }
    return Response.json({ true: true })
}