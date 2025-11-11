# Deployment Guide - IMS2025

## Overview

This guide covers deploying your IMS2025 application to production using:

- **Frontend**: Vercel (Next.js optimized)
- **Backend**: Railway or Heroku (Node.js/Express)
- **Database**: MongoDB Atlas (Cloud)

---

## Prerequisites

- ✅ GitHub account
- ✅ Git installed locally
- ✅ Vercel account (free)
- ✅ Railway/Heroku account (free)
- ✅ MongoDB Atlas account (free)

---

## Part 1: Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Create account with email

### Step 2: Create Cluster

1. Click "Create" cluster
2. Select "M0 Free" tier
3. Choose region closest to you
4. Click "Create Cluster"

### Step 3: Create Database User

1. Go to "Database Access"
2. Click "Add New Database User"
3. Username: `admin`
4. Password: Generate strong password
5. Save credentials securely

### Step 4: Get Connection String

1. Go to "Databases"
2. Click "Connect" on your cluster
3. Select "Connect your application"
4. Copy connection string
5. Replace `<username>` and `<password>`

Example:

```
mongodb+srv://admin:PASSWORD@cluster0.xxxxx.mongodb.net/IMS202506?retryWrites=true&w=majority
```

---

## Part 2: Backend Deployment (Railway)

### Option A: Using Railway (Recommended)

#### Step 1: Push Backend to GitHub

```bash
cd c:\xampp\htdocs\classweb\IMS2025
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/IMS2025.git
git push -u origin main
```

#### Step 2: Deploy on Railway

1. Go to https://railway.app
2. Click "Login with GitHub"
3. Authorize Railway
4. Click "New Project"
5. Select "Deploy from GitHub repo"
6. Choose your IMS2025 repository
7. Railway auto-detects Node.js project

#### Step 3: Configure Environment Variables

In Railway Dashboard:

1. Click on your project
2. Go to "Variables"
3. Add these variables:

```env
PORT=3000
MONGODB_URI=mongodb+srv://admin:PASSWORD@cluster0.xxxxx.mongodb.net/IMS202506?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this
FRONTEND_URL=https://your-frontend-domain.vercel.app
NAME=IMS2025
VERSION=0.1.0
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
EMAIL_API_KEY=your-email-api-key
NODE_ENV=production
```

#### Step 4: Deploy

- Railway auto-deploys on every push to GitHub
- Check "Deployments" tab for status
- Get your backend URL: `https://your-project.up.railway.app`

### Option B: Using Heroku (Alternative)

#### Step 1: Install Heroku CLI

```bash
# Download from https://devcenter.heroku.com/articles/heroku-cli
```

#### Step 2: Login to Heroku

```bash
heroku login
```

#### Step 3: Create Heroku App

```bash
heroku create ims2025-backend
```

#### Step 4: Set Environment Variables

```bash
heroku config:set PORT=3000
heroku config:set MONGODB_URI=mongodb+srv://admin:PASSWORD@cluster0.xxxxx.mongodb.net/IMS202506?retryWrites=true&w=majority
heroku config:set JWT_SECRET=your-super-secret-jwt-key
heroku config:set FRONTEND_URL=https://your-frontend.vercel.app
heroku config:set NODE_ENV=production
```

#### Step 5: Deploy

```bash
git push heroku main
```

Your backend URL: `https://ims2025-backend.herokuapp.com`

---

## Part 3: Frontend Deployment (Vercel)

### Step 1: Push Frontend to GitHub

```bash
cd c:\xampp\htdocs\classweb\IMS2025\frontend
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/IMS2025-frontend.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Import your frontend GitHub repository
4. Select Next.js as framework
5. Click "Deploy"

### Step 3: Configure Environment Variables

In Vercel Dashboard:

1. Go to "Settings" → "Environment Variables"
2. Add:

   ```
   NEXT_PUBLIC_API_URL=https://ims2025-backend.up.railway.app/api
   ```

   (or your Heroku URL)

3. Click "Save"

### Step 4: Redeploy

1. Go to "Deployments"
2. Click "Redeploy" on the latest deployment

Your frontend URL: `https://ims2025-frontend.vercel.app` (custom domain available)

---

## Verification

### Check Backend

```bash
curl https://your-backend-url.up.railway.app
```

Should return:

```json
{
  "name": "IMS2025",
  "version": "0.1.0",
  "port": 3000
}
```

### Check Frontend

Open in browser:

```
https://your-frontend.vercel.app
```

### Test API Connection

Try login or create a product to verify frontend-backend communication.

---

## Local Development (After Deployment)

### Run Local Backend

```bash
cd c:\xampp\htdocs\classweb\IMS2025
npm run dev
```

### Run Local Frontend

```bash
cd frontend
npm run dev
```

### Switch Between Local and Production

**Use Local Backend:**

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

**Use Production Backend:**

```
NEXT_PUBLIC_API_URL=https://ims2025-backend.up.railway.app/api
```

---

