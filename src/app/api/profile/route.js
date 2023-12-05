import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import mongoose from "mongoose";
import { User } from "@/models/User";
import { UserInfo } from "@/models/UserInfo";

export async function PUT(request) {
    mongoose.connect(process.env.MONGO_URI);
    const data = await request.json();
    const { name, ...otherUserInfo } = data;
    const session = await getServerSession(authOptions);
    const email = session.user.email
    await User.findOneAndUpdate({ email }, { name });
    await UserInfo.findOneAndUpdate({ email }, otherUserInfo);

    return Response.json(true);
}

export async function GET() {
    mongoose.connect(process.env.MONGO_URI);
    const session = await getServerSession(authOptions);
    const email = session?.user?.email
    if (!email) {
        return Response.json({})
    }
    const user = await User.findOne({ email })
    const userInfo = await UserInfo.findOne({ email });
    return Response.json({ ...user, ...userInfo });
}