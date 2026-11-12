import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight, FaKey } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, forgotPassword } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Forgot Password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);

  // Where to redirect after login (e.g. checkout if they came from cart)
  const from = location.state?.from?.pathname || '/profile';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errs.password = 'Password is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await login(formData.email, formData.password);
      toast.success(res.message || 'Welcome back!');
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err.message || 'Login failed. Please check your credentials.';
      setErrors((prev) => ({ ...prev, general: msg }));
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      toast.error('Please enter your registered email address');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail.trim())) {
      toast.error('Please enter a valid email address');
      return;
    }

    setForgotLoading(true);
    try {
      const res = await forgotPassword(forgotEmail);
      toast.success(res.message || 'Password reset link sent to your email!');
      setShowForgotModal(false);
      setForgotEmail('');
    } catch (err) {
      toast.error(err.message || 'Unable to process password reset.');
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .auth-container {
          min-height: calc(100vh - 160px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          background: linear-gradient(135deg, var(--cream) 0%, #fae6ec 50%, var(--pink) 100%);
        }
        .auth-card {
          width: 100%;
          max-width: 480px;
          background: var(--white);
          border-radius: var(--radius-lg);
          padding: 44px 36px;
          box-shadow: 0 15px 40px rgba(61, 26, 0, 0.12);
          border: 1px solid rgba(139, 94, 60, 0.1);
        }
        .auth-header {
          text-align: center;
          margin-bottom: 32px;
        }
        .auth-brand-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--cream);
          border: 1px solid var(--cream-dark);
          color: var(--brown);
          padding: 6px 14px;
          border-radius: 50px;
          font-size: 0.82rem;
          font-weight: 600;
          margin-bottom: 14px;
        }
        .auth-title {
          font-family: var(--font-heading);
          font-size: 2rem;
          color: var(--chocolate);
          margin-bottom: 8px;
        }
        .auth-subtitle {
          color: var(--text-light);
          font-size: 0.95rem;
        }
        .input-group-custom {
          position: relative;
          display: flex;
          align-items: center;
        }
        .input-icon-left {
          position: absolute;
          left: 16px;
          color: var(--gray-500);
          font-size: 1rem;
          pointer-events: none;
        }
        .input-with-icon {
          padding-left: 46px;
          padding-right: 46px;
        }
        .input-icon-right {
          position: absolute;
          right: 16px;
          color: var(--gray-500);
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
        }
        .input-icon-right:hover {
          color: var(--chocolate);
        }
        .forgot-link-btn {
          background: none;
          border: none;
          color: var(--brown);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
          text-decoration: underline;
        }
        .forgot-link-btn:hover {
          color: var(--chocolate);
        }
        .auth-submit-btn {
          width: 100%;
          padding: 14px;
          font-size: 1.05rem;
          border-radius: 50px;
          margin-top: 10px;
        }
        .auth-footer {
          text-align: center;
          margin-top: 26px;
          padding-top: 20px;
          border-top: 1px solid var(--cream-dark);
          font-size: 0.95rem;
          color: var(--text-light);
        }
        .auth-footer a {
          color: var(--brown);
          font-weight: 600;
          margin-left: 6px;
          text-decoration: underline;
        }
        .auth-footer a:hover {
          color: var(--chocolate);
        }
        .auth-alert-error {
          background: #ffebee;
          color: #c62828;
          border-radius: var(--radius-sm);
          padding: 12px 16px;
          margin-bottom: 20px;
          font-size: 0.9rem;
          border-left: 4px solid #c62828;
        }
        .demo-credentials-box {
          background: var(--cream);
          border: 1px dashed var(--brown);
          border-radius: var(--radius-sm);
          padding: 12px 16px;
          margin-top: 24px;
          font-size: 0.85rem;
          color: var(--chocolate);
        }
        .demo-credentials-box strong {
          display: block;
          margin-bottom: 4px;
          color: var(--brown-dark);
        }
      `}</style>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <span className="auth-brand-badge">
              <span>🎂</span> Sweet Bliss Customer Portal
            </span>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Log in to view your orders, save favorites, and track deliveries</p>
          </div>

          {errors.general && (
            <div className="auth-alert-error">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">
                Email Address <span className="required">*</span>
              </label>
              <div className="input-group-custom">
                <FaEnvelope className="input-icon-left" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  className={`form-control input-with-icon ${errors.email ? 'error' : ''}`}
                  placeholder="e.g. priya@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label htmlFor="password" style={{ margin: 0 }}>
                  Password <span className="required">*</span>
                </label>
                <button
                  type="button"
                  className="forgot-link-btn"
                  onClick={() => setShowForgotModal(true)}
                >
                  Forgot password?
                </button>
              </div>
              <div className="input-group-custom">
                <FaLock className="input-icon-left" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className={`form-control input-with-icon ${errors.password ? 'error' : ''}`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="input-icon-right"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <span className="form-error">{errors.password}</span>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary auth-submit-btn"
              disabled={submitting}
            >
              {submitting ? 'Logging in...' : (
                <>
                  Log In <FaArrowRight size={13} />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials */}
          <div className="demo-credentials-box">
            <strong>🍰 Demo Customer Credentials:</strong>
            Email: <code>priya@example.com</code> | Password: <code>User@123</code>
          </div>

          <div className="auth-footer">
            Don't have an account yet?
            <Link to="/register">Create an account</Link>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="modal-overlay" onClick={() => setShowForgotModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaKey color="var(--brown)" /> Reset Password
              </h3>
              <button
                className="modal-close-btn"
                onClick={() => setShowForgotModal(false)}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleForgotPassword}>
              <div className="modal-body">
                <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', marginBottom: '18px' }}>
                  Enter your registered email address and we'll send you instructions to reset your password.
                </p>
                <div className="form-group">
                  <label htmlFor="forgot-email">Registered Email</label>
                  <input
                    id="forgot-email"
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => setShowForgotModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  disabled={forgotLoading}
                >
                  {forgotLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
