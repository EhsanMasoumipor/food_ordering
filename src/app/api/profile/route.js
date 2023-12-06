import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import mongoose from "mongoose";
import { User } from "@/models/User";
import { UserInfo } from "@/models/UserInfo";

export async function PUT(request) {
    mongoose.connect(process.env.MONGO_URI);
    const data = await request.json();
    const { _id, name, ...otherUserInfo } = data;
    let filter = {};
    if (_id) {
        filter = { _id };
    } else {
        const session = await getServerSession(authOptions);
        const email = session.user.email
        filter = { email };
    }
    const user = await User.findOne(filter);
    await User.findOneAndUpdate(filter, { name }, { upsert: true });
    await UserInfo.findOneAndUpdate({ email: user.email }, otherUserInfo);
    return Response.json(true);
}

export async function GET(request) {
    mongoose.connect(process.env.MONGO_URI);
    const url = new URL(request.url);
    const _id = url.searchParams.get('_id');
    let filterUser = {};
    if (_id) {
        filterUser = _id;
    } else {
        const session = await getServerSession(authOptions);
        const email = session?.user?.email
        if (!email) {
            return Response.json({})
        }
        filterUser = email
    }
    const user = await User.findOne(filterUser).lean()
    const userInfo = await UserInfo.findOne({ email: user.email }).lean();
    return Response.json({ ...user, ...userInfo });

}