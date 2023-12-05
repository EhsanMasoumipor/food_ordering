import { User } from "@/models/User";
import mongoose from "mongoose";
import bcrypt from 'bcrypt'

export async function POST(request) {
    try {
        const body = await request.json();
        mongoose.connect(process.env.MONGO_URI);
        const pass = body.password;

        if (!pass?.length || pass?.length < 5) {
            new Error("password must be at least 5 characters");
            return false;
        }
        const hashed_password = bcrypt.hashSync(pass, 10);
        body.password = hashed_password
        const user = await User.create(body);
        return Response.json(user, { status: 201 });
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}