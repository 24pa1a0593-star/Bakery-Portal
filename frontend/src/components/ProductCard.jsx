import React, { useState } from 'react';
import { FaPlus, FaCheck, FaStar, FaEye } from 'react-icons/fa';
import ProductDetailsModal from './ProductDetailsModal';

export const getCategoryImage = (category) => {
  const cat = (category || '').toLowerCase();
  if (cat.includes('cake') && !cat.includes('cupcake')) {
    return 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80';
  }
  if (cat.includes('cupcake')) {
    return 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=400&q=80';
  }
  if (cat.includes('cookie')) {
    return 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80';
  }
  if (cat.includes('pastr')) {
    return 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80';
  }
  if (cat.includes('bread')) {
    return 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80';
  }
  return 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=400&q=80';
};

const ProductCard = ({ product, onAddToCart }) => {
  const [imgError, setImgError] = useState(false);
  const [addedRecently, setAddedRecently] = useState(false);
  const [showModal, setShowModal] = useState(false);

  if (!product) return null;

  const imgSrc = (!imgError && product.imageUrl) ? product.imageUrl : getCategoryImage(product.category);

  const getBadgeClass = (category) => {
    const cat = (category || '').toLowerCase();
    if (cat.includes('cupcake')) return 'badge-cupcakes';
    if (cat.includes('cake')) return 'badge-cakes';
    if (cat.includes('cookie')) return 'badge-cookies';
    if (cat.includes('pastr')) return 'badge-pastries';
    if (cat.includes('bread')) return 'badge-breads';
    return 'badge-cakes';
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
      setAddedRecently(true);
      setTimeout(() => setAddedRecently(false), 1200);
    }
  };

  const handleModalAdd = (prod, qty) => {
    if (onAddToCart) {
      for (let i = 0; i < qty; i++) {
        onAddToCart(prod);
      }
    }
  };

  return (
    <>
      <style>{`
        .product-card {
          min-height: 400px;
          display: flex;
          flex-direction: column;
          position: relative;
          background: var(--white);
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }
        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-hover);
        }
        .product-image-container {
          position: relative;
          height: 200px;
          background-color: var(--cream-dark);
          overflow: hidden;
        }
        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .product-card:hover .product-image {
          transform: scale(1.06);
        }
        .product-fallback-img {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          background-color: var(--cream-dark);
        }
        .product-featured-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: var(--chocolate);
          color: var(--gold-light);
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.72rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 4px;
          z-index: 2;
        }
        .product-quick-view {
          position: absolute;
          inset: 0;
          background: rgba(44, 26, 14, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.25s ease;
          z-index: 3;
        }
        .product-card:hover .product-quick-view {
          opacity: 1;
        }
        .quick-view-btn {
          background: var(--white);
          color: var(--chocolate);
          font-weight: 600;
          font-size: 0.8rem;
          padding: 8px 16px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: var(--shadow);
        }
        .product-category-tag {
          position: absolute;
          bottom: 10px;
          left: 10px;
          z-index: 2;
        }
        .badge {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 4px 8px;
          border-radius: 4px;
        }
        .badge-cakes { background-color: var(--pink); color: var(--chocolate); }
        .badge-cupcakes { background-color: #ffd1dc; color: #5a2a35; }
        .badge-cookies { background-color: #ffe0b2; color: #5d4037; }
        .badge-pastries { background-color: #e1bee7; color: #4a148c; }
        .badge-breads { background-color: #d7ccc8; color: #3e2723; }

        .product-details {
          padding: 16px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .product-name {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          color: var(--chocolate);
          margin-bottom: 6px;
          line-height: 1.3;
        }
        .product-desc {
          font-size: 0.85rem;
          color: var(--text-light);
          margin-bottom: 14px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.4;
          flex-grow: 1;
        }
        .product-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .product-price {
          font-weight: 700;
          font-size: 1.15rem;
          color: var(--brown);
        }
        .product-add-btn {
          width: 100%;
          justify-content: center;
          padding: 9px;
          font-size: 0.88rem;
          font-weight: 600;
          border-radius: var(--radius-sm);
        }
      `}</style>

      <div className="product-card" onClick={() => setShowModal(true)}>
        <div className="product-image-container">
          {product.featured && (
            <span className="product-featured-badge">
              <FaStar size={10} /> Bestseller
            </span>
          )}

          <div className="product-quick-view">
            <span className="quick-view-btn">
              <FaEye size={12} /> View Details
            </span>
          </div>

          {imgError ? (
            <div className="product-fallback-img">🧁</div>
          ) : (
            <img
              src={imgSrc}
              alt={product.name || 'Bakery Item'}
              className="product-image"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          )}

          <div className="product-category-tag">
            <span className={`badge ${getBadgeClass(product.category)}`}>
              {product.category || 'Treat'}
            </span>
          </div>
        </div>

        <div className="product-details">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-desc">{product.description || 'Deliciously handcrafted with love.'}</p>

          <div className="product-footer">
            <span className="product-price">
              ₹{(Number(product.price) || 0).toLocaleString('en-IN')}
            </span>
          </div>

          <button
            className="btn btn-primary product-add-btn"
            onClick={handleAdd}
            disabled={product.available === false}
          >
            {product.available === false ? (
              'Sold Out'
            ) : addedRecently ? (
              <>
                <FaCheck /> Added!
              </>
            ) : (
              <>
                <FaPlus size={12} /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>

      <ProductDetailsModal
        product={product}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAddToCart={handleModalAdd}
      />
    </>
  );
};

export default ProductCard;
