import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const CATEGORY_DATA = [
  {
    name: 'Cakes',
    title: 'Signature Cakes',
    desc: 'Rich truffles, silky red velvets, and light berry sponges handcrafted for everyday sweetness.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80',
    tag: 'Celebration Favorites',
    color: 'badge-cakes'
  },
  {
    name: 'Birthday Cakes',
    title: 'Birthday Cakes',
    desc: 'Spectacular multi-tier, confetti, chocolate drip, and floral showstoppers for unforgettable milestone birthdays.',
    image: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=800&auto=format&fit=crop&q=80',
    tag: 'Bestselling Party Cakes',
    color: 'badge-cakes'
  },
  {
    name: 'Pastries',
    title: 'French Pastries',
    desc: 'Crisp Normandy butter croissants, almond danishes, blueberry tarts, and cinnamon rolls baked fresh every morning.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=80',
    tag: 'Oven Fresh Daily',
    color: 'badge-pastries'
  },
  {
    name: 'Cupcakes',
    title: 'Artisan Cupcakes',
    desc: 'Miniature masterpieces crowned with Belgian chocolate ganache, rosewater buttercream, and salted caramel swirls.',
    image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=800&auto=format&fit=crop&q=80',
    tag: 'Perfect for Gifting',
    color: 'badge-cupcakes'
  },
  {
    name: 'Cookies',
    title: 'Handcrafted Cookies',
    desc: 'Warm chewy chocochip cookies, melt-in-your-mouth Danish butter shortbreads, and double chocolate lava cookies.',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&auto=format&fit=crop&q=80',
    tag: 'Tea-time Treats',
    color: 'badge-cookies'
  },
  {
    name: 'Bread',
    title: 'Artisanal Breads',
    desc: '36-hour wild ferment sourdough loaves, 7-grain harvest loaves, French baguettes, and garlic herb brioche.',
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=800&auto=format&fit=crop&q=80',
    tag: 'Natural Fermentation',
    color: 'badge-breads'
  },
  {
    name: 'Donuts',
    title: 'Gourmet Donuts',
    desc: 'Light pillowy brioche donuts dipped in crystalline vanilla glazes, dark chocolate icing, and filled with Bavarian cream.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80',
    tag: 'Fluffy & Delicious',
    color: 'badge-cupcakes'
  },
  {
    name: 'Chocolates',
    title: 'Artisan Chocolates',
    desc: 'Belgian couverture truffles, roasted hazelnut praline bonbons, and 72% single-origin dark chocolate slabs.',
    image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=800&auto=format&fit=crop&q=80',
    tag: 'Pure Belgian Couverture',
    color: 'badge-cookies'
  },
  {
    name: 'Desserts',
    title: 'Desserts & Puddings',
    desc: 'Classic Italian espresso tiramisu, Alphonso mango panna cotta, molten lava cakes, and vanilla crème brûlée tarts.',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&auto=format&fit=crop&q=80',
    tag: 'Chef Specials',
    color: 'badge-pastries'
  }
];

const Categories = () => {
  return (
    <>
      <style>{`
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-bottom: 80px;
        }
        .category-card {
          background: var(--white);
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(139, 94, 60, 0.08);
          text-decoration: none;
          color: inherit;
        }
        .category-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-hover);
        }
        .category-img-container {
          position: relative;
          height: 220px;
          overflow: hidden;
        }
        .category-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .category-card:hover .category-card-img {
          transform: scale(1.08);
        }
        .category-card-tag {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 2;
        }
        .category-card-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .category-card-title {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          color: var(--chocolate);
          margin-bottom: 8px;
        }
        .category-card-desc {
          font-size: 0.92rem;
          color: var(--text-light);
          line-height: 1.6;
          margin-bottom: 20px;
          flex-grow: 1;
        }
        .category-card-action {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--brown);
          font-weight: 700;
          font-size: 0.95rem;
          transition: var(--transition);
        }
        .category-card:hover .category-card-action {
          color: var(--chocolate);
          gap: 12px;
        }
        @media (max-width: 992px) {
          .categories-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .categories-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Header */}
      <div className="page-header">
        <div className="container">
          <span className="badge badge-cakes" style={{ marginBottom: '10px' }}>
            Artisan Collections
          </span>
          <h1>Bakery Categories</h1>
          <p>Explore our wide selection of handcrafted cakes, freshly baked breads, and sweet delicacies</p>
        </div>
      </div>

      <div className="container">
        {/* All Products Banner Pill */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Link to="/products" className="btn btn-primary btn-lg">
            🍰 View All Available Products
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="categories-grid">
          {CATEGORY_DATA.map((cat) => (
            <Link
              key={cat.name}
              to={`/menu?category=${encodeURIComponent(cat.name)}`}
              className="category-card"
            >
              <div className="category-img-container">
                <span className={`badge category-card-tag ${cat.color}`}>
                  {cat.tag}
                </span>
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="category-card-img"
                  loading="lazy"
                />
              </div>

              <div className="category-card-body">
                <h3 className="category-card-title">{cat.title}</h3>
                <p className="category-card-desc">{cat.desc}</p>
                <div className="category-card-action">
                  <span>Explore {cat.name}</span>
                  <FaArrowRight size={12} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
