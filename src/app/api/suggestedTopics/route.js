import { NextResponse } from "next/server";

async function fetchFilteredTopics(query = '', label = 'all') {
    try {
        const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";
        
        // Build URL parameters
        const params = new URLSearchParams();
        
        // Add search query if provided
        if (query && query.trim() !== '') {
            params.append('query', query.trim());
        }
        
        // Only apply label filter if it's not 'all' (which means "show all topics")
        if (label && label !== 'all') {
            params.append('label', label);
        }
        
        const url = `${backendUrl}/api/suggestions${params.toString() ? '?' + params.toString() : ''}`;
        
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.suggestions;
    } catch (error) {
        console.error(`[API] Failed to fetch topics:`, error);
        throw error;
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { query = '', label = 'all' } = body;

        const topics = await fetchFilteredTopics(query, label);
        return NextResponse.json(topics);
    } catch (error) {
        console.error("Error in suggested topics API:", error);
        return NextResponse.json(
            { error: "Failed to fetch topics" }, 
            { status: 500 }
        );
    }
}