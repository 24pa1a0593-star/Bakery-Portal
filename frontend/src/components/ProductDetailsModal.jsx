import React, { useState } from 'react';
import { FaTimes, FaPlus, FaMinus, FaShoppingCart, FaCheck } from 'react-icons/fa';
import { getCategoryImage } from './ProductCard';

const ProductDetailsModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  if (!isOpen || !product) return null;

  const imgSrc = (!imgError && product.imageUrl) ? product.imageUrl : getCategoryImage(product.category);

  const defaultIngredients = {
    Cakes: 'Organic Wheat Flour, Pure Butter, Farm Eggs, Cane Sugar, Belgian Cocoa / Vanilla Bean, Fresh Cream',
    Cupcakes: 'Flour, Sweet Butter, Fresh Milk, Cane Sugar, Madagascan Vanilla, Artisan Frosting',
    Cookies: 'Rolled Oats, Pure Butter, Brown Sugar, Dark Chocolate Chunks, Sea Salt, Eggs',
    Pastries: 'Puff Pastry Layers, French Butter, Cream Custard, Fresh Seasonal Fruits, Glaze',
    Breads: 'Stone-ground Wheat Flour, Sourdough Starter / Yeast, Spring Water, Sea Salt'
  };

  const ingredientsList = product.ingredients && product.ingredients.length > 0
    ? (Array.isArray(product.ingredients) ? product.ingredients.join(', ') : product.ingredients)
    : (defaultIngredients[product.category] || 'Flour, Butter, Sugar, Milk, Natural Flavorings');

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity);
      setAdded(true);
      setTimeout(() => {
        setAdded(false);
        onClose();
      }, 900);
    }
  };

  return (
    <div className="product-modal-backdrop" onClick={onClose}>
      <div className="product-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="product-modal-close" onClick={onClose} aria-label="Close details">
          <FaTimes size={18} />
        </button>

        <div className="product-modal-grid">
          <div className="product-modal-image-col">
            <img
              src={imgSrc}
              alt={product.name}
              onError={() => setImgError(true)}
              className="product-modal-img"
            />
            {product.featured && <span className="product-modal-featured">Featured Artisan Treat</span>}
          </div>

          <div className="product-modal-info-col">
            <span className="product-modal-badge">{product.category}</span>
            <h2 className="product-modal-title">{product.name}</h2>
            <div className="product-modal-price">
              ₹{(Number(product.price) || 0).toLocaleString('en-IN')}
            </div>

            <p className="product-modal-desc">{product.description}</p>

            <div className="product-modal-section">
              <h4 className="product-modal-subtitle">Ingredients & Craft:</h4>
              <p className="product-modal-ingredients">{ingredientsList}</p>
            </div>

            <div className="product-modal-section">
              <h4 className="product-modal-subtitle">Availability:</h4>
              <span className={`status-pill ${product.available !== false ? 'status-in-stock' : 'status-out-of-stock'}`}>
                {product.available !== false ? '● In Stock & Freshly Baked' : '● Sold Out Today'}
              </span>
            </div>

            {product.available !== false && (
              <div className="product-modal-actions">
                <div className="product-modal-qty">
                  <button
                    className="qty-btn"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                  >
                    <FaMinus size={12} />
                  </button>
                  <span className="qty-number">{quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    <FaPlus size={12} />
                  </button>
                </div>

                <button
                  className="btn btn-primary product-modal-add-btn"
                  onClick={handleAdd}
                  disabled={added}
                >
                  {added ? (
                    <>
                      <FaCheck /> Added to Cart!
                    </>
                  ) : (
                    <>
                      <FaShoppingCart /> Add {quantity > 1 ? `(${quantity})` : ''} to Cart • ₹{((Number(product.price) || 0) * quantity).toLocaleString('en-IN')}
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .product-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(44, 26, 14, 0.65);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1100;
          padding: 20px;
          animation: fadeIn 0.25s ease;
        }
        .product-modal-card {
          background: var(--white);
          border-radius: var(--radius-lg);
          max-width: 820px;
          width: 100%;
          overflow: hidden;
          position: relative;
          box-shadow: 0 20px 50px rgba(61, 26, 0, 0.35);
          border: 1px solid rgba(201, 168, 76, 0.25);
          animation: slideUp 0.3s ease;
        }
        .product-modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(255, 255, 255, 0.85);
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--chocolate);
          z-index: 10;
          transition: var(--transition);
          box-shadow: var(--shadow-sm);
        }
        .product-modal-close:hover {
          background: var(--chocolate);
          color: var(--white);
          transform: rotate(90deg);
        }
        .product-modal-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
        }
        @media (max-width: 768px) {
          .product-modal-grid {
            grid-template-columns: 1fr;
            max-height: 85vh;
            overflow-y: auto;
          }
        }
        .product-modal-image-col {
          position: relative;
          background: #fbf5ef;
          min-height: 320px;
        }
        .product-modal-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .product-modal-featured {
          position: absolute;
          top: 16px;
          left: 16px;
          background: var(--chocolate);
          color: var(--gold-light);
          padding: 4px 12px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          border-radius: 20px;
          text-transform: uppercase;
        }
        .product-modal-info-col {
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .product-modal-badge {
          align-self: flex-start;
          background: var(--cream-dark);
          color: var(--brown-dark);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 4px 10px;
          border-radius: 6px;
        }
        .product-modal-title {
          font-family: var(--font-heading);
          color: var(--chocolate);
          font-size: 1.6rem;
          margin: 0;
        }
        .product-modal-price {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--brown);
        }
        .product-modal-desc {
          color: var(--text-light);
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .product-modal-section {
          padding-top: 6px;
        }
        .product-modal-subtitle {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--chocolate);
          margin-bottom: 4px;
        }
        .product-modal-ingredients {
          font-size: 0.85rem;
          color: var(--text);
          font-style: italic;
          background: #fcf8f3;
          padding: 8px 12px;
          border-radius: 8px;
          border-left: 3px solid var(--gold);
        }
        .status-pill {
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 12px;
        }
        .status-in-stock {
          background: #e8f5e9;
          color: #2e7d32;
        }
        .status-out-of-stock {
          background: #ffebee;
          color: #c62828;
        }
        .product-modal-actions {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px solid var(--gray-200);
        }
        .product-modal-qty {
          display: flex;
          align-items: center;
          border: 1.5px solid var(--gray-300);
          border-radius: var(--radius-sm);
          overflow: hidden;
        }
        .qty-btn {
          background: #fbf5ef;
          border: none;
          width: 34px;
          height: 38px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--chocolate);
          transition: var(--transition);
        }
        .qty-btn:hover:not(:disabled) {
          background: var(--brown);
          color: var(--white);
        }
        .qty-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .qty-number {
          padding: 0 14px;
          font-weight: 600;
          font-size: 1rem;
          color: var(--text);
        }
        .product-modal-add-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 16px;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ProductDetailsModal;

