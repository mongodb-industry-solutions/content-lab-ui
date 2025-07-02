import { NextResponse } from "next/server";

// Test function with hardcoded query
async function testSearch() {
    const testQuery = "artificial intelligence trends";
    const limit = 3;
    
    console.log(`[TEST] Running search with hardcoded query: "${testQuery}"`);
    
    try {
        const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";
        
        console.log(`[TEST] Connecting to backend at: ${backendUrl}`);
        
        const response = await fetch(`${backendUrl}/api/search`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: testQuery,
                limit
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(`[TEST] Search results received:`, data);
        return data;
    } catch (error) {
        console.error(`[TEST] Search test failed:`, error);
        return { error: error.message };
    }
}

export async function POST(request) {
    try {
        // return NextResponse.json(await testSearch());
        
        const body = await request.json();
        const { query, limit = 5 } = body;

        if (!query) {
            return NextResponse.json(
                { error: "Query parameter is required" }, 
                { status: 400 }
            );
        }

        const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";
        console.log(`Searching with query: "${query}", limit: ${limit}`);

        const response = await fetch(`${backendUrl}/api/search`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query,
                limit
            })
        });

        if (!response.ok) {
            console.error("Search failed:", response.statusText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Search returned results:", data.results?.length || 0);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Search API error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Add a GET method for easier testing from the browser
export async function GET() {
    const results = await testSearch();
    return NextResponse.json(results);
}