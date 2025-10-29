# Deployment Guide - AI Builder Platform

This guide covers deploying the AI Builder platform to production.

## Prerequisites

- GitHub account
- Vercel account (free tier works)
- Google Cloud Console account (for OAuth)
- OpenAI API key (optional, for AI features)

## Option 1: Deploy to Vercel (Recommended)

### 1. Prepare Your Repository

Ensure all your code is committed and pushed to GitHub:

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Create a Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Authorize Vercel to access your repositories

### 3. Import Your Project

1. Click "New Project" in Vercel dashboard
2. Import your GitHub repository (`khajaaijaz26/Spotify-Analysis`)
3. Vercel will auto-detect it's a Next.js project

### 4. Configure Environment Variables

Add the following environment variables in Vercel:

**Required:**
```
DATABASE_URL=your-production-database-url
NEXTAUTH_SECRET=generate-a-random-32-char-string
NEXTAUTH_URL=https://your-domain.vercel.app
```

**Optional (for full functionality):**
```
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
AI_API_KEY=your-openai-api-key
AI_API_URL=https://api.openai.com/v1
```

### 5. Set Up Database

For production, use a hosted database:

**Option A: Vercel Postgres**
1. Go to Storage tab in Vercel
2. Create a Postgres database
3. Copy the DATABASE_URL
4. Update your environment variable

**Option B: PlanetScale**
1. Sign up at [planetscale.com](https://planetscale.com)
2. Create a new database
3. Get connection string
4. Update Prisma schema to use MySQL
5. Run migrations

**Option C: Railway**
1. Sign up at [railway.app](https://railway.app)
2. Create a PostgreSQL database
3. Copy connection string
4. Add to environment variables

### 6. Generate NextAuth Secret

```bash
openssl rand -base64 32
```

Copy the output and use it as `NEXTAUTH_SECRET`

### 7. Set Up Google OAuth (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google+ API
4. Go to Credentials → Create OAuth 2.0 Client ID
5. Add authorized redirect URI:
   - `https://your-domain.vercel.app/api/auth/callback/google`
6. Copy Client ID and Secret
7. Add to Vercel environment variables

### 8. Deploy

1. Click "Deploy" in Vercel
2. Wait for build to complete (2-3 minutes)
3. Visit your deployment URL

### 9. Run Database Migrations

After first deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Run migrations
vercel env pull .env.local
npx prisma db push
```

## Option 2: Self-Hosting

### Using Docker

1. Create `Dockerfile`:

```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

2. Build and run:

```bash
docker build -t ai-builder .
docker run -p 3000:3000 --env-file .env ai-builder
```

### Using PM2

```bash
npm install pm2 -g
npm run build
pm2 start npm --name "ai-builder" -- start
pm2 save
pm2 startup
```

## Post-Deployment Checklist

- [ ] Test authentication (sign up, sign in, sign out)
- [ ] Test code generation
- [ ] Test project save functionality
- [ ] Test ZIP export
- [ ] Test on mobile devices
- [ ] Set up monitoring (Vercel Analytics, Sentry)
- [ ] Configure custom domain (optional)
- [ ] Set up SSL certificate (automatic on Vercel)
- [ ] Test all template types
- [ ] Check database connections
- [ ] Monitor error logs

## Environment Variables Reference

### Required

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Database connection string | `postgresql://user:pass@host/db` |
| `NEXTAUTH_SECRET` | Secret for session encryption | 32-char random string |
| `NEXTAUTH_URL` | Your app's URL | `https://app.vercel.app` |

### Optional

| Variable | Description | Default |
|----------|-------------|---------|
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | - |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | - |
| `AI_API_KEY` | OpenAI or AI service key | - |
| `AI_API_URL` | AI service endpoint | `https://api.openai.com/v1` |

## Troubleshooting

### Build Fails

**Issue:** "Module not found"
- Run `npm install` locally
- Check all imports are correct
- Verify `package.json` has all dependencies

**Issue:** "Prisma Client not generated"
- Add `postinstall` script: `"postinstall": "prisma generate"`
- Run `npx prisma generate` manually

### Database Connection Issues

- Verify DATABASE_URL is correct
- Check database is accessible from Vercel
- Ensure SSL is enabled (add `?sslmode=require`)
- Run `npx prisma db push` to create tables

### Authentication Not Working

- Check NEXTAUTH_SECRET is set
- Verify NEXTAUTH_URL matches your domain
- For Google OAuth, check redirect URIs
- Clear browser cookies and try again

### 500 Errors in Production

- Check Vercel logs (Dashboard → Project → Logs)
- Verify all environment variables are set
- Check database connection
- Look for missing API keys

## Monitoring and Maintenance

### Set Up Monitoring

1. **Vercel Analytics**
   - Enable in Project Settings → Analytics
   - Track page views and Web Vitals

2. **Error Tracking (Sentry)**
   ```bash
   npm install @sentry/nextjs
   ```
   - Follow Sentry setup guide
   - Add to `next.config.js`

3. **Uptime Monitoring**
   - Use UptimeRobot or Pingdom
   - Monitor `/api/health` endpoint

### Regular Maintenance

- Update dependencies monthly
- Review error logs weekly
- Backup database regularly
- Monitor usage and costs
- Update AI prompts as needed

## Scaling

### Performance Optimization

- Enable Vercel Edge Functions for API routes
- Use Vercel Image Optimization
- Implement Redis caching for sessions
- Add CDN for static assets
- Optimize database queries

### Database Scaling

- Add connection pooling (Prisma Accelerate)
- Use read replicas
- Implement query caching
- Add database indexes
- Monitor slow queries

## Support

For deployment issues:
- Check [Next.js Docs](https://nextjs.org/docs/deployment)
- Visit [Vercel Docs](https://vercel.com/docs)
- Contact: khajaaijaz26@gmail.com

## Security Checklist

- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Set secure headers (CSP, HSTS)
- [ ] Use environment variables for secrets
- [ ] Enable rate limiting
- [ ] Implement CORS properly
- [ ] Keep dependencies updated
- [ ] Enable security headers
- [ ] Use prepared statements (Prisma does this)
- [ ] Validate all user inputs
- [ ] Monitor for security alerts

---

🚀 Your AI Builder platform is now live!
