const bcrypt = require('bcryptjs');

// Complete Initial Products for Sweet Bliss Bakery across all 9 categories
const INITIAL_PRODUCTS = [
  // --- Cakes ---
  {
    _id: '64f1a2b3c4d5e6f7a8b9c001',
    name: 'Classic Chocolate Truffle Cake',
    description: 'Rich moist layers of dark chocolate sponge layered with velvety Belgian chocolate ganache.',
    price: 850,
    category: 'Cakes',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: true,
    createdAt: new Date('2026-01-01T10:00:00Z')
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c002',
    name: 'Vanilla Bean Dream Cake',
    description: 'Light fluffy Madagascar vanilla sponge layered with whipped mascarpone cream and fresh seasonal berries.',
    price: 750,
    category: 'Cakes',
    imageUrl: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: true,
    createdAt: new Date('2026-01-02T10:00:00Z')
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c003',
    name: 'Velvet Strawberry Symphony',
    description: 'Subtle cocoa red velvet cake smothered in silky Philadelphia cream cheese frosting and strawberry glaze.',
    price: 950,
    category: 'Cakes',
    imageUrl: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    createdAt: new Date('2026-01-03T10:00:00Z')
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c004',
    name: 'German Black Forest Cake',
    description: 'Kirsch-soaked chocolate sponge with sour cherries, fresh whipped cream rosettes, and dark chocolate shavings.',
    price: 920,
    category: 'Cakes',
    imageUrl: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    createdAt: new Date('2026-01-04T10:00:00Z')
  },

  // --- Birthday Cakes ---
  {
    _id: '64f1a2b3c4d5e6f7a8b9c021',
    name: 'Rainbow Confetti Birthday Cake',
    description: 'Three-tiered celebratory vanilla sponge bursting with rainbow sprinkles, vanilla buttercream, and party sparks.',
    price: 1250,
    category: 'Birthday Cakes',
    imageUrl: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: true,
    createdAt: new Date('2026-01-05T10:00:00Z')
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c022',
    name: 'Royal Chocolate Drip Birthday Cake',
    description: 'Decadent chocolate cake loaded with chocolate drip, Ferrero Rocher truffles, macaron crown, and birthday banner.',
    price: 1450,
    category: 'Birthday Cakes',
    imageUrl: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: true,
    createdAt: new Date('2026-01-06T10:00:00Z')
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c023',
    name: 'Golden Butterscotch Birthday Cake',
    description: 'Crunchy caramelized cashew praline paired with brown butter sponge and rich butterscotch cream.',
    price: 1100,
    category: 'Birthday Cakes',
    imageUrl: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    createdAt: new Date('2026-01-07T10:00:00Z')
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c024',
    name: 'Floral Princess Birthday Cake',
    description: 'Elegant pastel pink strawberry sponge adorned with edible sugar flowers, pearl drops, and soft rosewater cream.',
    price: 1350,
    category: 'Birthday Cakes',
    imageUrl: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    createdAt: new Date('2026-01-08T10:00:00Z')
  },

  // --- Pastries ---
  {
    _id: '64f1a2b3c4d5e6f7a8b9c012',
    name: 'Artisan Butter Croissant',
    description: 'Ultra flaky, multi-layered golden French croissant crafted with imported Normandy butter. Crisp outside, honeycomb inside.',
    price: 120,
    category: 'Pastries',
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: true,
    createdAt: new Date('2026-01-09T10:00:00Z')
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c013',
    name: 'Almond Frangipane Danish',
    description: 'Crisp puff pastry folded over sweet roasted almond frangipane cream, dusted with toasted almond slivers.',
    price: 150,
    category: 'Pastries',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    createdAt: new Date('2026-01-10T10:00:00Z')
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c014',
    name: 'Glazed Cinnamon Roll Pastry',
    description: 'Soft, buttery rolled pastry packed with aromatic Ceylon cinnamon and brown sugar, smothered in warm cream cheese glaze.',
    price: 140,
    category: 'Pastries',
    imageUrl: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    createdAt: new Date('2026-01-11T10:00:00Z')
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c025',
    name: 'Blueberry Cheesecake Pastry',
    description: 'Golden shortcrust pastry tart filled with creamy baked cheesecake and topped with wild blueberry compote.',
    price: 160,
    category: 'Pastries',
    imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    createdAt: new Date('2026-01-12T10:00:00Z')
  },

  // --- Cupcakes ---
  {
    _id: '64f1a2b3c4d5e6f7a8b9c006',
    name: 'Belgian Chocolate Swirl Cupcakes (6-pack)',
    description: 'Six moist miniature chocolate cakes crowned with generous swirls of dark and milk chocolate buttercream.',
    price: 380,
    category: 'Cupcakes',
    imageUrl: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: true,
    createdAt: new Date('2026-01-13T10:00:00Z')
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c007',
    name: 'Madagascan Vanilla Rose Cupcakes (6-pack)',
    description: 'Six delicate vanilla bean cupcakes decorated with handcrafted pastel pink and ivory buttercream rosettes.',
    price: 340,
    category: 'Cupcakes',
    imageUrl: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    createdAt: new Date('2026-01-14T10:00:00Z')
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c008',
    name: 'Red Velvet Cream Frosting Cupcakes (6-pack)',
    description: 'Six bite-sized red velvet indulgences topped with tangy cream cheese frosting swirls and crimson cake crumbs.',
    price: 420,
    category: 'Cupcakes',
    imageUrl: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    createdAt: new Date('2026-01-15T10:00:00Z')
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c026',
    name: 'Salted Caramel Pretzel Cupcakes (6-pack)',
    description: 'Six brown-sugar cupcakes filled with salted dulce de leche, caramel buttercream, and mini crunchy pretzels.',
    price: 450,
    category: 'Cupcakes',
    imageUrl: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    createdAt: new Date('2026-01-16T10:00:00Z')
  },

  // --- Cookies ---
  {
    _id: '64f1a2b3c4d5e6f7a8b9c009',
    name: 'Classic Chocolate Chip Cookies (12-pack)',
    description: 'Crisp chewy golden cookies generously studded with premium dark chocolate chunks and finished with a pinch of flaky sea salt.',
    price: 290,
    category: 'Cookies',
    imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: true,
    createdAt: new Date('2026-01-17T10:00:00Z')
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c010',
    name: 'Danish Butter Shortbread Cookies (12-pack)',
    description: 'Traditional melt-in-your-mouth European butter cookies with intricate piped patterns, baked until golden.',
    price: 260,
    category: 'Cookies',
    imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    createdAt: new Date('2026-01-18T10:00:00Z')
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c011',
    name: 'Chewy Oatmeal Raisin Spiced Cookies (12-pack)',
    description: 'Hearty rolled whole oats blended with plump golden sultanas, cinnamon, nutmeg, and dark molasses.',
    price: 270,
    category: 'Cookies',
    imageUrl: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    createdAt: new Date('2026-01-19T10:00:00Z')
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c027',
    name: 'Double Chocolate Fudge Cookies (10-pack)',
    description: 'Deep cocoa brownie cookies with molten chocolate centers and roasted walnuts.',
    price: 320,
    category: 'Cookies',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    createdAt: new Date('2026-01-20T10:00:00Z')
  },

  // --- Bread ---
  {
    _id: '64f1a2b3c4d5e6f7a8b9c015',
    name: 'Wild Ferment Sourdough Country Loaf',
    description: 'Naturally fermented 36-hour artisan sourdough loaf with a blistered crispy crust and an open, custardy crumb.',
    price: 190,
    category: 'Bread',
    imageUrl: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: true,
    createdAt: new Date('2026-01-21T10:00:00Z')
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c016',
    name: '7-Grain Artisanal Harvest Bread',
    description: 'Nutritious wholesome loaf packed with toasted flax seeds, sunflower seeds, pumpkin seeds, oats, and chia.',
    price: 180,
    category: 'Bread',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    createdAt: new Date('2026-01-22T10:00:00Z')
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c028',
    name: 'French Crisp Baguette',
    description: 'Traditional Parisian baguette with a crackling golden crust, creamy airy interior, and signature sourdough aroma.',
    price: 120,
    category: 'Bread',
    imageUrl: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    createdAt: new Date('2026-01-23T10:00:00Z')
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c029',
    name: 'Soft Roasted Garlic Herb Brioche',
    description: 'Pillow-soft butter brioche braided with roasted garlic cloves, rosemary, thyme, and grated aged parmesan.',
    price: 210,
    category: 'Bread',
    imageUrl: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    createdAt: new Date('2026-01-24T10:00:00Z')
  },

  // --- Donuts ---
  {
    _id: '64f1a2b3c4d5e6f7a8b9c030',
    name: 'Classic Vanilla Glazed Donuts (6-pack)',
    description: 'Six feather-light yeasted donuts dipped in a sweet crystalline vanilla bean glaze that crackles with every bite.',
    price: 300,
    category: 'Donuts',
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: true,
    createdAt: new Date('2026-01-25T10:00:00Z')
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c031',
    name: 'Dark Chocolate Sprinkle Donuts (6-pack)',
    description: 'Fluffy golden donuts smothered in rich dark chocolate icing and covered in colorful festival sprinkles.',
    price: 330,
    category: 'Donuts',
    imageUrl: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    createdAt: new Date('2026-01-26T10:00:00Z')
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c032',
    name: 'Boston Bavarian Cream Donuts (4-pack)',
    description: 'Plump pillowy donuts generously piped with velvety Bavarian custard cream and topped with glossy dark ganache.',
    price: 280,
    category: 'Donuts',
    imageUrl: 'https://images.unsplash.com/photo-1527515545081-5db817172677?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    createdAt: new Date('2026-01-27T10:00:00Z')
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c033',
    name: 'Wild Berry Jam Filled Donuts (4-pack)',
    description: 'Four sugar-dusted artisan donuts filled to bursting with house-made raspberry and strawberry jam.',
    price: 260,
    category: 'Donuts',
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    createdAt: new Date('2026-01-28T10:00:00Z')
  },

  // --- Chocolates ---
  {
    _id: '64f1a2b3c4d5e6f7a8b9c034',
    name: 'Artisanal Belgian Truffle Box (12 pcs)',
    description: 'Luxury handcrafted assortment including Dark Cocoa Ganache, Salted Butter Caramel, Hazelnut Gianduja, and Espresso.',
    price: 550,
    category: 'Chocolates',
    imageUrl: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: true,
    createdAt: new Date('2026-01-29T10:00:00Z')
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c035',
    name: 'Roasted Hazelnut Praline Bonbons (10 pcs)',
    description: 'Crispy caramelized Piedmont hazelnut praline enveloped in smooth 64% dark chocolate shells with gold luster.',
    price: 490,
    category: 'Chocolates',
    imageUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    createdAt: new Date('2026-01-30T10:00:00Z')
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c036',
    name: 'Single Origin 72% Dark Chocolate Slab',
    description: 'Hand-poured artisan dark chocolate bar sprinkled with roasted almond slivers, freeze-dried raspberries, and pink rock salt.',
    price: 250,
    category: 'Chocolates',
    imageUrl: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    createdAt: new Date('2026-01-31T10:00:00Z')
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c037',
    name: 'White Chocolate Pistachio Crunch (8 pcs)',
    description: 'Silky Swiss white chocolate infused with Persian cardamom, crunchy roasted pistachios, and dried rose petals.',
    price: 420,
    category: 'Chocolates',
    imageUrl: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    createdAt: new Date('2026-02-01T10:00:00Z')
  },

  // --- Desserts ---
  {
    _id: '64f1a2b3c4d5e6f7a8b9c038',
    name: 'Traditional Italian Espresso Tiramisu',
    description: 'House-baked Savoiardi ladyfingers steeped in strong Italian espresso and amaretto, layered with velvety whipped mascarpone and Valrhona cocoa.',
    price: 320,
    category: 'Desserts',
    imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: true,
    createdAt: new Date('2026-02-02T10:00:00Z')
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c039',
    name: 'Alphonso Mango Velvet Panna Cotta',
    description: 'Silky smooth vanilla bean panna cotta topped with a vibrant reduction of pure Ratnagiri Alphonso mango puree and fresh mint.',
    price: 260,
    category: 'Desserts',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    createdAt: new Date('2026-02-03T10:00:00Z')
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c040',
    name: 'Warm Dark Chocolate Molten Lava Cake',
    description: 'Individual decadent dark chocolate sponge that opens to a gushing stream of hot molten fudge. Best served warm.',
    price: 280,
    category: 'Desserts',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    createdAt: new Date('2026-02-04T10:00:00Z')
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c041',
    name: 'Caramelized Vanilla Crème Brûlée Tart',
    description: 'Crisp buttery tart shell filled with luscious vanilla custard, torched to order with a glassy caramelized amber sugar crust.',
    price: 240,
    category: 'Desserts',
    imageUrl: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    createdAt: new Date('2026-02-05T10:00:00Z')
  }
];

