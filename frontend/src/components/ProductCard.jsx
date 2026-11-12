import React, { useState } from 'react';
import { FaPlus, FaCheck, FaStar, FaEye } from 'react-icons/fa';
import ProductDetailsModal from './ProductDetailsModal';

export const getCategoryImage = (category) => {
  const cat = (category || '').toLowerCase();
  if (cat.includes('birthday')) {
    return 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=600&q=80';
  }
  if (cat.includes('cupcake')) {
    return 'https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=600&q=80';
  }
  if (cat.includes('cake')) {
    return 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80';
  }
  if (cat.includes('cookie')) {
    return 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80';
  }
  if (cat.includes('pastr')) {
    return 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80';
  }
  if (cat.includes('bread')) {
    return 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=600&q=80';
  }
  if (cat.includes('donut')) {
    return 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80';
  }
  if (cat.includes('choc')) {
    return 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=600&q=80';
  }
  if (cat.includes('dessert')) {
    return 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80';
  }
  return 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=600&q=80';
};

const ProductCard = ({ product, onAddToCart }) => {
  const [imgError, setImgError] = useState(false);
  const [addedRecently, setAddedRecently] = useState(false);
  const [showModal, setShowModal] = useState(false);

  if (!product) return null;

  const imgSrc = (!imgError && product.imageUrl) ? product.imageUrl : getCategoryImage(product.category);

  const getBadgeClass = (category) => {
    const cat = (category || '').toLowerCase();
    if (cat.includes('birthday')) return 'badge-birthday';
    if (cat.includes('cupcake')) return 'badge-cupcakes';
    if (cat.includes('cake')) return 'badge-cakes';
    if (cat.includes('cookie')) return 'badge-cookies';
    if (cat.includes('pastr')) return 'badge-pastries';
    if (cat.includes('bread')) return 'badge-breads';
    if (cat.includes('donut')) return 'badge-donuts';
    if (cat.includes('choc')) return 'badge-chocolates';
    if (cat.includes('dessert')) return 'badge-desserts';
    return 'badge-cakes';
  };

  const handleAdd = (e) => {
    if (e) e.stopPropagation();
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
          min-height: 420px;
          display: flex;
          flex-direction: column;
          position: relative;
          background: var(--white);
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid rgba(139, 94, 60, 0.08);
        }
        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-hover);
        }
        .product-image-container {
          position: relative;
          height: 210px;
          background-color: var(--cream-dark);
          overflow: hidden;
          cursor: pointer;
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
          font-size: 3.5rem;
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
          padding: 4px 10px;
          border-radius: 50px;
        }
        .badge-cakes { background-color: #ffebee; color: #c62828; }
        .badge-birthday { background-color: #f3e5f5; color: #6a1b9a; }
        .badge-cupcakes { background-color: #fce4ec; color: #ad1457; }
        .badge-cookies { background-color: #fff8e1; color: #f57f17; }
        .badge-pastries { background-color: #e8f5e9; color: #2e7d32; }
        .badge-breads { background-color: #efebe9; color: #4e342e; }
        .badge-donuts { background-color: #e0f7fa; color: #006064; }
        .badge-chocolates { background-color: #d7ccc8; color: #3e2723; }
        .badge-desserts { background-color: #fff3e0; color: #e65100; }

        .product-details {
          padding: 18px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .product-name {
          font-family: var(--font-heading);
          font-size: 1.18rem;
          color: var(--chocolate);
          margin-bottom: 6px;
          line-height: 1.3;
          cursor: pointer;
        }
        .product-name:hover {
          color: var(--brown);
        }
        .product-desc {
          font-size: 0.86rem;
          color: var(--text-light);
          margin-bottom: 14px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.45;
          flex-grow: 1;
        }
        .product-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }
        .product-price {
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--brown);
        }
        .product-actions-row {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 8px;
        }
        .product-view-btn {
          padding: 9px 8px;
          font-size: 0.82rem;
          font-weight: 600;
          border-radius: var(--radius-sm);
          white-space: nowrap;
          border: 1.5px solid var(--cream-dark);
          background: var(--cream);
          color: var(--chocolate);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          cursor: pointer;
          transition: var(--transition);
        }
        .product-view-btn:hover {
          background: var(--cream-dark);
          color: var(--brown);
          border-color: var(--brown);
        }
        .product-add-btn {
          padding: 9px 8px;
          font-size: 0.84rem;
          font-weight: 600;
          border-radius: var(--radius-sm);
          white-space: nowrap;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          cursor: pointer;
        }
      `}</style>

      <div className="product-card">
        {/* Product Image & Badges */}
        <div className="product-image-container" onClick={() => setShowModal(true)}>
          {product.featured && (
            <span className="product-featured-badge">
              <FaStar size={10} /> Bestseller
            </span>
          )}

          {imgError ? (
            <div className="product-fallback-img">🍰</div>
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
              {product.category || 'Bakery'}
            </span>
          </div>
        </div>

        {/* Product Details & Actions */}
        <div className="product-details">
          <h3 className="product-name" onClick={() => setShowModal(true)}>
            {product.name}
          </h3>
          <p className="product-desc" onClick={() => setShowModal(true)}>
            {product.description || 'Deliciously handcrafted with love.'}
          </p>

          <div className="product-footer">
            <span className="product-price">
              ₹{(Number(product.price) || 0).toLocaleString('en-IN')}
            </span>
          </div>

          <div className="product-actions-row">
            <button
              type="button"
              className="product-view-btn"
              onClick={() => setShowModal(true)}
              aria-label={`View details for ${product.name}`}
            >
              <FaEye size={12} /> View Details
            </button>

            <button
              type="button"
              className="btn btn-primary product-add-btn"
              onClick={handleAdd}
              disabled={product.available === false}
              aria-label={`Add ${product.name} to cart`}
            >
              {product.available === false ? (
                'Sold Out'
              ) : addedRecently ? (
                <>
                  <FaCheck size={11} /> Added!
                </>
              ) : (
                <>
                  <FaPlus size={11} /> Add to Cart
                </>
              )}
            </button>
          </div>
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
