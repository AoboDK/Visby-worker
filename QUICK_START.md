# 🚀 Quick Deploy Commands

## First Time Setup
```bash
# 1. Install dependencies
npm install

# 2. Login to Cloudflare
npx wrangler login

# 3. Build and deploy
npm run build
npx wrangler deploy
```

## Subsequent Deployments
```bash
npm run deploy
```
(This command runs build + deploy automatically)

## Development
```bash
# Local dev server
npm run dev

# Type checking
npm run check
```

## Monitoring
```bash
# View live logs
npx wrangler tail

# List deployments
npx wrangler deployments list
```

## Your Live URLs
After deployment, your site will be available at:
- Worker URL: `https://visby-worker.<subdomain>.workers.dev`
- Custom domain (after setup): `https://visby.it`

## Need Help?
See DEPLOYMENT.md for full documentation.
