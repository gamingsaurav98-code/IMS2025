# 🚀 Deployment Checklist - IMS2025

## Pre-Deployment

### Code Quality

- [ ] No console.log statements (or remove before deployment)
- [ ] No TypeScript errors: `npm run build`
- [ ] No linting errors: `npm run lint`
- [ ] All tests passing: `npm test`
- [ ] No hardcoded URLs or sensitive data

### Environment Setup

- [ ] Created `.env.production` file
- [ ] Created `frontend/.env.production` file
- [ ] All required environment variables set
- [ ] MongoDB Atlas cluster created
- [ ] MongoDB connection string saved

### GitHub Setup

- [ ] Code pushed to GitHub
- [ ] GitHub account created
- [ ] Repository is public
- [ ] .gitignore includes .env files

### Third-Party Services

- [ ] Vercel account created (free)
- [ ] Railway account created (free)
- [ ] MongoDB Atlas account created (free)
- [ ] GitHub connected to Vercel
- [ ] GitHub connected to Railway

---

## Deployment Steps

### Step 1: Database Setup

- [ ] MongoDB Atlas cluster created
- [ ] Database user created (username/password)
- [ ] IP whitelist configured (Allow Anywhere)
- [ ] Connection string copied
- [ ] Connection string tested

### Step 2: Backend Deployment

- [ ] Backend code pushed to GitHub
- [ ] Railway project created
- [ ] GitHub repo connected to Railway
- [ ] Environment variables set in Railway:
  - [ ] MONGODB_URI
  - [ ] JWT_SECRET
  - [ ] FRONTEND_URL
  - [ ] NODE_ENV=production
  - [ ] Other API keys (Cloudinary, Email, etc.)
- [ ] Backend deployment successful
- [ ] Backend URL obtained
- [ ] Backend responds to health check: `curl https://your-backend-url`

### Step 3: Frontend Deployment

- [ ] Updated `NEXT_PUBLIC_API_URL` to production backend
- [ ] Frontend code pushed to GitHub
- [ ] Vercel project created
- [ ] GitHub repo connected to Vercel
- [ ] Environment variables set in Vercel:
  - [ ] NEXT_PUBLIC_API_URL=backend-url/api
- [ ] Frontend deployment successful
- [ ] Frontend URL obtained

### Step 4: Connection Verification

- [ ] Update backend `FRONTEND_URL` to production frontend
- [ ] Redeploy backend
- [ ] Test frontend loads (no 404s)
- [ ] Test API calls work (Network tab)
- [ ] Test authentication (register/login)
- [ ] Test CRUD operations:
  - [ ] Create product
  - [ ] Read products
  - [ ] Update product
  - [ ] Delete product
  - [ ] Same for customers/orders

---

## Post-Deployment

### Monitoring

- [ ] Check backend logs daily
- [ ] Check frontend build logs
- [ ] Monitor error rates
- [ ] Set up error tracking (Sentry)
- [ ] Set up uptime monitoring

### Testing

- [ ] Test on desktop browser
- [ ] Test on mobile browser
- [ ] Test on tablet
- [ ] Check responsive design
- [ ] Test slow network (3G)
- [ ] Test offline mode

### Performance

- [ ] Check Core Web Vitals
- [ ] Check page load time (<3s)
- [ ] Check API response time (<200ms)
- [ ] Check database query performance
- [ ] Monitor bandwidth usage

### Security

- [ ] Check HTTPS enabled (automatic)
- [ ] Check SSL certificate valid
- [ ] Review security headers
- [ ] Check for exposed secrets
- [ ] Review access logs
- [ ] Enable rate limiting

---

## Maintenance

### Weekly

- [ ] Check error logs
- [ ] Monitor uptime
- [ ] Check database size
- [ ] Review performance metrics

### Monthly

- [ ] Update dependencies
- [ ] Review and update security patches
- [ ] Backup database
- [ ] Review cost usage
- [ ] Check analytics

### Quarterly

- [ ] Performance optimization
- [ ] Database optimization
- [ ] Security audit
- [ ] Capacity planning
- [ ] Feature releases

---

