import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const backendUrl = process.env.BACKEND_URL;
        if (!backendUrl) {
            throw new Error("BACKEND_URL is not set");
        }

        try {
            const response = await fetch(`${backendUrl}/suggested-topics`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return NextResponse.json({suggestedTopics: data });
        }catch(error) {
            return NextResponse.json({error: "Failed to fetch suggested topics"}, {status: 500});
        }
    }catch(error) {
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}