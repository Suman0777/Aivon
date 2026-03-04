# 🎯 Complete Routing & Authentication Flow

## Page Flow Overview

```
User Opens App
       ↓
   [Homepage] - Public route, anyone can access
       ↓
   { User can click "Login" button }
       ↓
   [Login/Signup Page] - Public route, anyone can access
       ├─ Sign Up → Create account → Auto login
       └─ Login → Enter credentials → Navigate to Dashboard
       ↓
   [Dashboard] - Protected route, only authenticated users
       ↓
   { User can click "Logout" button }
       ↓
   Back to [Homepage]
```

## How It Works

### 1. **Authentication Context** (`src/context/AuthContext.jsx`)
- Manages global authentication state
- Persists token in localStorage
- Provides `login()` and `logout()` functions
- Provides `isAuth` and `loading` states

### 2. **Protected Routes** (`Componet/ProtectedRoute.jsx`)
- Checks if user is authenticated
- Redirects to login if not authenticated
- Shows loading state while checking

### 3. **Routes Setup** (`src/App.jsx`)
```
/ → Homepage (Public)
/login → LoginPage (Public)
/dashboard → ProtectedRoute → Dashboard (Protected)
```

### 4. **Login Flow**
- User fills login form
- Clicks "Login" button
- Makes POST request to `/api/v1/user/signin`
- Receives JWT token from backend
- Calls `login(token)` from AuthContext
- Token is saved to localStorage
- `isAuth` state becomes `true`
- Component triggers re-render
- Uses `navigate("/dashboard")` to go to dashboard
- ProtectedRoute allows access because `isAuth = true`

### 5. **Signup Flow**
- User fills signup form
- Clicks "Create" button
- Makes POST request to `/api/v1/user/signup`
- Receives JWT token from backend
- Calls `login(token)` from AuthContext
- Switches to login card automatically
- User can now login with new credentials

## 🧪 Testing the Complete Flow

### Step 1: Start Backend
```bash
cd Backend
npm run dev
```
✅ Should see: "Server is Live on 5420"

### Step 2: Start Frontend
```bash
cd Frontend/Aivon_Fr
npm run dev
```
✅ Should see: "Local: http://localhost:5173"

### Step 3: Open in Browser
```
http://localhost:5173
```

### Step 4: Test the Flow

**A. Test Sign Up:**
1. You should see the Homepage with Navbar
2. Click "Sign Up" button (or navigate to `/login`)
3. See the Signup form
4. Fill in: Name, Email, Password
5. Click "Create"
6. ✅ Should show "Account created successfully!"
7. Auto-switches to Login form
8. Can see the token in browser DevTools → Application → localStorage

**B. Test Login:**
1. Fill in Email and Password (same as signup)
2. Click "Login"
3. ✅ Should show "Login successful!"
4. ✅ Should automatically navigate to `/dashboard`
5. ✅ Should see Dashboard with list of registered users

**C. Test Protected Route:**
1. Open DevTools → Application → localStorage
2. Delete the `token` key manually
3. Refresh page or navigate to `/dashboard`
4. ✅ Should redirect to `/login` automatically

**D. Test Logout:**
1. Click "Logout" button on Dashboard
2. ✅ Should navigate back to Homepage
3. ✅ Should NOT be able to access `/dashboard` anymore

## 📁 Files Created/Modified

```
✅ src/context/AuthContext.jsx          (NEW - Auth state management)
✅ Componet/ProtectedRoute.jsx          (UPDATED - Uses AuthContext)
✅ src/App.jsx                          (UPDATED - Dynamic routes)
✅ src/main.jsx                         (UPDATED - Added AuthProvider)
✅ pages/LoginPage.jsx                  (UPDATED - Uses AuthContext, useNavigate)
✅ pages/Dashboard.jsx                  (COMPLETELY REWRITTEN - Full dashboard UI)
✅ Componet/apiUtils.js                 (UPDATED - Added Api import)
```

## 🔑 Key Components

### AuthContext Hook
```javascript
const { isAuth, loading, login, logout } = useAuth()

// Use login() after successful authentication
login(token)

// Use logout() to clear authentication
logout()
```

### Protected Route Usage
```javascript
<Route path='/dashboard' 
  element={<ProtectedRoute element={<Dashboard />} />} 
/>
```

## 🐛 Troubleshooting

### Issue: After login, dashboard not showing
**Solution:**
- Check browser console for errors
- Ensure Backend is running on port 5420
- Check localStorage has token (DevTools → Application → localStorage)
- Restart frontend dev server (`npm run dev`)

### Issue: Can access dashboard without login
**Solution:**
- Clear localStorage completely
- Reload page
- Try accessing `/dashboard` again
- Should redirect to login

### Issue: Logout not working
**Solution:**
- Check Console for errors
- Ensure `useAuth()` hook is being called in component
- Verify AuthProvider wraps entire app in main.jsx

### Issue: Infinite loading state
**Solution:**
- Check Backend is running and responding
- Check Network tab in DevTools for failed requests
- Verify VITE_API_URL in .env.local is correct

## 📡 API Calls Flow

```
Frontend (React)
     ↓
Axios Instance (Api.jsx)
     ↓
Interceptor (adds Bearer token)
     ↓
Backend (Express)
     ↓
Auth Middleware (validates token)
     ↓
Route Handler (returns data)
     ↓
Response back to Frontend
     ↓
Component updates with data
```

## ✨ Features Included

✅ Automatic token injection to all requests
✅ Auto-logout on 401 responses
✅ Protected routes with redirect
✅ Persistent authentication (token survives page refresh)
✅ Clean logout functionality
✅ Loading states during authentication
✅ Error messages for auth failures
✅ User list display on dashboard
✅ Responsive UI with Tailwind CSS

## 🚀 Next Steps (Optional)

1. Add "Remember Me" functionality
2. Implement password reset
3. Add email verification
4. Implement refresh tokens
5. Add role-based access control (Admin, User, etc.)
6. Add user profile page
7. Add password hashing on backend (bcrypt)
8. Add rate limiting to prevent brute force

---

**Status**: ✅ Complete routing and authentication system ready!