## Rollback Plan

### If Deployment Fails

**Backend Rollback (Railway):**

1. Go to Railway Dashboard
2. Select your project
3. Click "Deployments"
4. Find previous successful deployment
5. Click "Rollback"

**Frontend Rollback (Vercel):**

1. Go to Vercel Dashboard
2. Select your project
3. Go to "Deployments"
4. Find previous successful deployment
5. Click "Promote to Production"

---

## Troubleshooting

### CORS Errors

```
❌ Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**

1. Check `FRONTEND_URL` in backend matches frontend domain
2. Redeploy backend
3. Clear browser cache
4. Verify CORS middleware in `src/app.js`

### Database Connection Failed

```
❌ MongoServerError: connect ECONNREFUSED
```

**Solution:**

1. Check MongoDB URI in backend environment
2. Verify IP whitelist in MongoDB Atlas
3. Test connection string locally
4. Check database credentials

### Frontend Shows Blank Page

```
❌ Application not loading
```

**Solution:**

1. Check browser console for errors
2. Verify `NEXT_PUBLIC_API_URL` is correct
3. Check build logs in Vercel
4. Clear browser cache
5. Try incognito mode

### API Returns 401

```
❌ {"error": "Unauthorized"}
```

**Solution:**

1. Try logging in again
2. Check JWT_SECRET matches on backend
3. Verify token stored in localStorage
4. Check token expiration

### Slow Performance

```
⚠️ Pages loading slowly
```

**Solution:**

1. Check database indexes
2. Monitor backend CPU/memory
3. Enable caching in Vercel
4. Optimize database queries
5. Consider upgrading plan

---

## Success Criteria

- [ ] Frontend loads in <3 seconds
- [ ] API responds in <200ms
- [ ] 99.9% uptime
- [ ] Zero security breaches
- [ ] <1% error rate
- [ ] <100MB database size
- [ ] <$50/month cost

---

## Documentation

- [ ] README updated with live URLs
- [ ] API documentation complete
- [ ] Deployment guide written
- [ ] Troubleshooting guide available
- [ ] Architecture documented
- [ ] Team knows how to deploy

---

## Final Sign-Off

- [ ] All tests passing
- [ ] All checks completed
- [ ] Team approved
- [ ] Stakeholders approved
- [ ] Ready for production

---

## Go Live!

```bash
✅ Everything checked
✅ All systems green
✅ Ready to deploy

🚀 LET'S GO LIVE!
```

---

## Post-Launch

### First 24 Hours

- [ ] Monitor continuously
- [ ] Check all features work
- [ ] Monitor performance
- [ ] Check error logs
- [ ] Gather feedback

### First Week

- [ ] Monitor analytics
- [ ] Check user behavior
- [ ] Look for bugs/issues
- [ ] Update documentation
- [ ] Plan improvements

### First Month

- [ ] Review performance metrics
- [ ] Gather user feedback
- [ ] Plan next features
- [ ] Optimize based on usage
- [ ] Plan marketing

---

## Useful Commands

### Deploy Backend

```bash
git push origin main  # Auto-deploys to Railway
```

### Deploy Frontend

```bash
cd frontend
git push origin main  # Auto-deploys to Vercel
```

### Check Backend Health

```bash
curl https://your-backend-url.up.railway.app
```

### Check Frontend

```bash
https://your-frontend-url.vercel.app
```

### View Logs

```bash
# Railway
railway logs

# Vercel Dashboard → Deployments → Select → Logs
```

---

## Emergency Contacts

- Vercel Support: https://vercel.com/support
- Railway Support: https://docs.railway.app
- MongoDB Support: https://www.mongodb.com/support
- GitHub Support: https://support.github.com

---

## Additional Resources

- [Vercel Deployment Guide](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com)
- [Next.js Production Checklist](https://nextjs.org/docs/going-to-production)
- [Express Production Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)

---

**Deployment Date**: ******\_\_\_******  
**Deployed By**: ******\_\_\_******  
**Production URL**: ******\_\_\_******  
**Notes**: ******\_\_\_******

---

**Ready to go live?** ✅ Let's deploy! 🚀
