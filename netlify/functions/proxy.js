export async function handler(event) {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Non-POST Method Not Allowed' }),
    };
  }

  try {
    const { url, body } = JSON.parse(event.body || '{}');

    // Validate input
    if (!url) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Missing url parameter' }),
      };
    }

    if (!body || Object.keys(body).length === 0) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Missing body or empty body' }),
      };
    }

// for debugging
      return {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ 'url': url, 'message': 'AND body', 'body': body }),
      };
    }

    
    // Limit which API hosts can be called
    const ALLOWED_HOSTS = ['youtubetranscripts.app'];
    const hostname = new URL(url).hostname;

    if (!ALLOWED_HOSTS.includes(hostname)) {
      return {
        statusCode: 403,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: `Host ${hostname} not allowed` }),
      };
    }

    // Forward the request
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const text = await res.text(); // don’t assume JSON

    return {
      statusCode: res.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': res.headers.get('content-type') || 'application/json',
      },
      body: text,
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: err.message }),
    };
  }
}
