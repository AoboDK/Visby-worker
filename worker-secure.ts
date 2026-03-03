// Cloudflare Worker for Visby IT - Secure Version
// Handles static site serving and API endpoints with comprehensive security

interface Env {
  ASSETS: Fetcher;
  RESEND_API_KEY: string;
}

const rateLimiter = new Map<string, { count: number; resetTime: number }>();

const DISPOSABLE_EMAIL_DOMAINS = [
  'tempmail.com', 'throwaway.email', '10minutemail.com', 'guerrillamail.com',
  'mailinator.com', 'trashmail.com', 'temp-mail.org', 'fakeinbox.com'
];

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      return handleApiRoute(request, url, env);
    }
    const response = await env.ASSETS.fetch(request);
    return addSecurityHeaders(response);
  },
};

async function handleApiRoute(request: Request, url: URL, env: Env): Promise<Response> {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "https://visby.it",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  const securityHeaders = {
    ...corsHeaders,
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Content-Type": "application/json",
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const clientIP = request.headers.get("CF-Connecting-IP") || "unknown";

  if (url.pathname === "/api/contact" && request.method === "POST") {
    try {
      if (!checkRateLimit(clientIP, 5, 60000)) {
        console.log(\`Rate limit exceeded for IP: \${clientIP}\`);
        return new Response(
          JSON.stringify({ error: "Too many requests. Please try again later." }),
          { status: 429, headers: securityHeaders }
        );
      }

      const data = await request.json().catch(() => null);

      if (!data || !isValidContactData(data)) {
        console.log(\`Invalid contact data from IP: \${clientIP}\`);
        return new Response(
          JSON.stringify({ error: "Invalid request data" }),
          { status: 400, headers: securityHeaders }
        );
      }

      if (data.website) {
        console.log(\`Honeypot triggered from IP: \${clientIP}\`);
        return new Response(JSON.stringify({ success: true }), { headers: securityHeaders });
      }

      if (data.timestamp && !isValidSubmissionTime(data.timestamp)) {
        console.log(\`Suspicious submission timing from IP: \${clientIP}\`);
        return new Response(JSON.stringify({ success: true }), { headers: securityHeaders });
      }

      const sanitizedData = {
        name: sanitizeInput(data.name),
        email: sanitizeInput(data.email),
        phone: data.phone ? sanitizeInput(data.phone) : "",
        company: data.company ? sanitizeInput(data.company) : "",
        message: sanitizeInput(data.message),
      };

      if (!isValidEmail(sanitizedData.email)) {
        console.log(\`Invalid/disposable email from IP: \${clientIP}\`);
        return new Response(
          JSON.stringify({ error: "Please provide a valid email address" }),
          { status: 400, headers: securityHeaders }
        );
      }

      console.log("Attempting to send email via Resend...");
      console.log(\`From IP: \${clientIP}, Email: \${sanitizedData.email}\`);

      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": \`Bearer \${env.RESEND_API_KEY}\`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Visby IT Kontaktformular <kontakt@visby.it>",
          to: "kontakt@visby.it",
          subject: \`Ny henvendelse fra \${sanitizedData.name}\`,
          html: \`
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #8b5cf6;">Ny kontaktformular henvendelse</h2>
              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Navn:</strong> \${escapeHtml(sanitizedData.name)}</p>
                <p><strong>Email:</strong> \${escapeHtml(sanitizedData.email)}</p>
                <p><strong>Telefon:</strong> \${escapeHtml(sanitizedData.phone) || "Ikke oplyst"}</p>
                <p><strong>Virksomhed:</strong> \${escapeHtml(sanitizedData.company) || "Ikke oplyst"}</p>
              </div>
              <div style="background: #ffffff; padding: 20px; border-left: 4px solid #8b5cf6; margin: 20px 0;">
                <p><strong>Besked:</strong></p>
                <p style="white-space: pre-wrap;">\${escapeHtml(sanitizedData.message)}</p>
              </div>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
              <p style="color: #6b7280; font-size: 12px;">
                Sendt via visby.it kontaktformular<br>
                IP: \${clientIP}<br>
                Tidspunkt: \${new Date().toLocaleString('da-DK', { timeZone: 'Europe/Copenhagen' })}
              </p>
            </div>
          \`,
          reply_to: sanitizedData.email,
        }),
      });

      const responseData = await emailResponse.json();
      console.log("Resend API response:", responseData);

      if (!emailResponse.ok) {
        console.error("Resend API error:", responseData);
        return new Response(
          JSON.stringify({ error: "Failed to send email. Please try again." }),
          { status: 500, headers: securityHeaders }
        );
      }

      console.log("Email sent successfully!");
      return new Response(JSON.stringify({ success: true }), { headers: securityHeaders });
    } catch (error) {
      console.error("Contact form error:", error);
      return new Response(
        JSON.stringify({ error: "Internal server error" }),
        { status: 500, headers: securityHeaders }
      );
    }
  }

  if (url.pathname === "/api/upload" && request.method === "POST") {
    return new Response(
      JSON.stringify({ error: "File upload not yet implemented" }),
      { status: 501, headers: securityHeaders }
    );
  }

  return new Response(JSON.stringify({ error: "Not found" }), {
    status: 404,
    headers: securityHeaders,
  });
}

function checkRateLimit(ip: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now();
  const record = rateLimiter.get(ip);
  if (!record || now > record.resetTime) {
    rateLimiter.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  if (record.count >= maxRequests) {
    return false;
  }
  record.count++;
  return true;
}

function isValidContactData(data: any): boolean {
  return (
    data &&
    typeof data.name === "string" &&
    data.name.length > 0 &&
    data.name.length <= 100 &&
    typeof data.email === "string" &&
    data.email.length > 0 &&
    data.email.length <= 100 &&
    typeof data.message === "string" &&
    data.message.length > 0 &&
    data.message.length <= 5000 &&
    (data.phone === undefined || typeof data.phone === "string") &&
    (data.company === undefined || typeof data.company === "string")
  );
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return false;
  }
  const domain = email.split('@')[1].toLowerCase();
  if (DISPOSABLE_EMAIL_DOMAINS.includes(domain)) {
    return false;
  }
  if (email.length > 100 || email.length < 5) {
    return false;
  }
  return true;
}

function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .substring(0, 1000);
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function isValidSubmissionTime(timestamp: number): boolean {
  const now = Date.now();
  const timeTaken = now - timestamp;
  return timeTaken > 2000 && timeTaken < 3600000;
}

function addSecurityHeaders(response: Response): Response {
  const newHeaders = new Headers(response.headers);
  newHeaders.set("X-Content-Type-Options", "nosniff");
  newHeaders.set("X-Frame-Options", "DENY");
  newHeaders.set("X-XSS-Protection", "1; mode=block");
  newHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");
  newHeaders.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  newHeaders.set(
    "Content-Security-Policy",
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "font-src 'self' data:; " +
    "connect-src 'self' https://api.resend.com https://app.eu.action1.com; " +
    "frame-ancestors 'none';"
  );
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}
