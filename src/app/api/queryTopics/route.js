import { NextResponse } from "next/server";

async function testQueryTopics() {
    const testQuery = "cryptocurrency market";
    
    console.log(`[TEST] Querying topics with hardcoded query: "${testQuery}"`);
    
    try {
        const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";
        
        console.log(`[TEST] Connecting to backend at: ${backendUrl}/api/analyze`);
        
        const response = await fetch(`${backendUrl}/api/analyze`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                query: testQuery,
                limit: 5 
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(`[TEST] Query topics results received:`, data);
        return data;
    } catch (error) {
        console.error(`[TEST] Query topics test failed:`, error);
        return { error: error.message };
    }
}

export async function POST(request) {
    try {
        //  testing purposes
        return NextResponse.json(await testQueryTopics());
        
        // code commented out for now
        /*
        const body = await request.json();
        const { query } = body;

        if (!query) {
            return NextResponse.json(
                { error: "Query parameter is required" }, 
                { status: 400 }
            );
        }

        const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";

        console.log(`Querying topics with: "${query}"`);

        const response = await fetch(`${backendUrl}/api/analyze`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query, limit: 5 })
        });

        if (!response.ok) {
            console.error("Failed to query topics:", response.statusText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Received query topics response:", data);
        return NextResponse.json(data);
        */
    } catch (error) {
        console.error("Error in query topics API:", error);
        return NextResponse.json(
            { error: "Failed to fetch query topics" }, 
            { status: 500 }
        );
    }
}

// a GET method for easier testing from the browser
export async function GET() {
    const results = await testQueryTopics();
    return NextResponse.json(results);
}