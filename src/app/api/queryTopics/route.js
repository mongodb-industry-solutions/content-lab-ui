import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const body = await request.json();
        const { query } = body;

        const backendUrl = process.env.BACKEND_URL;
        if (!backendUrl) {
            throw new Error("BACKEND_URL is not set");
        }

        try {
            const response = await fetch(`${backendUrl}/query-topics`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    query: query
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return NextResponse.json({queryTopics: data});
        }catch(error) {
            return NextResponse.json({error: "Failed to fetch query topics"}, {status: 500});
        }
    }catch(error) {
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}