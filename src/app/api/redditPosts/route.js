import { connectToDatabase } from "@/lib/mongo-server";
import { NextResponse } from "next/server";

const dbName = process.env.DB_NAME;
const collectionName = process.env.REDDIT_COLLECTION;

export async function GET(request) {
    try {
        const collection = await connectToDatabase(dbName, collectionName);
        const posts = await collection.find({}).limit(6).toArray();
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}