import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes, FaUserShield, FaUser, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getItemCount } = useCart();
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const itemCount = getItemCount();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Close mobile drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    closeMenu();
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <>
      <style>{`
        .navbar-wrapper {
          position: sticky;
          top: 0;
          background: var(--white);
          box-shadow: 0 2px 10px rgba(61, 26, 0, 0.08);
          z-index: 1000;
          transition: var(--transition);
        }
        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
          gap: 16px;
        }
        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .brand-emoji {
          font-size: 2rem;
          line-height: 1;
        }
        .brand-text {
          font-family: var(--font-heading);
          font-size: 1.55rem;
          font-weight: 700;
          color: var(--chocolate);
          letter-spacing: -0.5px;
          white-space: nowrap;
        }
        .navbar-links {
          display: flex;
          align-items: center;
          gap: 20px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .nav-item-link {
          font-family: var(--font-body);
          font-weight: 500;
          font-size: 0.95rem;
          color: var(--text);
          text-decoration: none;
          position: relative;
          padding: 6px 0;
          transition: color 0.2s ease;
          white-space: nowrap;
        }
        .nav-item-link:hover {
          color: var(--brown);
        }
        .nav-item-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--brown);
          transition: width 0.25s ease;
        }
        .nav-item-link:hover::after,
        .nav-item-link.active::after {
          width: 100%;
        }
        .nav-item-link.active {
          color: var(--brown);
          font-weight: 600;
        }
        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }
        .user-nav-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: 50px;
          font-size: 0.88rem;
          font-weight: 600;
          text-decoration: none;
          transition: var(--transition);
        }
        .user-nav-btn.login-btn {
          background: var(--cream);
          color: var(--chocolate);
          border: 1.5px solid var(--cream-dark);
        }
        .user-nav-btn.login-btn:hover {
          background: var(--pink);
          color: var(--chocolate);
        }
        .user-nav-btn.profile-btn {
          background: var(--cream);
          color: var(--brown);
          border: 1.5px solid var(--brown);
        }
        .user-nav-btn.profile-btn:hover {
          background: var(--brown);
          color: var(--white);
        }
        .cart-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--cream);
          color: var(--brown);
          transition: var(--transition);
          text-decoration: none;
        }
        .cart-btn:hover {
          background: var(--cream-dark);
          color: var(--chocolate);
          transform: translateY(-2px);
        }
        .cart-badge {
          position: absolute;
          top: -2px;
          right: -4px;
          background: #e53935;
          color: #ffffff;
          font-size: 0.72rem;
          font-weight: 700;
          min-width: 20px;
          height: 20px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 4px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        .admin-link-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: var(--cream-dark);
          color: var(--chocolate);
          font-size: 0.82rem;
          font-weight: 600;
          border-radius: 50px;
          transition: var(--transition);
          text-decoration: none;
        }
        .admin-link-pill:hover {
          background: var(--pink);
          color: var(--chocolate);
        }
        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          font-size: 1.5rem;
          color: var(--chocolate);
          cursor: pointer;
          padding: 6px;
          border-radius: 4px;
          line-height: 1;
        }
        .mobile-backdrop {
          display: none;
        }

        /* Mobile Breakpoint */
        @media (max-width: 992px) {
          .mobile-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .desktop-only-user {
            display: none !important;
          }
          .mobile-backdrop {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(44, 26, 14, 0.5);
            backdrop-filter: blur(2px);
            z-index: 998;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
          }
          .mobile-backdrop.open {
            opacity: 1;
            pointer-events: auto;
          }
          .navbar-links {
            position: fixed;
            top: 80px;
            left: 0;
            width: 100%;
            background: var(--white);
            flex-direction: column;
            padding: 24px 20px 32px;
            gap: 14px;
            box-shadow: 0 12px 30px rgba(61,26,0,0.15);
            transform: translateY(-160%);
            transition: transform 0.35s ease-in-out;
            border-bottom: 3px solid var(--cream-dark);
            z-index: 999;
            max-height: calc(100vh - 80px);
            overflow-y: auto;
          }
          .navbar-links.open {
            transform: translateY(0);
          }
          .navbar-links li {
            width: 100%;
            text-align: center;
          }
          .nav-item-link {
            font-size: 1.1rem;
            display: block;
            padding: 10px 0;
            border-radius: var(--radius-sm);
          }
          .nav-item-link:hover,
          .nav-item-link.active {
            background: var(--cream);
          }
          .mobile-auth-row {
            display: flex !important;
            flex-direction: column;
            gap: 10px;
            width: 100%;
            margin-top: 10px;
            padding-top: 16px;
            border-top: 1px solid var(--cream-dark);
          }
          .mobile-auth-row .user-nav-btn {
            justify-content: center;
            padding: 12px;
            font-size: 1rem;
          }
        }
        @media (min-width: 993px) {
          .mobile-auth-row {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .brand-text {
            font-size: 1.25rem;
          }
          .brand-emoji {
            font-size: 1.7rem;
          }
        }
      `}</style>

      <header className="navbar-wrapper">
        <div className="container navbar-container">
          {/* Logo / Brand */}
          <Link to="/" className="navbar-brand" onClick={closeMenu}>
            <span className="brand-emoji">🎂</span>
            <span className="brand-text">Sweet Bliss Bakery</span>
          </Link>

          {/* Desktop & Mobile Navigation Links */}
          <nav role="navigation" aria-label="Main Navigation">
            <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
              {/* 1. Home */}
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
                  onClick={closeMenu}
                  end
                >
                  Home
                </NavLink>
              </li>

              {/* 2. Menu */}
              <li>
                <NavLink
                  to="/menu"
                  className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Menu
                </NavLink>
              </li>

              {/* 3. All Products */}
              <li>
                <NavLink
                  to="/products"
                  className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  All Products
                </NavLink>
              </li>

              {/* 4. Categories */}
              <li>
                <NavLink
                  to="/categories"
                  className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Categories
                </NavLink>
              </li>

              {/* 5. About Us */}
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  About Us
                </NavLink>
              </li>

              {/* 6. Contact */}
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Contact
                </NavLink>
              </li>

              {/* Mobile Only: Login / Profile / Sign Out in Drawer */}
              <li className="mobile-auth-row">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      className="user-nav-btn profile-btn"
                      onClick={closeMenu}
                    >
                      <FaUser />
                      <span>My Profile ({user?.name ? user.name.split(' ')[0] : 'Account'})</span>
                    </Link>
                    <button
                      type="button"
                      className="user-nav-btn"
                      style={{ background: '#ffebee', color: '#c62828', border: 'none', cursor: 'pointer' }}
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="user-nav-btn login-btn"
                      onClick={closeMenu}
                    >
                      <FaSignInAlt />
                      <span>Login</span>
                    </Link>
                    <Link
                      to="/register"
                      className="user-nav-btn profile-btn"
                      onClick={closeMenu}
                    >
                      <FaUser />
                      <span>Register</span>
                    </Link>
                  </>
                )}

                <Link
                  to="/cart"
                  className="user-nav-btn"
                  style={{ background: 'var(--cream)', color: 'var(--brown)', border: '1px solid var(--cream-dark)' }}
                  onClick={closeMenu}
                >
                  <FaShoppingCart />
                  <span>Shopping Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Actions: Desktop User/Login, Admin Badge, Cart, Mobile Toggle */}
          <div className="navbar-actions">
            {isAdmin && (
              <Link to="/admin" className="admin-link-pill" title="Go to Admin Portal">
                <FaUserShield />
                <span>Admin</span>
              </Link>
            )}

            {/* Desktop User Login / Profile button */}
            <div className="desktop-only-user">
              {isAuthenticated ? (
                <Link
                  to="/profile"
                  className="user-nav-btn profile-btn"
                  title="View your customer profile"
                >
                  <FaUser />
                  <span>{user?.name ? user.name.split(' ')[0] : 'Profile'}</span>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="user-nav-btn login-btn"
                  title="Sign in to your account"
                >
                  <FaSignInAlt />
                  <span>Login</span>
                </Link>
              )}
            </div>

            {/* Cart Button */}
            <Link to="/cart" className="cart-btn" aria-label={`Shopping Cart with ${itemCount} items`}>
              <FaShoppingCart size={18} />
              {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              className="mobile-toggle"
              onClick={toggleMenu}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop for mobile menu */}
      <div
        className={`mobile-backdrop ${isOpen ? 'open' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />
    </>
  );
};

export default Navbar;