class QueryBuilder {
  constructor(dataPromise) {
    this.promise = Promise.resolve(dataPromise);
  }

  sort(sortRules) {
    this.promise = this.promise.then(items => {
      if (!Array.isArray(items)) return items;
      return [...items].sort((a, b) => {
        for (const [key, dir] of Object.entries(sortRules)) {
          let valA = a[key];
          let valB = b[key];
          if (valA instanceof Date) valA = valA.getTime();
          if (valB instanceof Date) valB = valB.getTime();
          if (valA < valB) return dir === 1 ? -1 : 1;
          if (valA > valB) return dir === 1 ? 1 : -1;
        }
        return 0;
      });
    });
    return this;
  }

  skip(n) {
    this.promise = this.promise.then(items => {
      if (!Array.isArray(items)) return items;
      return items.slice(n);
    });
    return this;
  }

  limit(n) {
    this.promise = this.promise.then(items => {
      if (!Array.isArray(items)) return items;
      return items.slice(0, n);
    });
    return this;
  }

  then(resolve, reject) {
    return this.promise.then(resolve, reject);
  }

  catch(reject) {
    return this.promise.catch(reject);
  }
}

class DemoStore {
  constructor() {
    this.products = [...INITIAL_PRODUCTS];
    this.orders = [];
    this.adminUsers = [
      {
        _id: '64f1a2b3c4d5e6f7a8b9c999',
        username: 'admin',
        email: 'admin@sweetbliss.com',
        passwordHash: '$2a$10$7RptY37kWaCQ80vmO4XZ7uQRBNHw/CCY4yNV8q2x/NVixTZoaVKki',
        role: 'superadmin',
        createdAt: new Date()
      }
    ];
    this.users = [
      {
        _id: '64f1a2b3c4d5e6f7a8b9u001',
        name: 'Priya Sharma',
        email: 'priya@example.com',
        phone: '9876543210',
        passwordHash: '$2a$10$b/zQMJwJ8YFx1sfPxOWtZeeKGySw1z2dcrRyrozF7Hembhw1qMvq6',
        address: '42 Baker Street, Bandra West, Mumbai',
        role: 'customer',
        createdAt: new Date()
      }
    ];
    this.contactMessages = [];
    this.isDemo = true;
  }