## Environment Variables Summary

### Backend (.env)

```env
PORT=3000
MONGODB_URI=mongodb+srv://admin:PASSWORD@cluster0.xxxxx.mongodb.net/IMS202506?retryWrites=true&w=majority
JWT_SECRET=very-secure-secret-key
FRONTEND_URL=https://your-frontend.vercel.app
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
EMAIL_API_KEY=your-email-api-key
NODE_ENV=production
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=https://ims2025-backend.up.railway.app/api
```

---

## Continuous Deployment

### Automatic Deployments

- **Railway**: Automatically deploys on every push to GitHub
- **Vercel**: Automatically deploys on every push to GitHub
- **Heroku**: Automatically deploys on every push to GitHub

### Manual Deployments

**Railway Dashboard**: Click "Redeploy"  
**Vercel Dashboard**: Click "Redeploy"  
**Heroku CLI**: `git push heroku main`

---

## Monitoring & Logs

### Railway Logs

1. Dashboard → Select Project
2. Click "Logs" tab
3. See real-time logs

### Vercel Logs

1. Dashboard → Select Project
2. Click "Deployments"
3. Select deployment → "Logs"

### Heroku Logs

```bash
heroku logs --tail
```

---

## Troubleshooting Deployment

### Backend Won't Deploy

- Check all environment variables are set
- Verify MongoDB Atlas connection string
- Check Node.js version compatibility
- View deployment logs

### Frontend Won't Deploy

- Check `next.config.ts` is valid
- Verify TypeScript has no errors
- Check all dependencies are installed
- View build logs

### CORS Errors After Deployment

- Verify `FRONTEND_URL` in backend matches frontend domain
- Check `NEXT_PUBLIC_API_URL` in frontend matches backend domain
- Restart/redeploy after updating URLs

### Database Connection Issues

- Verify connection string is correct
- Check MongoDB Atlas IP whitelist includes Railway/Heroku IPs
- Ensure database credentials are correct

---

## Production Best Practices

### Security

- ✅ Use strong JWT_SECRET (>32 characters)
- ✅ Enable HTTPS (done by Vercel/Railway)
- ✅ Use environment variables for secrets
- ✅ Don't commit .env files to GitHub
- ✅ Regular security updates

### Performance

- ✅ Enable caching in Vercel
- ✅ Use MongoDB indexes
- ✅ Optimize images
- ✅ Enable gzip compression
- ✅ Monitor response times

### Monitoring

- ✅ Set up error tracking (Sentry)
- ✅ Monitor database performance
- ✅ Check server logs regularly
- ✅ Set up alerts for failures

---

## Scaling

### If Traffic Increases

- **Frontend**: Vercel auto-scales (no action needed)
- **Backend**: Upgrade Railway/Heroku plan
- **Database**: Upgrade MongoDB Atlas tier
- **CDN**: Enable in Vercel (included free)

---

## Cost Estimation

| Service       | Free Tier           | Cost                    |
| ------------- | ------------------- | ----------------------- |
| Vercel        | Yes                 | $20+/month if needed    |
| Railway       | 5GB/month           | $5+/month if needed     |
| Heroku        | Ended (use Railway) | Paid plans only         |
| MongoDB Atlas | 512MB               | Free, upgrade as needed |

**Total**: $0-50/month for small project

---

## Updating Deployed Apps

### Update Backend Code

```bash
git add .
git commit -m "Update message"
git push origin main
git push heroku main  # For Heroku
# For Railway: auto-deployed from GitHub
```

### Update Frontend Code

```bash
cd frontend
git add .
git commit -m "Update message"
git push origin main
# Auto-deployed by Vercel from GitHub
```

---

## Custom Domains

### Frontend Custom Domain (Vercel)

1. Go to Vercel Dashboard
2. Settings → Domains
3. Add your domain
4. Update DNS records
5. Verify domain

### Backend Custom Domain (Railway)

1. Go to Railway Dashboard
2. Settings → Custom Domain
3. Add your domain
4. Update DNS records

---

## Rollback

### Vercel Rollback

1. Deployments tab
2. Select previous deployment
3. Click "Promote to Production"

### Railway Rollback

1. Deployments tab
2. Click "Rollback"

### Heroku Rollback

```bash
heroku releases
heroku rollback v<NUMBER>
```

---

## Next Steps

1. ✅ Set up MongoDB Atlas
2. ✅ Deploy backend (Railway/Heroku)
3. ✅ Deploy frontend (Vercel)
4. ✅ Configure environment variables
5. ✅ Test live application
6. ✅ Set up monitoring
7. ✅ Plan for scaling

---

## Resources

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Heroku Docs: https://devcenter.heroku.com
- MongoDB Atlas: https://docs.atlas.mongodb.com

---

## Support

For deployment issues:

1. Check service status pages
2. Review deployment logs
3. Verify environment variables
4. Check GitHub repository access
5. Contact service support

---

**Your IMS2025 app is ready for the world! 🚀**
