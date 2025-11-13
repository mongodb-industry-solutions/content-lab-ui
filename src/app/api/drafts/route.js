/**
 * Proxy route for drafts operations from search backend
 * GET /api/drafts?userId=...
 * POST /api/drafts
 */

export async function GET(request) {
  try {
    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    // Get backend URL from environment (server-side only)
    const backendUrl = process.env.INTERNAL_SEARCH_BACKEND_URL || 
                       process.env.NEXT_PUBLIC_SEARCH_BACKEND_URL || 
                       "http://localhost:8000";
    
    // Build full backend URL with query params
    const queryString = searchParams.toString();
    const url = `${backendUrl}/api/drafts${queryString ? '?' + queryString : ''}`;
    
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

export async function POST(request) {
  try {
    // Get request body
    const body = await request.json();
    
    // Get backend URL from environment (server-side only)
    const backendUrl = process.env.INTERNAL_SEARCH_BACKEND_URL || 
                       process.env.NEXT_PUBLIC_SEARCH_BACKEND_URL || 
                       "http://localhost:8000";
    
    const url = `${backendUrl}/api/drafts`;
    
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

