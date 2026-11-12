# 🎂 Sweet Bliss Bakery — Custom Order Portal

A complete full-stack web application for a premium artisan bakery. Customers can browse products, build a cart, place custom cake orders, track orders, and contact the bakery. Admins have a protected dashboard to manage orders and products.

> **College FSD Mini Project** | React + Vite | Node.js + Express | MongoDB

---

## ✨ Features

### Customer Features
- 🏠 **Home Page** — Hero section, featured products, special offers, how-it-works
- 🛍️ **Menu Page** — All products with search and category filters (Cakes, Cupcakes, Cookies, Pastries, Breads)
- 🎂 **Custom Cake Order** — Full form with live price estimator (size, flavor, frosting, message, theme)
- 🛒 **Cart** — Add/remove items, quantity controls, automatic delivery charge calculation
- 💳 **Checkout** — Customer details form, order summary, Cash on Delivery/Pickup only
- ✅ **Order Confirmation** — Generated Order ID, next steps
- 📦 **Order Tracking** — Track by Order ID + phone number with visual status timeline
- 📞 **Contact Page** — Bakery info, hours, contact form

### Admin Features
- 🔐 **Protected Admin Login** — JWT authentication
- 📊 **Dashboard** — Stats (total orders, pending, products, messages) + recent orders
- 📦 **Order Management** — View all orders, update status (Pending → Confirmed → Preparing → Ready → Completed)
- 🎂 **Product Management** — Add, edit, delete products; toggle availability and featured status
- ✉️ **Contact Messages** — View all customer inquiries

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router v6 |
| Styling | Vanilla CSS (custom design system) |
| HTTP Client | Axios |
| UI Utilities | react-hot-toast, react-icons |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose ODM) |
| Auth | JWT + bcryptjs |
| Validation | express-validator |
| ID Generation | nanoid v3 |

---

## 📋 Prerequisites

