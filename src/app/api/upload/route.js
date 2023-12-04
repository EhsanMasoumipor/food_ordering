import { del, put } from '@vercel/blob';
import { NextResponse } from 'next/server';


export async function POST(request) {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename') || "";

    if (filename) {
        const blob = await put(filename, request.body, {
            access: 'public',
        });

        return NextResponse.json(blob);
    } else {
        return NextResponse.json({ message: "No file ditected" });
    }
}

export async function DELETE(request) {
    const body = await request.json();
    await del(body.url)
}