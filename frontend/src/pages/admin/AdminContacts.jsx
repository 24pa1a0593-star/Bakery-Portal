import React, { useState, useEffect, useCallback } from 'react';
import { FaEnvelope, FaRedo, FaUser, FaPhoneAlt, FaClock, FaCheckCircle } from 'react-icons/fa';
import AdminLayout from '../../components/AdminLayout';
import LoadingSpinner from '../../components/LoadingSpinner';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get('/admin/contacts');
      const list = res.data.data || res.data.contacts || [];
      setContacts(list);
    } catch (err) {
      console.error('Failed to load contacts:', err);
      setError('Failed to fetch contact inquiries.');
      toast.error('Could not load messages.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return (
    <AdminLayout title="Customer Inquiries">
      <style>{`
        .contacts-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .contacts-count {
          font-weight: 600;
          color: var(--chocolate);
          font-size: 1.1rem;
        }
        .refresh-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--white);
          border: 1px solid var(--gray-300);
          padding: 8px 16px;
          border-radius: var(--radius-sm);
          font-weight: 600;
          color: var(--chocolate);
          cursor: pointer;
          transition: var(--transition);
        }
        .refresh-btn:hover {
          background: var(--cream);
          border-color: var(--brown);
        }
        .contacts-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 20px;
        }
        .contact-item-card {
          background: var(--white);
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          border-top: 4px solid var(--gold);
          transition: var(--transition);
        }
        .contact-item-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-hover);
        }
        .contact-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .contact-name {
          font-family: var(--font-heading);
          color: var(--chocolate);
          font-size: 1.15rem;
          margin: 0;
        }
        .contact-date {
          font-size: 0.78rem;
          color: var(--text-light);
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .contact-meta {
          font-size: 0.85rem;
          color: var(--text-light);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .contact-meta-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .contact-subject {
          font-weight: 600;
          color: var(--brown);
          font-size: 0.95rem;
          margin-top: 4px;
        }
        .contact-body {
          font-size: 0.9rem;
          color: var(--text);
          line-height: 1.5;
          background: var(--cream);
          padding: 12px;
          border-radius: var(--radius-sm);
          border-left: 3px solid var(--brown);
          white-space: pre-wrap;
          word-break: break-word;
        }
        .contact-empty {
          text-align: center;
          padding: 60px 20px;
          background: var(--white);
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          color: var(--text-light);
        }
        .contact-empty-icon {
          font-size: 3rem;
          color: var(--gold);
          margin-bottom: 12px;
        }
      `}</style>

      <div className="contacts-toolbar">
        <div className="contacts-count">
          Total Inquiries: {contacts.length}
        </div>
        <button className="refresh-btn" onClick={fetchContacts}>
          <FaRedo /> Refresh
        </button>
      </div>

      {loading ? (
        <LoadingSpinner message="Loading inquiries..." />
      ) : error ? (
        <div className="admin-error-box">
          <p>{error}</p>
          <button className="btn btn-primary" onClick={fetchContacts}>Retry</button>
        </div>
      ) : contacts.length === 0 ? (
        <div className="contact-empty">
          <div className="contact-empty-icon">📬</div>
          <h3>No customer messages yet</h3>
          <p>When customers send questions through the Contact Us form, they will appear right here.</p>
        </div>
      ) : (
        <div className="contacts-card-grid">
          {contacts.map((c) => (
            <div key={c._id || c.id || Math.random()} className="contact-item-card">
              <div className="contact-header">
                <h3 className="contact-name">{c.name}</h3>
                <span className="contact-date">
                  <FaClock /> {new Date(c.createdAt || Date.now()).toLocaleDateString('en-IN', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>

              <div className="contact-meta">
                <div className="contact-meta-row">
                  <FaEnvelope size={12} color="var(--brown)" />
                  <a href={`mailto:${c.email}`} style={{ color: 'var(--brown)', textDecoration: 'underline' }}>
                    {c.email}
                  </a>
                </div>
                {c.phone && (
                  <div className="contact-meta-row">
                    <FaPhoneAlt size={12} color="var(--brown)" />
                    <span>{c.phone}</span>
                  </div>
                )}
              </div>

              {c.subject && <div className="contact-subject">Subject: {c.subject}</div>}

              <div className="contact-body">{c.message}</div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminContacts;

