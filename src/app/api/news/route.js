import { connectToDatabase } from "@/lib/mongo-server";
import { NextResponse } from "next/server";

const dbName = process.env.DB_NAME;
const collectionName = process.env.NEWS_COLLECTION;

export async function GET(request) {
    try {
        const collection = await connectToDatabase(dbName, collectionName);
        const news = await collection.find({}).limit(4).toArray();
        return NextResponse.json(news);
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}