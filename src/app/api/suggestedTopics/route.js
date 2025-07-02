import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const backendUrl = process.env.BACKEND_URL;
        if (!backendUrl) {
            throw new Error("BACKEND_URL is not set");
        }
        
        console.log("backendurl with endpoint: ", `${backendUrl}/topics`);

        try {
            const response = await fetch(`${backendUrl}/topics`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    query: "What is the capital of Spain?"
                })
            });

            if (!response.ok) {
                console.log("HTTP error! error: ", response.error);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("data: ", data);
            return NextResponse.json({ message: data.results });
        }catch(error) {
            return NextResponse.json({error: "Failed to fetch suggested topics"}, {status: 500});
        }
    }catch(error) {
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}