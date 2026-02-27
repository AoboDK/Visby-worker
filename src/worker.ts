// Cloudflare Worker for Visby IT
// Handles static site serving and API endpoints

interface Env {
  ASSETS: Fetcher;
  RESEND_API_KEY: string;
  // Future: Add more environment variables here
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

      // Log attempt
      console.log("Attempting to send email via Resend...");

      // Send email via Resend
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Visby IT Kontaktformular <kontakt@visby.it>",
          to: "kontakt@visby.it",
          subject: `Ny henvendelse fra ${data.name}`,
          html: `
            <h2>Ny kontaktformular henvendelse</h2>
            <p><strong>Navn:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Telefon:</strong> ${data.phone || "Ikke oplyst"}</p>
            <p><strong>Virksomhed:</strong> ${data.company || "Ikke oplyst"}</p>
            <hr>
            <p><strong>Besked:</strong></p>
            <p>${data.message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p style="color: #666; font-size: 12px;">Sendt via visby.it kontaktformular</p>
          `,
          reply_to: data.email,
        }),
      });

      const responseData = await emailResponse.json();
      console.log("Resend API response:", responseData);

      if (!emailResponse.ok) {
        console.error("Resend API error:", responseData);
        return new Response(
          JSON.stringify({ error: "Failed to send email" }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      console.log("Email sent successfully!");
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
