# Visby IT - Cloudflare Worker Deployment Guide

## 📋 Overview
This is a modern React landing page for Visby IT, deployed as a Cloudflare Worker with static assets. The site includes a contact form and is prepared for future file upload functionality.

## 🚀 Quick Start - Deployment Commands

### Prerequisites
1. **Node.js**: Install Node.js 18+ from https://nodejs.org/
2. **Cloudflare Account**: Create a free account at https://dash.cloudflare.com/
3. **Wrangler CLI**: Will be installed with npm install

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Build the Project
```bash
npm run build
```
This will:
- Compile the React application
- Generate static assets in `dist/public/`
- Prepare everything for deployment

### Step 3: Login to Cloudflare
```bash
npx wrangler login
```
This will open your browser to authenticate with Cloudflare.

### Step 4: Deploy to Cloudflare Workers
```bash
npx wrangler deploy
```

That's it! Your site will be live at: `https://visby-worker.<your-subdomain>.workers.dev`

## 🔧 Configuration

### Custom Domain
To use your own domain (e.g., `visby.it`):

1. Add a route in `wrangler.toml`:
```toml
routes = [
  { pattern = "visby.it/*", zone_name = "visby.it" }
]
```

2. Or use Cloudflare dashboard:
   - Go to Workers & Pages
   - Select your worker
   - Click "Add Custom Domain"
   - Enter your domain

### Environment Variables
For future features (email, file uploads), add to `wrangler.toml`:

```toml
[vars]
ENVIRONMENT = "production"

# For email functionality (when ready)
# RESEND_API_KEY = "re_..."

# For file uploads (when ready)
# Add R2 bucket binding:
# [[r2_buckets]]
# binding = "MY_BUCKET"
# bucket_name = "visby-uploads"
```

## 📁 Project Structure

```
visby-worker/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/         # Page components
│   │   └── hooks/         # React hooks
│   └── public/            # Static assets
├── src/
│   └── worker.ts          # Cloudflare Worker (backend)
├── dist/                  # Build output (created by npm run build)
│   └── public/            # Static assets served by worker
├── wrangler.toml          # Cloudflare Workers configuration
└── package.json           # Dependencies and scripts
```

## 🛠️ Development

### Local Development
```bash
npm run dev
```
This starts a local development server at `http://localhost:8787`

### Type Checking
```bash
npm run check
```

## 📧 Contact Form Setup

The contact form currently logs submissions. To enable email sending:

### Option 1: Resend API (Recommended)
1. Sign up at https://resend.com/
2. Get your API key
3. Add to `wrangler.toml`:
```toml
[vars]
RESEND_API_KEY = "re_your_api_key"
```

4. Update `src/worker.ts` to send emails:
```typescript
// In handleApiRoute function, replace the TODO with:
await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${env.RESEND_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    from: "kontakt@visby.it",
    to: "kontakt@visby.it",
    subject: `New contact from ${data.name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || "N/A"}</p>
      <p><strong>Company:</strong> ${data.company || "N/A"}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  }),
});
```

### Option 2: Cloudflare Email Routing
1. Set up email routing in Cloudflare Dashboard
2. Use Email Workers to process contact form submissions
3. Documentation: https://developers.cloudflare.com/email-routing/

## 📤 Future: File Upload for RMM Software

To add file upload functionality:

### 1. Create R2 Bucket
```bash
npx wrangler r2 bucket create visby-uploads
```

### 2. Update `wrangler.toml`
```toml
[[r2_buckets]]
binding = "UPLOADS"
bucket_name = "visby-uploads"
```

### 3. Implement Upload Endpoint
The endpoint structure is already in place at `/api/upload` in `src/worker.ts`. You'll need to:
- Accept file uploads
- Store in R2 bucket
- Return download URL
- Add authentication/authorization

## 🔍 Monitoring & Logs

View real-time logs:
```bash
npx wrangler tail
```

View deployment logs:
```bash
npx wrangler deployments list
```

## 📊 Performance

Cloudflare Workers are:
- ⚡ Blazingly fast (global edge network)
- 📈 Infinitely scalable
- 💰 Cost-effective (free tier: 100k requests/day)
- 🌍 Globally distributed

## 🆘 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist .wrangler
npm install
npm run build
```

### Deploy Fails
```bash
# Check authentication
npx wrangler whoami

# Re-authenticate if needed
npx wrangler login
```

### Site Not Updating
```bash
# Force redeploy
npm run build
npx wrangler deploy --force
```

## 📞 Support

For issues or questions:
- 📧 Email: kontakt@visby.it
- 📱 Phone: +45 27828427

## 🔐 Security Notes

- Contact form includes honeypot anti-spam
- CORS headers configured for API endpoints
- Input validation on all form submissions
- Ready for CSP headers if needed

## 📝 License

MIT
