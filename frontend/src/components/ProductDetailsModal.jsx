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
    'Cakes': 'Organic Wheat Flour, Pure Butter, Farm Eggs, Cane Sugar, Belgian Cocoa / Vanilla Bean, Fresh Cream',
    'Birthday Cakes': 'Madagascan Vanilla Bean, Cream Cheese Frosting, Dairy Butter, Rainbow Sprinkles, Belgian Couverture Drip',
    'Pastries': 'Laminated Puff Pastry, French Normandy Butter, Cream Custard, Fresh Seasonal Fruits, Natural Glaze',
    'Cupcakes': 'Flour, Sweet Butter, Fresh Milk, Cane Sugar, Madagascan Vanilla, Artisan Frosting Rosettes',
    'Cookies': 'Rolled Whole Oats, European Butter, Brown Sugar, Dark Chocolate Chunks, Sea Salt, Farm Eggs',
    'Bread': 'Stone-ground Whole Wheat Flour, 36-hr Natural Sourdough Starter, Spring Water, Sea Salt',
    'Breads': 'Stone-ground Whole Wheat Flour, Natural Sourdough Starter, Spring Water, Sea Salt',
    'Donuts': 'Yeasted Brioche Dough, Pure Cane Sugar Glaze, Belgian Chocolate Icing, Farm Butter, Whole Milk',
    'Chocolates': 'Belgian Couverture Cocoa 72%, Dairy Cream, Roasted Hazelnuts, Cocoa Butter, Sea Salt',
    'Desserts': 'Italian Mascarpone, Arabica Espresso, Madagascar Vanilla Pods, Farm Cream, Dutch Cocoa'
  };

  const ingredientsList = product.ingredients && product.ingredients.length > 0
    ? (Array.isArray(product.ingredients) ? product.ingredients.join(', ') : product.ingredients)
    : (defaultIngredients[product.category] || 'Flour, Butter, Sugar, Milk, Natural Artisan Flavorings');

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
                    aria-label="Decrease quantity"
                  >
                    <FaMinus size={12} />
                  </button>
                  <span className="qty-number">{quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
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
          max-height: 90vh;
          overflow-y: auto;
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
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--chocolate);
          box-shadow: var(--shadow-sm);
          z-index: 5;
          transition: var(--transition);
        }
        .product-modal-close:hover {
          background: var(--chocolate);
          color: var(--white);
          transform: rotate(90deg);
        }
        .product-modal-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .product-modal-image-col {
          position: relative;
          background: var(--cream-dark);
          min-height: 380px;
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
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          box-shadow: var(--shadow-sm);
        }
        .product-modal-info-col {
          padding: 36px 30px;
          display: flex;
          flex-direction: column;
        }
        .product-modal-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--brown);
          background: var(--cream);
          padding: 4px 12px;
          border-radius: 20px;
          align-self: flex-start;
          margin-bottom: 12px;
          border: 1px solid var(--cream-dark);
        }
        .product-modal-title {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          color: var(--chocolate);
          margin-bottom: 8px;
          line-height: 1.25;
        }
        .product-modal-price {
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--brown);
          margin-bottom: 16px;
        }
        .product-modal-desc {
          color: var(--text-light);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        .product-modal-section {
          margin-bottom: 16px;
        }
        .product-modal-subtitle {
          font-size: 0.85rem;
          color: var(--chocolate);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 6px;
        }
        .product-modal-ingredients {
          font-size: 0.88rem;
          color: var(--text-light);
          line-height: 1.5;
        }
        .status-pill {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.82rem;
          font-weight: 600;
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
          gap: 16px;
          margin-top: auto;
          padding-top: 24px;
        }
        .product-modal-qty {
          display: flex;
          align-items: center;
          border: 2px solid var(--cream-dark);
          border-radius: 50px;
          background: var(--cream);
          padding: 4px;
        }
        .product-modal-qty .qty-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          background: var(--white);
          color: var(--chocolate);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
        }
        .product-modal-qty .qty-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .product-modal-qty .qty-number {
          padding: 0 16px;
          font-weight: 700;
          font-size: 1rem;
          color: var(--chocolate);
        }
        .product-modal-add-btn {
          flex: 1;
          padding: 12px 20px;
          font-size: 0.95rem;
          border-radius: 50px;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (max-width: 768px) {
          .product-modal-grid {
            grid-template-columns: 1fr;
          }
          .product-modal-image-col {
            min-height: 220px;
            max-height: 260px;
          }
          .product-modal-info-col {
            padding: 24px 20px;
          }
          .product-modal-title {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDetailsModal;
