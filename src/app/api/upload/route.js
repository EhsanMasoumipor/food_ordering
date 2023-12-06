// import { User } from '@/models/User';
// import { Image } from '@/models/image';
// import { del, put } from '@vercel/blob';
// import mongoose from 'mongoose';
// import { NextResponse } from 'next/server';
// 
// export async function POST(request) {
//     try {
//         mongoose.connect(process.env.MONGO_URI);
//         const { searchParams } = new URL(request.url);
//         const image = searchParams.get('image') || "";
// 
//         if (image) {
//             const blob = await put(image, request.body, {
//                 access: 'public',
//             })
//             const saved_img = await User.updateOne({ image: blob.url.toString() })
//             return NextResponse.json({ blob, saved_img });
//         } else {
//             return NextResponse.json({ message: "No file ditected" });
//         }
//     } catch (error) {
//         return NextResponse.json({ message: error.message }, { status: 500 });
//     }
// 
// }
// 
// export async function DELETE(request) {
//     const body = await request.json();
//     await del(body.url)
// }