  generateId() {
    return 'demo_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
  }

  // --- Product Operations ---
  findProducts(query = {}) {
    let result = [...this.products];
    if (query.available !== undefined) {
      result = result.filter(p => p.available === query.available);
    }
    if (query.category && query.category !== 'All') {
      const qCat = query.category.trim().toLowerCase();
      result = result.filter(p => {
        const pCat = (p.category || '').trim().toLowerCase();
        if (qCat === 'bread' || qCat === 'breads') {
          return pCat === 'bread' || pCat === 'breads';
        }
        if (qCat === 'cakes') {
          return pCat === 'cakes';
        }
        return pCat === qCat || pCat.includes(qCat) || qCat.includes(pCat);
      });
    }
    if (query.featured !== undefined) {
      result = result.filter(p => p.featured === query.featured);
    }
    if (query.$or) {
      result = result.filter(p => {
        return query.$or.some(clause => {
          if (clause.name && clause.name.$regex) {
            const re = new RegExp(clause.name.$regex, clause.name.$options || 'i');
            if (re.test(p.name)) return true;
          }
          if (clause.description && clause.description.$regex) {
            const re = new RegExp(clause.description.$regex, clause.description.$options || 'i');
            if (re.test(p.description)) return true;
          }
          return false;
        });
      });
    }
    return new QueryBuilder(result);
  }

