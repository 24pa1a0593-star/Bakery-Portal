import React from 'react';
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import AllProducts from './pages/AllProducts';
import Categories from './pages/Categories';
import About from './pages/About';
import Contact from './pages/Contact';
import CustomOrder from './pages/CustomOrder';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderTracking from './pages/OrderTracking';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrders from './pages/admin/AdminOrders';
import AdminProducts from './pages/admin/AdminProducts';
import AdminContacts from './pages/admin/AdminContacts';

// Non-admin layout with Navbar and Footer
const PublicLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: '1 0 auto' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

// ProtectedRoute for Customer Profile / Account
const ProtectedUserRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children ? children : <Outlet />;
};

// ProtectedRoute for Admin Dashboard
const ProtectedAdminRoute = ({ children }) => {
  const { isAdmin, adminToken } = useAuth();
  if (!isAdmin && !adminToken) {
    return <Navigate to="/admin/login" replace />;
  }
  return children ? children : <Outlet />;
};

function App() {
  return (
    <Routes>
      {/* Public Pages with Navbar & Footer */}
      <Route element={<PublicLayout />}>
        {/* Core Navigation */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Customer Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <ProtectedUserRoute>
              <Profile />
            </ProtectedUserRoute>
          }
        />

        {/* Orders & Cart */}
        <Route path="/custom-order" element={<CustomOrder />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
        <Route path="/track-order" element={<OrderTracking />} />
      </Route>

      {/* Admin Login (no public Navbar / Footer) */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin Protected Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <ProtectedAdminRoute>
            <AdminOrders />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <ProtectedAdminRoute>
            <AdminProducts />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/contacts"
        element={
          <ProtectedAdminRoute>
            <AdminContacts />
          </ProtectedAdminRoute>
        }
      />

      {/* Fallback to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
