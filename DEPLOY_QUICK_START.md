# 🚀 Quick Deployment Setup - IMS2025

Get your application live in 15 minutes!

## 📋 Prerequisites (5 min)

1. **Create Free Accounts:**

   - Vercel: https://vercel.com (for frontend)
   - Railway: https://railway.app (for backend)
   - MongoDB Atlas: https://www.mongodb.com/cloud/atlas (for database)

2. **Install Git:**

   - Download from https://git-scm.com

3. **Install Vercel CLI (for frontend):**

   ```bash
   npm install -g vercel
   ```

4. **Install Railway CLI (for backend):**
   ```bash
   npm install -g @railway/cli
   ```

---

## 🗄️ Step 1: Setup Database (2 min)

### Create MongoDB Atlas Cluster

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free tier available)
3. Create a cluster (Choose M0 - Free)
4. Create database user:
   - Username: `admin`
   - Password: Generate secure password
5. Whitelist IP: Click "Add IP Address" → "Allow Access from Anywhere"
6. Get connection string:
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the URI

**Example Connection String:**

```
mongodb+srv://admin:PASSWORD@cluster0.xxxxx.mongodb.net/IMS202506?retryWrites=true&w=majority
```

Save this! You'll need it soon.

---

## 🔧 Step 2: Setup Backend (5 min)

### Option A: Using Railway (Recommended)

1. **Push code to GitHub:**

   ```bash
   cd c:\xampp\htdocs\classweb\IMS2025
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/IMS2025-backend.git
   git branch -M main
   git push -u origin main
   ```

2. **Go to Railway.app:**

   - Click "New Project"
   - Choose "Deploy from GitHub repo"
   - Select your IMS2025-backend repo
   - Railway auto-detects Node.js

3. **Add Environment Variables:**

   - Click "Variables" tab
   - Add these:

   ```
   PORT=3000
   MONGODB_URI=mongodb+srv://admin:PASSWORD@cluster0.xxxxx.mongodb.net/IMS202506?retryWrites=true&w=majority
   JWT_SECRET=your-very-secret-key-at-least-32-chars
   FRONTEND_URL=https://ims2025-frontend.vercel.app
   NODE_ENV=production
   ```

4. **Get Backend URL:**
   - Railway auto-deploys
   - Your backend URL appears in dashboard
   - Example: `https://ims2025-backend.up.railway.app`

**That's it! Your backend is live!** ✅

### Option B: Using Heroku (Alternative)

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create ims2025-backend

# Set environment variables
heroku config:set MONGODB_URI=mongodb+srv://admin:PASSWORD@...
heroku config:set JWT_SECRET=your-secret-key
heroku config:set FRONTEND_URL=https://ims2025-frontend.vercel.app

# Deploy
git push heroku main
```

---

## 🎨 Step 3: Setup Frontend (5 min)

1. **Update API URL:**

   - Edit `frontend/.env.local`

   ```env
   NEXT_PUBLIC_API_URL=https://ims2025-backend.up.railway.app/api
   ```

   (Use your actual Railway URL)

2. **Push to GitHub:**

   ```bash
   cd frontend
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/IMS2025-frontend.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy on Vercel:**

   - Go to https://vercel.com
   - Click "Add New..." → "Project"
   - Import your GitHub repo
   - Select Next.js framework
   - Add environment variables:
     ```
     NEXT_PUBLIC_API_URL=https://ims2025-backend.up.railway.app/api
     ```
   - Click "Deploy"

4. **Get Frontend URL:**
   - Vercel shows your live URL
   - Example: `https://ims2025-frontend.vercel.app`

**Your frontend is now live!** ✅

---

## 🔗 Step 4: Connect Frontend & Backend (1 min)

### Update Backend FRONTEND_URL

1. Go to Railway Dashboard
2. Select your backend project
3. Go to "Variables"
4. Update `FRONTEND_URL`:
   ```
   FRONTEND_URL=https://ims2025-frontend.vercel.app
   ```
5. Project auto-redeploys

### Redeploy Backend

1. Railway Dashboard
2. Click "Redeploy"
3. Wait for deployment to complete

---

## ✅ Verification

### Test Backend

```bash
curl https://ims2025-backend.up.railway.app
```

Should return:

```json
{
  "name": "IMS2025",
  "version": "0.1.0",
  "port": 3000
}
```

### Test Frontend

Open in browser:

```
https://ims2025-frontend.vercel.app
```

### Test Connection

1. Try to login
2. Create a product
3. Check if data saves

**Everything working? You're done!** 🎉

---

## 📊 URLs You'll Need

```
Frontend:  https://ims2025-frontend.vercel.app
Backend:   https://ims2025-backend.up.railway.app
API:       https://ims2025-backend.up.railway.app/api
Database:  MongoDB Atlas (managed)
```

---

## 🔄 How to Update

### Update Backend

```bash
git add .
git commit -m "Backend update"
git push origin main
# Railway auto-deploys
```

### Update Frontend

```bash
cd frontend
git add .
git commit -m "Frontend update"
git push origin main
# Vercel auto-deploys
```

---

## 💾 Local Development

You can still develop locally!

### Terminal 1: Start Backend

```bash
npm run dev
# Runs on http://localhost:3000
```

### Terminal 2: Start Frontend

```bash
cd frontend
npm run dev
# Runs on http://localhost:3001
```

Then edit `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

---

## 🆘 Troubleshooting

### CORS Error

**Check:**

- Backend: `FRONTEND_URL` = Your Vercel URL
- Frontend: `NEXT_PUBLIC_API_URL` = Your Railway URL
- Both updated? Redeploy both services

### Database Not Connecting

**Check:**

- MongoDB URI is correct
- IP whitelist includes Railway IP (Allow Anywhere for testing)
- Username/password are correct

### Frontend Won't Deploy

**Check:**

- No build errors: `npm run build` locally
- All dependencies installed
- TypeScript no errors
- .gitignore not ignoring needed files

### Backend Won't Deploy

**Check:**

- All environment variables set
- `package.json` has `"start": "node src/app.js"`
- Node version 18+
- No hardcoded ports

---

## 📈 Monitoring

### Railway Logs

1. Dashboard → Select project
2. Click "Logs"
3. See real-time output

### Vercel Logs

1. Dashboard → Select project
2. Deployments → Recent deployment
3. Click "View Function Logs"

---

## 🔐 Security Checklist

- [ ] JWT_SECRET is strong (32+ characters)
- [ ] No secrets in GitHub (use .env files)
- [ ] MONGODB_URI not in code
- [ ] FRONTEND_URL set to production domain
- [ ] NODE_ENV=production in backend
- [ ] HTTPS enabled (automatic)

---

## 🎯 Next Steps

1. ✅ Create MongoDB Atlas account
2. ✅ Create MongoDB cluster and get connection string
3. ✅ Push backend to GitHub and deploy on Railway
4. ✅ Push frontend to GitHub and deploy on Vercel
5. ✅ Test everything works
6. ✅ Share your live app with the world!

---

## 📚 Full Guides

For detailed deployment instructions, see: `DEPLOYMENT_GUIDE.md`

---

## 🚀 You're Live!

Your IMS2025 application is now:

- ✅ Live on the internet
- ✅ Auto-deploying on every push
- ✅ Production-ready
- ✅ Scalable

**Share your live URL:**

```
https://ims2025-frontend.vercel.app
```

---

**Deployment Time: ~15 minutes**  
**Cost: FREE!** (for small projects)  
**Effort: Easy** ✅

Happy deploying! 🚀
