/**
 * Proxy route for researching topics from search backend
 * POST /api/services/research
 */

export async function POST(request) {
  try {
    // Get request body
    const body = await request.json();
    
    // Get backend URL from environment (server-side only)
    const backendUrl = process.env.INTERNAL_SEARCH_BACKEND_URL || 
                       process.env.NEXT_PUBLIC_SEARCH_BACKEND_URL || 
                       "http://localhost:8000";
    
    const url = `${backendUrl}/api/services/research`;
    
    console.log(`🔗 Proxying POST request to: ${url}`);
    
    // Forward request to backend
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Request failed' }));
      return Response.json(error, { status: response.status });
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('❌ Proxy error:', error);
    return Response.json(
      { error: 'Failed to connect to backend', details: error.message },
      { status: 500 }
    );
  }
}

