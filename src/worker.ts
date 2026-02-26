// Cloudflare Worker for Visby IT
// Handles static site serving and API endpoints

interface Env {
  ASSETS: Fetcher;
  // Future: Add environment variables here
  // RESEND_API_KEY?: string;
  // R2_BUCKET?: R2Bucket; // For file uploads
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle API routes
    if (url.pathname.startsWith("/api/")) {
      return handleApiRoute(request, url, env);
    }

    // Serve static assets
    return env.ASSETS.fetch(request);
  },
};

async function handleApiRoute(
  request: Request,
  url: URL,
  env: Env
): Promise<Response> {
  // CORS headers for API endpoints
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // Handle preflight requests
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Contact form endpoint
  if (url.pathname === "/api/contact" && request.method === "POST") {
    try {
      const data = await request.json().catch(() => null);

      // Validation
      if (!data || !isValidContactData(data)) {
        return new Response(
          JSON.stringify({ error: "Invalid request data" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Honeypot check (anti-spam)
      if (data.website) {
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // TODO: Implement email sending
      // Option 1: Use Resend API
      // Option 2: Use Cloudflare Email Routing
      // For now, log the data (in production, send email)
      console.log("Contact form submission:", {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        message: data.message,
        timestamp: new Date().toISOString(),
      });

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Contact form error:", error);
      return new Response(
        JSON.stringify({ error: "Internal server error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
  }

  // Future: File upload endpoint for RMM software
  if (url.pathname === "/api/upload" && request.method === "POST") {
    // TODO: Implement file upload to R2 bucket
    return new Response(
      JSON.stringify({ error: "File upload not yet implemented" }),
      {
        status: 501,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  // 404 for unknown API routes
  return new Response(JSON.stringify({ error: "Not found" }), {
    status: 404,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

// Helper function to validate contact form data
function isValidContactData(data: any): boolean {
  return (
    data &&
    typeof data.name === "string" &&
    data.name.length > 0 &&
    typeof data.email === "string" &&
    data.email.includes("@") &&
    typeof data.message === "string" &&
    data.message.length > 0
  );
}

