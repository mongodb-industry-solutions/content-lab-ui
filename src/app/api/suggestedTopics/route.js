import { NextResponse } from "next/server";

// Test function 
async function testSuggestedTopics() {
    console.log(`[TEST] Fetching suggested topics with hardcoded parameters`);
    
    try {
        const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";
        
        
        console.log(`[TEST] Connecting to backend at: ${backendUrl}/api/suggestions`);
        
        const response = await fetch(`${backendUrl}/api/suggestions?days=30&limit=10`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(`[TEST] Suggested topics received:`, data);
        return data; // Return the whole response
    } catch (error) {
        console.error(`[TEST] Suggested topics test failed:`, error);
        return { error: error.message };
    }
}

export async function GET(request) {
    try {
        // For testing purposes
        return NextResponse.json(await testSuggestedTopics());
    } catch (error) {
        console.error("Error in suggested topics API:", error);
        return NextResponse.json(
            { error: "Failed to fetch suggested topics" }, 
            { status: 500 }
        );
    }
}