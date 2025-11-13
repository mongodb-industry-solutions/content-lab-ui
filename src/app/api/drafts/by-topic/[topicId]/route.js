/**
 * Proxy route for fetching draft by topic ID from search backend
 * GET /api/drafts/by-topic/[topicId]?userId=...
 */

export async function GET(request, { params }) {
  try {
    // Extract dynamic parameter
    const { topicId } = params;
    
    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    // Get backend URL from environment (server-side only)
    const backendUrl = process.env.INTERNAL_SEARCH_BACKEND_URL || 
                       process.env.NEXT_PUBLIC_SEARCH_BACKEND_URL || 
                       "http://localhost:8000";
    
    // Build full backend URL with query params
    const queryString = searchParams.toString();
    const url = `${backendUrl}/api/drafts/by-topic/${topicId}${queryString ? '?' + queryString : ''}`;
    
    console.log(`🔗 Proxying GET request to: ${url}`);
    
    // Forward request to backend
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
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

