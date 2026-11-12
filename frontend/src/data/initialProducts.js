// Sweet Bliss Bakery - Complete Initial Product Dataset
// Includes all required categories: Cakes, Birthday Cakes, Pastries, Cupcakes, Cookies, Bread, Donuts, Chocolates, Desserts

export const INITIAL_PRODUCTS = [
  // --- Cakes ---
  {
    _id: 'prod_cake_01',
    name: 'Classic Chocolate Truffle Cake',
    description: 'Rich moist layers of dark chocolate sponge layered with velvety Belgian chocolate ganache.',
    price: 850,
    category: 'Cakes',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: true,
    ingredients: 'Belgian Dark Chocolate, Dutch Cocoa, Dairy Butter, Fresh Cream, Wheat Flour, Cane Sugar'
  },
  {
    _id: 'prod_cake_02',
    name: 'Vanilla Bean Dream Cake',
    description: 'Light, fluffy Madagascar vanilla sponge layered with whipped mascarpone cream and fresh seasonal berries.',
    price: 750,
    category: 'Cakes',
    imageUrl: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: true,
    ingredients: 'Madagascar Vanilla Bean, Whipped Mascarpone, Farm Eggs, Pastry Flour, Berry Coulis'
  },
  {
    _id: 'prod_cake_03',
    name: 'Velvet Strawberry Symphony',
    description: 'Subtle cocoa red velvet cake smothered in silky Philadelphia cream cheese frosting and strawberry glaze.',
    price: 950,
    category: 'Cakes',
    imageUrl: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    ingredients: 'Cream Cheese, Cocoa, Buttermilk, Beet Extract, Butter, Pure Vanilla'
  },
  {
    _id: 'prod_cake_04',
    name: 'German Black Forest Cake',
    description: 'Kirsch-soaked chocolate sponge with sour cherries, fresh whipped cream rosettes, and dark chocolate shavings.',
    price: 920,
    category: 'Cakes',
    imageUrl: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    ingredients: 'Sour Cherries, Dark Chocolate Flakes, Dairy Whipping Cream, Kirsch Essence, Cocoa Sponge'
  },

  // --- Birthday Cakes ---
  {
    _id: 'prod_bday_01',
    name: 'Rainbow Confetti Birthday Cake',
    description: 'Three-tiered celebratory vanilla sponge bursting with rainbow sprinkles, vanilla buttercream, and party sparks.',
    price: 1250,
    category: 'Birthday Cakes',
    imageUrl: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: true,
    ingredients: 'Sprinkles, Pure Buttercream, Vanilla Essence, Cane Sugar, Pastry Flour'
  },
  {
    _id: 'prod_bday_02',
    name: 'Royal Chocolate Drip Birthday Cake',
    description: 'Decadent chocolate cake loaded with chocolate drip, Ferrero Rocher truffles, macaron crown, and birthday banner.',
    price: 1450,
    category: 'Birthday Cakes',
    imageUrl: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: true,
    ingredients: 'Ferrero Hazelnut Chocolates, Dark Chocolate Drip, French Macarons, Rich Cocoa Ganache'
  },
  {
    _id: 'prod_bday_03',
    name: 'Golden Butterscotch Birthday Cake',
    description: 'Crunchy caramelized cashew praline paired with brown butter sponge and rich butterscotch cream.',
    price: 1100,
    category: 'Birthday Cakes',
    imageUrl: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    ingredients: 'Butterscotch Crunch, Cashew Praline, Salted Caramel, Whipped Cream, Brown Sugar Sponge'
  },
  {
    _id: 'prod_bday_04',
    name: 'Floral Princess Birthday Cake',
    description: 'Elegant pastel pink strawberry sponge adorned with edible sugar flowers, pearl drops, and soft rosewater cream.',
    price: 1350,
    category: 'Birthday Cakes',
    imageUrl: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    ingredients: 'Edible Sugar Blooms, Rosewater Whipped Ganache, Strawberry Puree, White Chocolate Velvet'
  },

  // --- Pastries ---
  {
    _id: 'prod_pastry_01',
    name: 'Artisan Butter Croissant',
    description: 'Ultra flaky, multi-layered golden French croissant crafted with imported Normandy butter. Crisp outside, honeycomb inside.',
    price: 120,
    category: 'Pastries',
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: true,
    ingredients: 'Normandy Butter, Unbleached Wheat Flour, Spring Water, Sea Salt, Active Yeast'
  },
  {
    _id: 'prod_pastry_02',
    name: 'Almond Frangipane Danish',
    description: 'Crisp puff pastry folded over sweet roasted almond frangipane cream, dusted with toasted almond slivers.',
    price: 150,
    category: 'Pastries',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    ingredients: 'California Almonds, Frangipane Custard, Laminated Dough, Powdered Cane Sugar'
  },
  {
    _id: 'prod_pastry_03',
    name: 'Glazed Cinnamon Roll Pastry',
    description: 'Soft, buttery rolled pastry packed with aromatic Ceylon cinnamon and brown sugar, smothered in warm cream cheese glaze.',
    price: 140,
    category: 'Pastries',
    imageUrl: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    ingredients: 'Ceylon Cinnamon, Dark Brown Sugar, Cream Cheese Glaze, Butter Brioche Dough'
  },
  {
    _id: 'prod_pastry_04',
    name: 'Blueberry Cheesecake Pastry',
    description: 'Golden shortcrust pastry tart filled with creamy baked cheesecake and topped with wild blueberry compote.',
    price: 160,
    category: 'Pastries',
    imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    ingredients: 'Wild Blueberries, Cream Cheese, Butter Crust, Lemon Zest, Pure Cane Sugar'
  },

  // --- Cupcakes ---
  {
    _id: 'prod_cupcake_01',
    name: 'Belgian Chocolate Swirl Cupcakes (6-pack)',
    description: 'Six moist miniature chocolate cakes crowned with generous swirls of dark and milk chocolate buttercream.',
    price: 380,
    category: 'Cupcakes',
    imageUrl: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: true,
    ingredients: 'Belgian Cocoa, Buttercream, Chocolate Sprinkles, Farm Milk, Eggs'
  },
  {
    _id: 'prod_cupcake_02',
    name: 'Madagascan Vanilla Rose Cupcakes (6-pack)',
    description: 'Six delicate vanilla bean cupcakes decorated with handcrafted pastel pink and ivory buttercream rosettes.',
    price: 340,
    category: 'Cupcakes',
    imageUrl: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    ingredients: 'Madagascar Vanilla Pods, Sweet Butter, Fresh Cream, Wheat Flour, Cane Sugar'
  },
  {
    _id: 'prod_cupcake_03',
    name: 'Red Velvet Cream Frosting Cupcakes (6-pack)',
    description: 'Six bite-sized red velvet indulgences topped with tangy cream cheese frosting swirls and crimson cake crumbs.',
    price: 420,
    category: 'Cupcakes',
    imageUrl: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    ingredients: 'Cream Cheese Frosting, Cocoa, Buttermilk, Red Velvet Crumb, Butter'
  },
  {
    _id: 'prod_cupcake_04',
    name: 'Salted Caramel Pretzel Cupcakes (6-pack)',
    description: 'Six brown-sugar cupcakes filled with salted dulce de leche, caramel buttercream, and mini crunchy pretzels.',
    price: 450,
    category: 'Cupcakes',
    imageUrl: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    ingredients: 'Salted Caramel Drizzle, Baked Pretzels, Dulce de Leche, Brown Sugar Sponge'
  },

  // --- Cookies ---
  {
    _id: 'prod_cookie_01',
    name: 'Classic Chocolate Chip Cookies (12-pack)',
    description: 'Crisp chewy golden cookies generously studded with premium dark chocolate chunks and finished with a pinch of flaky sea salt.',
    price: 290,
    category: 'Cookies',
    imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: true,
    ingredients: '55% Dark Chocolate Chips, Brown Sugar, Pure Butter, Vanilla, Flaky Sea Salt'
  },
  {
    _id: 'prod_cookie_02',
    name: 'Danish Butter Shortbread Cookies (12-pack)',
    description: 'Traditional melt-in-your-mouth European butter cookies with intricate piped patterns, baked until golden.',
    price: 260,
    category: 'Cookies',
    imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    ingredients: 'European Cultured Butter, Powdered Sugar, Pastry Flour, Vanilla'
  },
  {
    _id: 'prod_cookie_03',
    name: 'Chewy Oatmeal Raisin Spiced Cookies (12-pack)',
    description: 'Hearty rolled whole oats blended with plump golden sultanas, cinnamon, nutmeg, and dark molasses.',
    price: 270,
    category: 'Cookies',
    imageUrl: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    ingredients: 'Rolled Whole Oats, Golden Sultanas, Ceylon Cinnamon, Nutmeg, Brown Butter'
  },
  {
    _id: 'prod_cookie_04',
    name: 'Double Chocolate Fudge Cookies (10-pack)',
    description: 'Deep cocoa brownie cookies with molten chocolate centers and roasted walnuts.',
    price: 320,
    category: 'Cookies',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    ingredients: '70% Dark Chocolate, Dutch Cocoa Powder, Roasted Walnuts, Molasses'
  },

  // --- Bread ---
  {
    _id: 'prod_bread_01',
    name: 'Wild Ferment Sourdough Country Loaf',
    description: 'Naturally fermented 36-hour artisan sourdough loaf with a blistered crispy crust and an open, custardy crumb.',
    price: 190,
    category: 'Bread',
    imageUrl: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: true,
    ingredients: 'Stone-ground Whole Wheat Flour, Natural Sourdough Starter, Mineral Water, Sea Salt'
  },
  {
    _id: 'prod_bread_02',
    name: '7-Grain Artisanal Harvest Bread',
    description: 'Nutritious wholesome loaf packed with toasted flax seeds, sunflower seeds, pumpkin seeds, oats, and chia.',
    price: 180,
    category: 'Bread',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    ingredients: 'Malted Rye, Whole Oats, Sunflower Seeds, Flax Seeds, Honey, Sea Salt'
  },
  {
    _id: 'prod_bread_03',
    name: 'French Crisp Baguette',
    description: 'Traditional Parisian baguette with a crackling golden crust, creamy airy interior, and signature sourdough aroma.',
    price: 120,
    category: 'Bread',
    imageUrl: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    ingredients: 'French T55 Flour, Poolish Starter, Spring Water, Salt, Yeast'
  },
  {
    _id: 'prod_bread_04',
    name: 'Soft Roasted Garlic Herb Brioche',
    description: 'Pillow-soft butter brioche braided with roasted garlic cloves, rosemary, thyme, and grated aged parmesan.',
    price: 210,
    category: 'Bread',
    imageUrl: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    ingredients: 'Pure Butter, Slow-roasted Garlic, Fresh Rosemary, Farm Eggs, Flour'
  },

  // --- Donuts ---
  {
    _id: 'prod_donut_01',
    name: 'Classic Vanilla Glazed Donuts (6-pack)',
    description: 'Six feather-light yeasted donuts dipped in a sweet crystalline vanilla bean glaze that crackles with every bite.',
    price: 300,
    category: 'Donuts',
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: true,
    ingredients: 'Enriched Brioche Dough, Pure Cane Vanilla Glaze, Sea Salt, Farm Butter'
  },
  {
    _id: 'prod_donut_02',
    name: 'Dark Chocolate Sprinkle Donuts (6-pack)',
    description: 'Fluffy golden donuts smothered in rich dark chocolate icing and covered in colorful festival sprinkles.',
    price: 330,
    category: 'Donuts',
    imageUrl: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    ingredients: 'Dark Chocolate Icing, Rainbow Confetti, Brioche Dough, Milk, Butter'
  },
  {
    _id: 'prod_donut_03',
    name: 'Boston Bavarian Cream Donuts (4-pack)',
    description: 'Plump pillowy donuts generously piped with velvety Bavarian custard cream and topped with glossy dark ganache.',
    price: 280,
    category: 'Donuts',
    imageUrl: 'https://images.unsplash.com/photo-1527515545081-5db817172677?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    ingredients: 'Bavarian Vanilla Custard, Dark Chocolate Ganache, Yeasted Brioche'
  },
  {
    _id: 'prod_donut_04',
    name: 'Wild Berry Jam Filled Donuts (4-pack)',
    description: 'Four sugar-dusted artisan donuts filled to bursting with house-made raspberry and strawberry jam.',
    price: 260,
    category: 'Donuts',
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    ingredients: 'House-made Wild Berry Preserves, Superfine Granulated Sugar, Brioche Dough'
  },

  // --- Chocolates ---
  {
    _id: 'prod_choc_01',
    name: 'Artisanal Belgian Truffle Box (12 pcs)',
    description: 'Luxury handcrafted assortment including Dark Cocoa Ganache, Salted Butter Caramel, Hazelnut Gianduja, and Espresso.',
    price: 550,
    category: 'Chocolates',
    imageUrl: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: true,
    ingredients: 'Belgian Couverture Chocolate, Dairy Cream, Espresso Liqueur, Salted Caramel'
  },
  {
    _id: 'prod_choc_02',
    name: 'Roasted Hazelnut Praline Bonbons (10 pcs)',
    description: 'Crispy caramelized Piedmont hazelnut praline enveloped in smooth 64% dark chocolate shells with gold luster.',
    price: 490,
    category: 'Chocolates',
    imageUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    ingredients: 'Piedmont Hazelnuts, Cocoa Butter, 64% Dark Couverture, Edible Gold Leaf'
  },
  {
    _id: 'prod_choc_03',
    name: 'Single Origin 72% Dark Chocolate Slab',
    description: 'Hand-poured artisan dark chocolate bar sprinkled with roasted almond slivers, freeze-dried raspberries, and pink rock salt.',
    price: 250,
    category: 'Chocolates',
    imageUrl: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    ingredients: '72% Madagascar Cocoa Beans, Roasted Almonds, Freeze-dried Raspberries, Himalayan Pink Salt'
  },
  {
    _id: 'prod_choc_04',
    name: 'White Chocolate Pistachio Crunch (8 pcs)',
    description: 'Silky Swiss white chocolate infused with Persian cardamom, crunchy roasted pistachios, and dried rose petals.',
    price: 420,
    category: 'Chocolates',
    imageUrl: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    ingredients: 'Swiss White Chocolate, Persian Cardamom, Roasted Pistachios, Edible Rose Petals'
  },

  // --- Desserts ---
  {
    _id: 'prod_dessert_01',
    name: 'Traditional Italian Espresso Tiramisu',
    description: 'House-baked Savoiardi ladyfingers steeped in strong Italian espresso and amaretto, layered with velvety whipped mascarpone and Valrhona cocoa.',
    price: 320,
    category: 'Desserts',
    imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: true,
    ingredients: 'Italian Mascarpone, Arabica Espresso, Savoiardi Biscuits, Valrhona Dutch Cocoa'
  },
  {
    _id: 'prod_dessert_02',
    name: 'Alphonso Mango Velvet Panna Cotta',
    description: 'Silky smooth vanilla bean panna cotta topped with a vibrant reduction of pure Ratnagiri Alphonso mango puree and fresh mint.',
    price: 260,
    category: 'Desserts',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    ingredients: 'Ratnagiri Alphonso Mango, Heavy Cream, Vanilla Bean, Gelatin, Fresh Mint'
  },
  {
    _id: 'prod_dessert_03',
    name: 'Warm Dark Chocolate Molten Lava Cake',
    description: 'Individual decadent dark chocolate sponge that opens to a gushing stream of hot molten fudge. Best served warm.',
    price: 280,
    category: 'Desserts',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    ingredients: '70% Dark Chocolate, Farm Eggs, French Butter, Cane Sugar, Pastry Flour'
  },
  {
    _id: 'prod_dessert_04',
    name: 'Caramelized Vanilla Crème Brûlée Tart',
    description: 'Crisp buttery tart shell filled with luscious vanilla custard, torched to order with a glassy caramelized amber sugar crust.',
    price: 240,
    category: 'Desserts',
    imageUrl: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=800&auto=format&fit=crop&q=80',
    available: true,
    featured: false,
    ingredients: 'Egg Yolks, Heavy Cream, Madagascar Vanilla Pods, Turbinado Sugar, Butter Shortcrust'
  }
];

// Complete list of categories as requested by the user
export const BAKERY_CATEGORIES = [
  'All',
  'Cakes',
  'Birthday Cakes',
  'Pastries',
  'Cupcakes',
  'Cookies',
  'Bread',
  'Donuts',
  'Chocolates',
  'Desserts'
];

// Helper to normalize and match category
export const matchCategory = (productCategory, selectedCategory) => {
  if (!selectedCategory || selectedCategory === 'All') return true;
  if (!productCategory) return false;

  const prodNorm = productCategory.trim().toLowerCase();
  const selNorm = selectedCategory.trim().toLowerCase();

  if (prodNorm === selNorm) return true;

  // Handle Bread / Breads pluralization
  if ((selNorm === 'bread' || selNorm === 'breads') && (prodNorm === 'bread' || prodNorm === 'breads')) {
    return true;
  }

  // Handle Birthday Cake / Birthday Cakes
  if (selNorm.includes('birthday') && prodNorm.includes('birthday')) {
    return true;
  }

  // Handle Cakes (avoid false positive with Birthday Cakes unless Cakes is selected)
  if (selNorm === 'cakes') {
    return prodNorm === 'cakes';
  }

  return prodNorm.includes(selNorm) || selNorm.includes(prodNorm);
};
