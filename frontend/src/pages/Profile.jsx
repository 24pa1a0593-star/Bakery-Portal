import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSignOutAlt, FaShoppingBag, FaBirthdayCake, FaEdit, FaCheck } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Name cannot be empty');
      return;
    }

    setSubmitting(true);
    try {
      await updateProfile(formData);
      toast.success('Profile details updated successfully!');
      setIsEditing(false);
    } catch (err) {
      toast.error(err.message || 'Failed to update profile');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        .profile-page-wrapper {
          padding: 60px 0 80px;
          background: linear-gradient(180deg, var(--cream) 0%, #fae6ec 100%);
          min-height: calc(100vh - 160px);
        }
        .profile-layout {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 32px;
          align-items: start;
        }
        .profile-card {
          background: var(--white);
          border-radius: var(--radius-lg);
          padding: 32px 28px;
          box-shadow: 0 10px 30px rgba(61, 26, 0, 0.08);
          border: 1px solid rgba(139, 94, 60, 0.1);
        }
        .profile-avatar-circle {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--gold), var(--brown));
          color: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.4rem;
          margin: 0 auto 16px;
          box-shadow: 0 6px 18px rgba(139, 94, 60, 0.25);
        }
        .profile-user-name {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          color: var(--chocolate);
          text-align: center;
          margin-bottom: 4px;
        }
        .profile-user-email {
          color: var(--text-light);
          text-align: center;
          font-size: 0.92rem;
          margin-bottom: 24px;
        }
        .profile-nav-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 18px;
          border-radius: var(--radius-sm);
          font-weight: 600;
          font-size: 0.95rem;
          background: var(--cream);
          color: var(--chocolate);
          margin-bottom: 12px;
          transition: var(--transition);
          border: 1px solid var(--cream-dark);
          text-decoration: none;
        }
        .profile-nav-btn:hover {
          background: var(--pink);
          color: var(--chocolate);
          transform: translateX(4px);
        }
        .profile-nav-btn.logout-btn {
          background: #ffebee;
          color: #c62828;
          border-color: #ffcdd2;
          margin-top: 18px;
          cursor: pointer;
          border: none;
        }
        .profile-nav-btn.logout-btn:hover {
          background: #ffcdd2;
          transform: none;
        }
        .profile-content-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 18px;
          border-bottom: 1px solid var(--cream-dark);
          margin-bottom: 24px;
        }
        .profile-content-title {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          color: var(--chocolate);
        }
        .profile-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .profile-info-item {
          background: var(--cream);
          padding: 16px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--cream-dark);
        }
        .profile-info-label {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--brown);
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 6px;
        }
        .profile-info-val {
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--chocolate);
        }
        @media (max-width: 868px) {
          .profile-layout {
            grid-template-columns: 1fr;
          }
          .profile-info-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="profile-page-wrapper">
        <div className="container">
          <div className="profile-layout">
            {/* Sidebar Card */}
            <div className="profile-card">
              <div className="profile-avatar-circle">
                🧁
              </div>
              <h2 className="profile-user-name">{user?.name || 'Valued Customer'}</h2>
              <p className="profile-user-email">{user?.email}</p>

              <Link to="/menu" className="profile-nav-btn">
                <FaShoppingBag color="var(--brown)" />
                <span>Browse Bakery Menu</span>
              </Link>

              <Link to="/custom-order" className="profile-nav-btn">
                <FaBirthdayCake color="var(--brown)" />
                <span>Order Custom Cake</span>
              </Link>

              <Link to="/track-order" className="profile-nav-btn">
                <FaMapMarkerAlt color="var(--brown)" />
                <span>Track Your Orders</span>
              </Link>

              <button
                type="button"
                className="profile-nav-btn logout-btn"
                onClick={handleLogout}
              >
                <FaSignOutAlt />
                <span>Sign Out</span>
              </button>
            </div>

            {/* Main Info Card */}
            <div className="profile-card">
              <div className="profile-content-header">
                <div>
                  <h3 className="profile-content-title">Customer Profile</h3>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
                    Manage your contact information and delivery preferences
                  </p>
                </div>
                {!isEditing ? (
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => setIsEditing(true)}
                  >
                    <FaEdit size={12} /> Edit Details
                  </button>
                ) : (
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                )}
              </div>

              {!isEditing ? (
                <div className="profile-info-grid">
                  <div className="profile-info-item">
                    <span className="profile-info-label">
                      <FaUser /> Full Name
                    </span>
                    <span className="profile-info-val">{user?.name || 'Not provided'}</span>
                  </div>

                  <div className="profile-info-item">
                    <span className="profile-info-label">
                      <FaEnvelope /> Email Address
                    </span>
                    <span className="profile-info-val">{user?.email || 'Not provided'}</span>
                  </div>

                  <div className="profile-info-item">
                    <span className="profile-info-label">
                      <FaPhone /> Phone Number
                    </span>
                    <span className="profile-info-val">{user?.phone || 'Not provided'}</span>
                  </div>

                  <div className="profile-info-item">
                    <span className="profile-info-label">
                      <FaMapMarkerAlt /> Delivery Address
                    </span>
                    <span className="profile-info-val">
                      {user?.address || 'No default delivery address saved yet'}
                    </span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSave}>
                  <div className="form-group">
                    <label htmlFor="prof-name">Full Name</label>
                    <input
                      id="prof-name"
                      type="text"
                      className="form-control"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="prof-phone">Phone Number</label>
                    <input
                      id="prof-phone"
                      type="tel"
                      className="form-control"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="prof-address">Default Delivery Address</label>
                    <textarea
                      id="prof-address"
                      className="form-control"
                      rows={3}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Enter your street address, city, pincode"
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={submitting}
                    >
                      <FaCheck size={12} /> {submitting ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