  findProductById(id) {
    return new QueryBuilder(this.products.find(p => p._id.toString() === id.toString()) || null);
  }

  countProducts(query = {}) {
    return this.findProducts(query).then(items => items.length);
  }

  createProduct(data) {
    const product = {
      _id: this.generateId(),
      name: data.name,
      description: data.description,
      price: Number(data.price),
      category: data.category,
      imageUrl: data.imageUrl || '',
      available: data.available !== undefined ? Boolean(data.available) : true,
      featured: data.featured !== undefined ? Boolean(data.featured) : false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.products.push(product);
    return Promise.resolve(product);
  }

  updateProductById(id, data) {
    const idx = this.products.findIndex(p => p._id.toString() === id.toString());
    if (idx === -1) return Promise.resolve(null);
    this.products[idx] = {
      ...this.products[idx],
      ...data,
      updatedAt: new Date()
    };
    return Promise.resolve(this.products[idx]);
  }

  deleteProductById(id) {
    const idx = this.products.findIndex(p => p._id.toString() === id.toString());
    if (idx === -1) return Promise.resolve(null);
    const deleted = this.products.splice(idx, 1)[0];
    return Promise.resolve(deleted);
  }

  // --- User Operations (Customers) ---
  findUserByEmail(email) {
    const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    return Promise.resolve(user || null);
  }

  findUserById(id) {
    const user = this.users.find(u => u._id.toString() === id.toString());
    return Promise.resolve(user || null);
  }

  findUserByQuery(query = {}) {
    if (query.email) {
      return this.findUserByEmail(query.email);
    }
    if (query._id) {
      return this.findUserById(query._id);
    }
    return Promise.resolve(null);
  }

  createUser(data) {
    const user = {
      _id: this.generateId(),
      name: data.name,
      email: data.email.toLowerCase(),
      phone: data.phone,
      passwordHash: data.passwordHash,
      address: data.address || '',
      role: 'customer',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.push(user);
    return Promise.resolve(user);
  }

  updateUserById(id, data) {
    const idx = this.users.findIndex(u => u._id.toString() === id.toString());
    if (idx === -1) return Promise.resolve(null);
    this.users[idx] = {
      ...this.users[idx],
      ...data,
      updatedAt: new Date()
    };
    return Promise.resolve(this.users[idx]);
  }

  // --- Order Operations ---
  findOrders(filter = {}) {
    let result = [...this.orders];
    if (filter.status && filter.status !== 'All') {
      result = result.filter(o => o.status === filter.status);
    }
    return new QueryBuilder(result);
  }

  findOrderById(id) {
    return new QueryBuilder(this.orders.find(o => o._id.toString() === id.toString() || o.orderId === id) || null);
  }

  findOrderByQuery(query = {}) {
    let result = this.orders.find(o => {
      let match = true;
      if (query.orderId && o.orderId !== query.orderId) match = false;
      if (query['customer.phone'] && o.customer?.phone !== query['customer.phone']) match = false;
      return match;
    });
    return new QueryBuilder(result || null);
  }

  countOrders(filter = {}) {
    return this.findOrders(filter).then(items => items.length);
  }

  createOrder(data) {
    const order = {
      _id: this.generateId(),
      ...data,
      status: data.status || 'Pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      save: function () {
        return Promise.resolve(this);
      }
    };
    this.orders.unshift(order);
    return order;
  }

  updateOrderById(id, data) {
    const idx = this.orders.findIndex(o => o._id.toString() === id.toString() || o.orderId === id);
    if (idx === -1) return Promise.resolve(null);
    this.orders[idx] = {
      ...this.orders[idx],
      ...data,
      updatedAt: new Date()
    };
    return Promise.resolve(this.orders[idx]);
  }

  // --- AdminUser Operations ---
  findAdminByEmail(email) {
    const admin = this.adminUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    return Promise.resolve(admin || null);
  }

  createAdminUser(data) {
    const user = {
      _id: this.generateId(),
      ...data,
      createdAt: new Date()
    };
    this.adminUsers.push(user);
    return Promise.resolve(user);
  }

  // --- Contact Operations ---
  createContactMessage(data) {
    const msg = {
      _id: this.generateId(),
      ...data,
      read: false,
      createdAt: new Date()
    };
    this.contactMessages.unshift(msg);
    return Promise.resolve(msg);
  }

  findContacts() {
    return new QueryBuilder([...this.contactMessages]);
  }

  countContacts() {
    return Promise.resolve(this.contactMessages.length);
  }

  markContactsAsRead() {
    this.contactMessages.forEach(m => { m.read = true; });
    return Promise.resolve({ modifiedCount: this.contactMessages.length });
  }
}

const demoStore = new DemoStore();
module.exports = demoStore;
