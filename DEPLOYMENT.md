# 🚀 Deployment Guide - Revueon

## Quick Deploy to Vercel (Recommended)

### One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/AyushX1602/REVUEON-landing)

### Manual Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Set Environment Variables in Vercel Dashboard**
   - Go to Project Settings → Environment Variables
   - Add variables from `.env.example`

---

## Deploy to Netlify

1. **Connect Repository**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub account
   - Select `REVUEON-landing` repository

2. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

3. **Environment Variables**
   - Go to Site settings → Build & deploy → Environment
   - Add variables from `.env.example`

4. **Deploy**
   - Click "Deploy site"

---

## Deploy to GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install -D gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://ayushx1602.github.io/REVUEON-landing"
   }
   ```

3. **Update vite.config.js**
   ```javascript
   export default defineConfig({
     base: '/REVUEON-landing/',
     // ... rest of config
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

---

## Build for Production

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Build
npm run build

# Test production build locally
npm run preview
```

---

## Environment Variables Setup

### Development (`.env`)
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_ENABLE_ANALYTICS=false
VITE_ENV=development
```

### Production
```env
VITE_API_BASE_URL=https://api.revueon.com
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
VITE_ENABLE_ANALYTICS=true
VITE_ENV=production
```

---

## Post-Deployment Checklist

### ✅ Verify Functionality
- [ ] Landing page loads correctly
- [ ] Animations work smoothly
- [ ] Forms submit without errors
- [ ] Links and navigation work
- [ ] Images load properly
- [ ] Mobile responsive on all devices

### ✅ Performance
- [ ] Run Lighthouse audit (target: 90+)
- [ ] Check bundle sizes
- [ ] Verify lazy loading works
- [ ] Test on slow 3G connection

### ✅ SEO
- [ ] Meta tags render correctly
- [ ] Open Graph preview works (Facebook/LinkedIn)
- [ ] Twitter card preview works
- [ ] Sitemap accessible
- [ ] robots.txt accessible

### ✅ Analytics
- [ ] Google Analytics tracking (if enabled)
- [ ] Custom events firing correctly
- [ ] Error tracking working

### ✅ PWA
- [ ] Manifest loads correctly
- [ ] Icons display properly
- [ ] Theme color applies
- [ ] Install prompt works (mobile)

---

## Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### Netlify
1. Go to Site settings → Domain management
2. Add custom domain
3. Update DNS:
   ```
   Type: A
   Name: @
   Value: [Netlify Load Balancer IP]
   
   Type: CNAME
   Name: www
   Value: [your-site].netlify.app
   ```

---

## SSL/HTTPS

Both Vercel and Netlify provide **automatic HTTPS** with Let's Encrypt certificates. No configuration needed!

---

## Performance Optimization

### Image Optimization
- Use WebP format for images
- Compress images with [TinyPNG](https://tinypng.com)
- Use appropriate image sizes for different devices

### CDN Configuration
Both Vercel and Netlify have built-in CDN. For custom CDN:
- CloudFlare (recommended)
- AWS CloudFront
- Fastly

---

## Monitoring & Analytics

### Recommended Tools
1. **Vercel Analytics** - Built-in with Vercel
2. **Google Analytics 4** - Set `VITE_GA_TRACKING_ID`
3. **Hotjar** - Heatmaps and user recordings
4. **Sentry** - Error tracking (optional)

### Setup Google Analytics
1. Create GA4 property
2. Get Tracking ID (G-XXXXXXXXXX)
3. Add to environment variables
4. Deploy

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules dist .vite
npm install
npm run build
```

### Environment Variables Not Working
- Ensure variables start with `VITE_`
- Restart dev server after changing `.env`
- Re-deploy after updating Vercel/Netlify env vars

### Images Not Loading
- Check image paths (should be relative to `public/`)
- Verify images are in `public/` folder
- Check browser console for 404 errors

### Animations Laggy
- Reduce number of active ScrollTriggers
- Disable animations on low-end devices
- Use `will-change` CSS property sparingly

---

## Rollback Deployment

### Vercel
```bash
vercel rollback [deployment-url]
```
Or use Vercel Dashboard → Deployments → Select previous → Promote to Production

### Netlify
- Go to Deploys
- Click on previous successful deploy
- Click "Publish deploy"

---

## CI/CD Setup (Optional)

### GitHub Actions
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## Support

For deployment issues:
- Check [Vercel Documentation](https://vercel.com/docs)
- Check [Netlify Documentation](https://docs.netlify.com)
- Open issue on [GitHub](https://github.com/AyushX1602/REVUEON-landing/issues)

---

**Happy Deploying! 🚀**
