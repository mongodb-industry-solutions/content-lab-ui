import { NextResponse } from "next/server";

async function fetchQueryTopics(query, label = 'all') {
    try {
        const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";

        // TODO: Future implementation - add label filtering support
        const response = await fetch(`${backendUrl}/api/analyze`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                query: query.trim(),
                limit: 10
                // label: label !== 'all' ? label : undefined
            })
        });

        if (!response.ok) {
            console.error("Failed to query topics:", response.statusText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }


        const data = await response.json();
        return data.suggestions;
    } catch (error) {
        console.error(`[API] Failed to fetch query topics:`, error);
        throw error;
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { query, label = 'all' } = body;

        const topics = await fetchQueryTopics(query, label);
        return NextResponse.json(topics);
    } catch (error) {
        console.error("Error in query topics API:", error);
        return NextResponse.json(
            { error: "Failed to fetch query topics" }, 
            { status: 500 }
        );
    }
}