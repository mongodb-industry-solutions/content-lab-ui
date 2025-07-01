import { connectToDatabase } from "@/lib/mongo-server";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const dbName = process.env.DB_NAME;
const collectionName = process.env.USERS_COLLECTION;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: "userId parameter is required" },
        { status: 400 }
      );
    }

    const collection = await connectToDatabase(dbName, collectionName);
    const userProfile = await collection.findOne({ _id: new ObjectId(userId) });

    if (!userProfile) {
      return NextResponse.json(
        { error: "User profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(userProfile);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 