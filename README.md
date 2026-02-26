# Visby IT - Modern IT Solutions Landing Page

🇩🇰 A professional landing page for Visby IT, built with React and deployed on Cloudflare Workers for maximum performance and global reach.

## ✨ Features

- ⚡ **Lightning Fast**: Deployed on Cloudflare's global edge network
- 📱 **Fully Responsive**: Beautiful design on all devices
- 🎨 **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- 📧 **Contact Form**: Ready for email integration
- 🔒 **Secure**: Input validation and anti-spam protection
- 🌍 **Global CDN**: Fast loading times worldwide
- 📈 **Scalable**: Handles any traffic volume

## 🎯 Services Highlighted

1. **MS365 Integration** - Microsoft 365 administration and security
2. **Domain Migration** - Seamless migration from IMAP/Google to MS365
3. **IT Support & Helpdesk** - Professional technical support
4. **RMM & Monitoring** - 24/7 system monitoring and patch management

## 🚀 Deployment

### Simple 3-Step Deploy

```bash
# 1. Install dependencies
npm install

# 2. Login to Cloudflare
npx wrangler login

# 3. Deploy!
npm run deploy
```

📚 **Full deployment guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md)  
⚡ **Quick reference**: See [QUICK_START.md](./QUICK_START.md)

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Animations**: Framer Motion
- **Routing**: Wouter (lightweight React router)
- **Forms**: React Hook Form + Zod validation
- **Build Tool**: Vite
- **Deployment**: Cloudflare Workers

## 📁 Project Structure

```
├── client/              # React frontend application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Page components (Home, Contact)
│   │   └── hooks/      # Custom React hooks
│   └── public/         # Static assets
├── src/
│   └── worker.ts       # Cloudflare Worker (serves static assets + API)
├── shared/             # Shared code (schemas, routes)
├── wrangler.toml       # Cloudflare Workers configuration
└── package.json        # Dependencies and scripts
```

## 🔧 Development

```bash
# Local development
npm run dev

# Type checking
npm run check

# Build for production
npm run build
```

## 📧 Contact Form Setup

The contact form is ready to use. To enable email notifications:

1. **Using Resend** (recommended):
   - Sign up at https://resend.com
   - Add API key to `wrangler.toml`
   - Update `src/worker.ts` with email logic

2. **Using Cloudflare Email Routing**:
   - Set up in Cloudflare Dashboard
   - Configure Email Workers

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 📤 Future Features

- ✅ Contact form (implemented, needs email backend)
- 🔄 File upload for RMM software (.exe downloads)
- 📊 Analytics integration
- 🌐 Multi-language support (Danish/English)

## 🔒 Security

- Input validation with Zod
- Honeypot anti-spam protection
- CORS headers configured
- Type-safe API routes
- CSP-ready architecture

## 📊 Performance

- ⚡ Global CDN delivery
- 🎯 Edge computing (0ms cold starts)
- 📦 Optimized bundle size
- 🖼️ Lazy-loaded components
- 💨 Code splitting

## 📞 Contact

- **Email**: kontakt@visby.it
- **Phone**: +45 27828427
- **Address**: Guldbergsgade 115, 2200 København N

## 📝 License

MIT

---

Built with ❤️ in Copenhagen
