import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaAward, FaLeaf, FaClock, FaArrowRight } from 'react-icons/fa';

const About = () => {
  return (
    <>
      <style>{`
        .about-hero {
          background: linear-gradient(135deg, var(--cream-dark) 0%, #fae6ec 50%, var(--pink) 100%);
          padding: 80px 0 60px;
          text-align: center;
          border-bottom: 1px solid rgba(139,94,60,0.1);
        }
        .about-hero h1 {
          font-size: 3rem;
          color: var(--chocolate);
          margin-bottom: 16px;
        }
        .about-hero p {
          max-width: 650px;
          margin: 0 auto;
          color: var(--text-light);
          font-size: 1.15rem;
          line-height: 1.7;
        }
        .about-story-section {
          padding: 80px 0;
        }
        .story-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        .story-content h2 {
          font-size: 2.3rem;
          color: var(--chocolate);
          margin-bottom: 20px;
          line-height: 1.25;
        }
        .story-content p {
          color: var(--text-light);
          font-size: 1.05rem;
          line-height: 1.8;
          margin-bottom: 20px;
        }
        .story-image-wrapper {
          position: relative;
        }
        .story-image {
          width: 100%;
          height: 440px;
          object-fit: cover;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          border: 8px solid var(--white);
        }
        .story-badge {
          position: absolute;
          bottom: -20px;
          right: -20px;
          background: var(--brown);
          color: var(--white);
          padding: 20px 24px;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          text-align: center;
        }
        .story-badge .num {
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 700;
          display: block;
        }
        .story-badge .lbl {
          font-size: 0.82rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .values-section {
          background: var(--white);
          padding: 80px 0;
        }
        .values-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;
        }
        .value-card {
          text-align: center;
          padding: 36px 24px;
          border-radius: var(--radius);
          background: var(--cream);
          border: 1px solid var(--cream-dark);
          transition: var(--transition);
        }
        .value-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow);
          background: var(--white);
        }
        .value-icon-box {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: var(--white);
          color: var(--brown);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          margin: 0 auto 20px;
          box-shadow: var(--shadow-sm);
        }
        .value-card h3 {
          font-size: 1.25rem;
          color: var(--chocolate);
          margin-bottom: 12px;
        }
        .value-card p {
          color: var(--text-light);
          font-size: 0.92rem;
          line-height: 1.6;
        }

        .cta-banner {
          background: linear-gradient(135deg, var(--chocolate) 0%, var(--brown) 100%);
          color: var(--cream);
          padding: 70px 0;
          text-align: center;
          border-radius: var(--radius-lg);
          margin: 60px 0;
        }
        .cta-banner h2 {
          font-size: 2.4rem;
          color: var(--gold-light);
          margin-bottom: 16px;
        }
        .cta-banner p {
          max-width: 580px;
          margin: 0 auto 30px;
          font-size: 1.1rem;
          color: rgba(255,248,240,0.85);
        }

        @media (max-width: 868px) {
          .story-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .values-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 540px) {
          .values-grid {
            grid-template-columns: 1fr;
          }
          .about-hero h1 {
            font-size: 2.2rem;
          }
        }
      `}</style>

      {/* Hero */}
      <div className="about-hero">
        <div className="container">
          <span className="badge badge-cakes" style={{ marginBottom: '12px' }}>
            Artisan Baking Since 2018
          </span>
          <h1>About Sweet Bliss Bakery</h1>
          <p>
            Where authentic traditional baking meets modern confectionery art. Every pastry, bread, and custom cake is crafted with heart and pure ingredients.
          </p>
        </div>
      </div>

      {/* Story */}
      <div className="container about-story-section">
        <div className="story-grid">
          <div className="story-content">
            <span className="section-subtitle" style={{ display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, color: 'var(--brown)' }}>
              Our Story & Heritage
            </span>
            <h2>Handcrafted with Love, Baked for Your Happy Moments</h2>
            <p>
              Sweet Bliss Bakery started with a simple belief: the world is a happier place when celebrations are sweetened by real, wholesome, lovingly baked treats.
            </p>
            <p>
              From our morning sourdough loaves to extravagant multi-tiered birthday cakes, our master bakers use only 100% pure dairy butter, stone-ground unbleached flour, Belgian couvertures, and locally sourced seasonal fruits. We never cut corners with artificial premixes or chemical emulsifiers.
            </p>
            <p>
              Whether it’s a quiet morning croissant with your coffee or a showstopping birthday cake for someone special, we treat every single order as a centerpiece of joy.
            </p>
            <div style={{ marginTop: '28px' }}>
              <Link to="/menu" className="btn btn-primary">
                Explore Our Creations <FaArrowRight size={12} />
              </Link>
            </div>
          </div>

          <div className="story-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80"
              alt="Sweet Bliss Bakery Kitchen"
              className="story-image"
            />
            <div className="story-badge">
              <span className="num">100%</span>
              <span className="lbl">Artisanal Quality</span>
            </div>
          </div>
        </div>
      </div>

      {/* Values Strip */}
      <div className="values-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 className="section-title">The Sweet Bliss Promise</h2>
            <p className="section-subtitle">What makes our baked goods irresistibly delightful</p>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon-box">
                <FaLeaf />
              </div>
              <h3>Pure Ingredients</h3>
              <p>Imported Belgian chocolate, fresh dairy cream, real Madagascar vanilla, and zero preservatives.</p>
            </div>

            <div className="value-card">
              <div className="value-icon-box">
                <FaClock />
              </div>
              <h3>Baked Fresh Daily</h3>
              <p>Our ovens fire up at 4:00 AM every morning so your orders arrive oven-fresh and fragrant.</p>
            </div>

            <div className="value-card">
              <div className="value-icon-box">
                <FaHeart />
              </div>
              <h3>Bespoke Artistry</h3>
              <p>Custom cakes designed to match your dream themes, personal colors, and special messages.</p>
            </div>

            <div className="value-card">
              <div className="value-icon-box">
                <FaAward />
              </div>
              <h3>5-Star Celebrations</h3>
              <p>Over 10,000+ birthday smiles and anniversary memories delivered across Mumbai.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container">
        <div className="cta-banner">
          <h2>Ready to Celebrate with Us?</h2>
          <p>Order online for same-day delivery or collaborate with our pastry chefs for a bespoke celebration cake.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/menu" className="btn btn-secondary">
              Browse Menu
            </Link>
            <Link to="/custom-order" className="btn btn-outline" style={{ color: 'var(--cream)', borderColor: 'var(--gold-light)' }}>
              Design Custom Cake
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
