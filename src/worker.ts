// Cloudflare Worker for Visby IT
// Handles static site serving and API endpoints

interface Env {
  ASSETS: Fetcher;
  RESEND_API_KEY: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      return handleApiRoute(request, url, env);
    }

    return env.ASSETS.fetch(request);
  },
};

async function handleApiRoute(
  request: Request,
  url: URL,
  env: Env
): Promise<Response> {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (url.pathname === "/api/contact" && request.method === "POST") {
    try {
      const data = await request.json().catch(() => null);

      if (!data || !isValidContactData(data)) {
        return new Response(
          JSON.stringify({ error: "Invalid request data" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      if (data.website) {
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      console.log("Attempting to send email via Resend...");

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

  if (url.pathname === "/api/upload" && request.method === "POST") {
    return new Response(
      JSON.stringify({ error: "File upload not yet implemented" }),
      {
        status: 501,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  return new Response(JSON.stringify({ error: "Not found" }), {
    status: 404,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

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