- **Node.js** v16 or higher → [Download](https://nodejs.org/)
- **MongoDB** running locally → [Download](https://www.mongodb.com/try/download/community) OR use [MongoDB Atlas](https://www.mongodb.com/atlas) (free cloud)
- **Git** (optional, for version control)

---

## 🚀 Quick Start (Local Development)

### 1. Clone or Download

```bash
git clone https://github.com/yourusername/bakery-portal.git
cd bakery-portal
# OR if you already have the files:
cd bakery
```

### 2. Set Up Backend

```bash
cd backend

# Copy the example env file and fill in your values
copy .env.example .env
# On Mac/Linux: cp .env.example .env

# Install dependencies
npm install
```

Edit `backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/bakery
JWT_SECRET=replace_with_a_long_random_string_at_least_32_chars
FRONTEND_URL=http://localhost:5173
ADMIN_SEED_USERNAME=admin
ADMIN_SEED_EMAIL=admin@sweetbliss.com
ADMIN_SEED_PASSWORD=Admin@123
```

### 3. Seed the Database

```bash
# From the backend/ directory:
npm run seed
```

This creates:
- 16 demo products across 5 categories
- 1 admin account with credentials from your `.env`

**Admin credentials (defaults):**
- Email: `admin@sweetbliss.com`
- Password: `Admin@123`

> ⚠️ **Change these immediately in your `.env` and re-run seed before deploying!**

### 4. Start the Backend

```bash
# From backend/ directory:
npm run dev       # development (with auto-restart)
# OR
npm start         # production
```

Backend will run at: **http://localhost:5000**  
Health check: **http://localhost:5000/api/health**

### 5. Set Up Frontend

```bash
cd ../frontend

# Copy env file
copy .env.example .env
# On Mac/Linux: cp .env.example .env

# Install dependencies
npm install
```

Edit `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 6. Start the Frontend

```bash
# From frontend/ directory:
npm run dev
```

Frontend will run at: **http://localhost:5173**

---

## 👤 Creating the First Admin Account

The seed script creates the first admin. To customize:

1. Edit `backend/.env`:
```env
ADMIN_SEED_USERNAME=myadmin
ADMIN_SEED_EMAIL=me@mybakery.com
ADMIN_SEED_PASSWORD=MySecurePass@2024
```

2. Run the seed:
```bash
cd backend && npm run seed
```

3. Login at: **http://localhost:5173/admin/login**

> **Security Note:** The seed script wipes existing products. In production, use a one-time script or direct MongoDB insertion to avoid data loss.

---

## 📡 API Endpoints

### Public & Customer Endpoints
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/products` | List products (`?category=&search=&featured=true&sort=`) |
| GET | `/api/products/:id` | Single product details |
| POST | `/api/auth/register` | Register new customer account |
| POST | `/api/auth/login` | Customer & Admin login (JWT token) |
| POST | `/api/auth/forgot-password` | Request password reset instructions |
| GET | `/api/auth/profile` | Customer profile (JWT Required) |
| PUT | `/api/auth/profile` | Update profile information (JWT Required) |
| POST | `/api/orders` | Place regular order |
| POST | `/api/orders/custom` | Place custom cake order |
| GET | `/api/orders/track` | Track order (`?orderId=&phone=`) |
| POST | `/api/contact` | Submit contact message |

### Admin Endpoints (JWT Required)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/admin/stats` | Dashboard stats |
| GET | `/api/admin/orders` | All orders (paginated) |
| GET | `/api/admin/orders/:id` | Order details |
| PATCH | `/api/admin/orders/:id/status` | Update order status |
| GET | `/api/admin/products` | All products (admin view) |
| POST | `/api/admin/products` | Add product |
| PUT | `/api/admin/products/:id` | Edit product |
| DELETE | `/api/admin/products/:id` | Delete product |
| GET | `/api/admin/contacts` | Contact messages |

---

## 💰 Custom Cake Pricing (Server-Calculated)

| Size | Base Price |
|---|---|
| 6-inch | ₹500 |
| 8-inch | ₹800 |
| 10-inch | ₹1,200 |
| 12-inch | ₹1,800 |

**Premiums:**
- Red Velvet / Black Forest / Hazelnut flavor: **+₹100**
- Fondant / Cream Cheese frosting: **+₹100**
- Message on cake: **+₹50**
- Multiply by quantity

> Prices are **always recalculated on the server**. Client-submitted totals are never trusted.

---

## 🚢 Deployment

### Option A: Render (Backend) + Vercel (Frontend) + MongoDB Atlas (Database)
All free tiers available.

#### Step 1: Set Up MongoDB Atlas
1. Sign up at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a free M0 cluster
3. Create a database user with a strong password
4. Whitelist IP `0.0.0.0/0` (or your server IP)
5. Get your connection string: `mongodb+srv://<user>:<pass>@cluster.mongodb.net/bakery`

#### Step 2: Deploy Backend to Render
1. Push code to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo, select `backend/` as root directory
4. Set **Build Command**: `npm install`
5. Set **Start Command**: `npm start`
6. Add **Environment Variables**:
   ```
   PORT=10000
   MONGO_URI=<your Atlas connection string>
   JWT_SECRET=<generate a 64-char random string>
   FRONTEND_URL=https://your-app.vercel.app
   NODE_ENV=production
   ```
7. Deploy → note your backend URL (e.g., `https://bakery-api.onrender.com`)

#### Step 3: Deploy Frontend to Vercel
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repo
3. Set **Root Directory**: `frontend`
4. Set **Build Command**: `npm run build`
5. Set **Output Directory**: `dist`
6. Add **Environment Variable**:
   ```
   VITE_API_URL=https://bakery-api.onrender.com/api
   ```
7. Deploy!

#### Step 4: Seed Production Database
```bash
# From your local machine with MONGO_URI set to Atlas:
cd backend
MONGO_URI="mongodb+srv://..." npm run seed
```

---

## 📁 Project Structure

```
bakery/
├── .gitignore
├── README.md
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── api/
│       │   └── axios.js
│       ├── context/
│       │   ├── CartContext.jsx
│       │   └── AuthContext.jsx
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   ├── ProductCard.jsx
│       │   ├── LoadingSpinner.jsx
│       │   ├── StatusTimeline.jsx
│       │   └── AdminLayout.jsx
│       └── pages/
│           ├── Home.jsx
│           ├── Menu.jsx
│           ├── CustomOrder.jsx
│           ├── Cart.jsx
│           ├── Checkout.jsx
│           ├── OrderConfirmation.jsx
│           ├── OrderTracking.jsx
│           ├── Contact.jsx
│           └── admin/
│               ├── AdminLogin.jsx
│               ├── AdminDashboard.jsx
│               ├── AdminOrders.jsx
│               └── AdminProducts.jsx
└── backend/
    ├── server.js
    ├── package.json
    ├── .env.example
    ├── models/
    │   ├── Product.js
    │   ├── Order.js
    │   ├── AdminUser.js
    │   └── ContactMessage.js
    ├── routes/
    │   ├── productRoutes.js
    │   ├── orderRoutes.js
    │   ├── authRoutes.js
    │   ├── adminRoutes.js
    │   └── contactRoutes.js
    ├── middleware/
    │   └── authMiddleware.js
    └── seed/
        └── seed.js
```

---

## 🔒 Security Notes

- **Never commit `.env` files** — they're in `.gitignore`
- **Change default admin password** before any real use
- **JWT_SECRET** must be a long random string in production (use: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`)
- **CORS** is restricted to your frontend URL only
- **Prices are server-calculated** — the backend fetches prices from MongoDB, never trusting client submissions
- All inputs are validated with `express-validator` on the backend

---

## 📝 Payment

This application uses **Cash on Delivery / Pickup only**. No payment gateway is integrated. Orders are confirmed by the bakery via phone within 2 hours of placing the order.

---

## 🤝 Credits

Built with ❤️ as a college Full Stack Development mini project.

**Technologies:** React, Vite, Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, nanoid
