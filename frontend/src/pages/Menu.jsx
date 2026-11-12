import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaRedo, FaSortAmountDown, FaFilter } from 'react-icons/fa';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useCart } from '../context/CartContext';
import { INITIAL_PRODUCTS, BAKERY_CATEGORIES, matchCategory } from '../data/initialProducts';
import toast from 'react-hot-toast';

const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { addToCart, getItemCount } = useCart();
  const cartCount = getItemCount();

  // Keep state synced with URL search params if category changes
  useEffect(() => {
    const catFromUrl = searchParams.get('category');
    if (catFromUrl && catFromUrl !== selectedCategory) {
      setSelectedCategory(catFromUrl);
    }
  }, [searchParams]);

  // Handle category tab click
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category });
    }
  };

  // Debounce search input by 250ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
    }, 250);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch products from backend API, with rock-solid fallback to initial product catalog
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {};
      if (selectedCategory !== 'All') {
        params.category = selectedCategory;
      }
      if (debouncedSearch) {
        params.search = debouncedSearch;
      }
      if (sortBy !== 'default') {
        params.sort = sortBy;
      }

      const res = await api.get('/products', { params });

      // Check if API returned a valid array or object with data/products
      let apiItems = null;
      if (Array.isArray(res.data)) {
        apiItems = res.data;
      } else if (res.data && typeof res.data === 'object') {
        if (Array.isArray(res.data.products)) apiItems = res.data.products;
        else if (Array.isArray(res.data.data)) apiItems = res.data.data;
      }

      // If backend returned valid products list, use it
      if (apiItems && apiItems.length > 0) {
        setProducts(apiItems);
      } else {
        // Backend is in demo mode or empty; use comprehensive initial catalog
        setProducts(INITIAL_PRODUCTS);
      }
    } catch (err) {
      console.warn('API call to /products unsuccessful, serving initial bakery product catalog:', err.message);
      // Seamlessly fallback to initial catalog so user never sees broken empty screen
      setProducts(INITIAL_PRODUCTS);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, debouncedSearch, sortBy]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Client-side filtering & sorting ensures instant responsiveness
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Category Filter
    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter((p) => matchCategory(p.category, selectedCategory));
    }

    // 2. Search Filter
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter((p) => {
        const nameMatch = (p.name || '').toLowerCase().includes(q);
        const descMatch = (p.description || '').toLowerCase().includes(q);
        const catMatch = (p.category || '').toLowerCase().includes(q);
        return nameMatch || descMatch || catMatch;
      });
    }

    // 3. Price / Name Sorting
    if (sortBy === 'price_asc') {
      result.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    } else if (sortBy === 'name_asc') {
      result.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    } else {
      // Default: featured items first
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [products, selectedCategory, debouncedSearch, sortBy]);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`Added ${product.name} to cart!`);
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchTerm('');
    setSortBy('default');
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  return (
    <>
      <style>{`
        .menu-filter-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }
        .search-container {
          flex: 1;
          min-width: 280px;
          position: relative;
        }
        .search-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .search-icon {
          position: absolute;
          left: 16px;
          color: var(--gray-500);
          font-size: 1.1rem;
        }
        .search-input {
          padding-left: 48px;
          border-radius: 50px;
          box-shadow: var(--shadow-sm);
        }
        .sort-select-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--white);
          padding: 6px 16px;
          border-radius: 50px;
          border: 2px solid var(--cream-dark);
          box-shadow: var(--shadow-sm);
        }
        .sort-select-wrapper label {
          font-size: 0.88rem;
          color: var(--brown);
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          margin: 0;
        }
        .sort-select {
          border: none;
          background: transparent;
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--chocolate);
          outline: none;
          cursor: pointer;
        }
        .categories-tabs {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 32px;
          overflow-x: auto;
          padding: 8px 4px 16px;
          scrollbar-width: thin;
          scrollbar-color: var(--pink) transparent;
        }
        .categories-tabs::-webkit-scrollbar {
          height: 6px;
        }
        .categories-tabs::-webkit-scrollbar-thumb {
          background-color: var(--pink);
          border-radius: 10px;
        }
        .cat-tab-btn {
          padding: 10px 22px;
          border-radius: 50px;
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          border: 1.5px solid var(--cream-dark);
          transition: var(--transition);
          white-space: nowrap;
          background: var(--cream);
          color: var(--brown);
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .cat-tab-btn:hover {
          background: var(--cream-dark);
          color: var(--chocolate);
          border-color: var(--brown);
          transform: translateY(-2px);
        }
        .cat-tab-btn.active {
          background: var(--brown);
          color: var(--white);
          border-color: var(--brown);
          box-shadow: 0 4px 14px rgba(139, 94, 60, 0.3);
        }
        .results-summary-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--cream-dark);
          color: var(--text-light);
          font-size: 0.95rem;
        }
        .floating-cart-btn {
          position: fixed;
          bottom: 28px;
          right: 28px;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: var(--brown);
          color: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          box-shadow: var(--shadow-lg);
          z-index: 999;
          transition: var(--transition);
        }
        .floating-cart-btn:hover {
          background: var(--brown-dark);
          transform: scale(1.08);
        }
        .floating-cart-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #e53935;
          color: var(--white);
          font-size: 0.75rem;
          font-weight: 700;
          min-width: 22px;
          height: 22px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid var(--white);
        }
      `}</style>

      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <span className="badge badge-cakes" style={{ marginBottom: '10px' }}>
            Fresh Daily From Our Ovens
          </span>
          <h1>Our Bakery Menu</h1>
          <p>Handcrafted cakes, artisan pastries, crusty breads, cupcakes & chocolates</p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '80px' }}>
        {/* Search & Sort Controls Bar */}
        <div className="menu-filter-bar">
          <div className="search-container">
            <div className="search-input-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                className="form-control search-input"
                placeholder="Search cakes, cookies, breads, pastries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search bakery items"
              />
            </div>
          </div>

          <div className="sort-select-wrapper">
            <label htmlFor="price-sort">
              <FaSortAmountDown /> Sort:
            </label>
            <select
              id="price-sort"
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Featured / Recommended</option>
              <option value="price_asc">Price: Low to High (₹)</option>
              <option value="price_desc">Price: High to Low (₹)</option>
              <option value="name_asc">Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* Category Tabs (All + 9 Categories) */}
        <div className="categories-tabs" role="tablist" aria-label="Bakery categories">
          {BAKERY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={selectedCategory === cat}
              className={`cat-tab-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat === 'All' && '✨ '}
              {cat}
            </button>
          ))}
        </div>

        {/* Summary Info */}
        <div className="results-summary-row">
          <span>
            Showing <strong>{filteredProducts.length}</strong>{' '}
            {selectedCategory === 'All' ? 'delightful bakery items' : `${selectedCategory} items`}
            {debouncedSearch && ` matching "${debouncedSearch}"`}
          </span>

          {(selectedCategory !== 'All' || debouncedSearch || sortBy !== 'default') && (
            <button
              className="btn btn-outline btn-sm"
              onClick={handleResetFilters}
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        {loading ? (
          <LoadingSpinner size={48} message="Loading freshly baked items..." />
        ) : filteredProducts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No bakery items match your search</h3>
            <p>Try clearing your search term or select another category above.</p>
            <button
              className="btn btn-secondary"
              style={{ marginTop: '16px' }}
              onClick={handleResetFilters}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id || product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating cart button */}
      <Link to="/cart" className="floating-cart-btn" aria-label="View Shopping Cart">
        <FaShoppingCart />
        {cartCount > 0 && <span className="floating-cart-badge">{cartCount}</span>}
      </Link>
    </>
  );
};

export default Menu;
