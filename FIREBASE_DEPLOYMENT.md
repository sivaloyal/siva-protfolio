# Firebase Deployment Guide - Siva Petla Portfolio

## ✅ What's Been Done
- Production build created ✓
- Firebase configuration files added ✓
- Project name set to: `siva-petla-portfolio` ✓

## 🚀 Next Steps to Deploy

### Step 1: Log in to Firebase
```bash
firebase login
```
This will open your browser to authenticate with Google.

### Step 2: Create Firebase Project (if you don't have one)
Go to https://console.firebase.google.com and:
1. Click "Create a new project"
2. Enter project name: `siva-petla-portfolio`
3. Follow the setup wizard
4. Enable Firebase Hosting

### Step 3: Update Project ID
After creating the Firebase project, update `.firebaserc`:
```json
{
  "projects": {
    "default": "YOUR-PROJECT-ID"
  }
}
```

### Step 4: Deploy
```bash
firebase deploy
```

## 📱 What Gets Deployed
- Your complete portfolio with all features
- Password-protected admin section
- Image gallery system
- All animations and styling

## 🔗 Your Portfolio URL
After deployment, you can access it at:
```
https://siva-petla-portfolio.web.app
```

## 🔄 Update & Redeploy
To update your portfolio in the future:
1. Make changes to your code
2. Run: `npm run build`
3. Run: `firebase deploy`

---
Need help? Contact Firebase support at https://firebase.google.com/support
