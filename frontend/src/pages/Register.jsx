import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash, FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errs = {};

    if (!formData.name.trim()) {
      errs.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.trim().replace(/\D/g, ''))) {
      errs.phone = 'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210)';
    }

    if (!formData.password) {
      errs.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters long';
    }

    if (!formData.confirmPassword) {
      errs.confirmPassword = 'Confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please resolve the errors in the form.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim().replace(/\D/g, ''),
        address: formData.address.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });

      toast.success(res.message || 'Registration successful!');
      navigate('/profile', { replace: true });
    } catch (err) {
      const msg = err.message || 'Registration failed. Please try again.';
      setErrors((prev) => ({ ...prev, general: msg }));
      toast.error(msg);
    } finally {
      setSubmitting(false);
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
          max-width: 520px;
          background: var(--white);
          border-radius: var(--radius-lg);
          padding: 44px 36px;
          box-shadow: 0 15px 40px rgba(61, 26, 0, 0.12);
          border: 1px solid rgba(139, 94, 60, 0.1);
        }
        .auth-header {
          text-align: center;
          margin-bottom: 28px;
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
          margin-bottom: 12px;
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
      `}</style>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <span className="auth-brand-badge">
              <span>🎂</span> Join Sweet Bliss Bakery
            </span>
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Sign up for faster checkout, order tracking, and exclusive bakery perks</p>
          </div>

          {errors.general && (
            <div className="auth-alert-error">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="name">
                Full Name <span className="required">*</span>
              </label>
              <div className="input-group-custom">
                <FaUser className="input-icon-left" />
                <input
                  id="name"
                  type="text"
                  name="name"
                  className={`form-control input-with-icon ${errors.name ? 'error' : ''}`}
                  placeholder="e.g. Priya Sharma"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="reg-email">
                Email Address <span className="required">*</span>
              </label>
              <div className="input-group-custom">
                <FaEnvelope className="input-icon-left" />
                <input
                  id="reg-email"
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

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone">
                Phone Number <span className="required">*</span>
              </label>
              <div className="input-group-custom">
                <FaPhone className="input-icon-left" />
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  className={`form-control input-with-icon ${errors.phone ? 'error' : ''}`}
                  placeholder="10-digit mobile number (e.g. 9876543210)"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  required
                />
              </div>
              {errors.phone && <span className="form-error">{errors.phone}</span>}
            </div>

            {/* Address (Optional) */}
            <div className="form-group">
              <label htmlFor="address">Delivery Address (Optional)</label>
              <div className="input-group-custom">
                <FaMapMarkerAlt className="input-icon-left" />
                <input
                  id="address"
                  type="text"
                  name="address"
                  className="form-control input-with-icon"
                  placeholder="House/Flat No, Street, City, Pincode"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="reg-password">
                Password <span className="required">*</span>
              </label>
              <div className="input-group-custom">
                <FaLock className="input-icon-left" />
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className={`form-control input-with-icon ${errors.password ? 'error' : ''}`}
                  placeholder="At least 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
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

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="confirmPassword">
                Confirm Password <span className="required">*</span>
              </label>
              <div className="input-group-custom">
                <FaLock className="input-icon-left" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  className={`form-control input-with-icon ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className="input-icon-right"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary auth-submit-btn"
              disabled={submitting}
            >
              {submitting ? 'Creating Account...' : (
                <>
                  Create Account <FaArrowRight size={13} />
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            Already have an account?
            <Link to="/login">Log in here</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
