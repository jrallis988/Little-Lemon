/**
 * PetSmart redesign — content & commerce data layer
 * Separated from presentation for scalability
 */
const PetSmartData = (() => {
  const categories = [
    { id: 'dog-food', name: 'Dog Food', slug: 'dog-food', pet: 'dog', image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&q=80' },
    { id: 'cat-food', name: 'Cat Food', slug: 'cat-food', pet: 'cat', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80' },
    { id: 'toys', name: 'Toys & Play', slug: 'toys', pet: 'all', image: 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=600&q=80' },
    { id: 'health', name: 'Health & Wellness', slug: 'health', pet: 'all', image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&q=80' },
    { id: 'grooming-supplies', name: 'Grooming Supplies', slug: 'grooming-supplies', pet: 'all', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&q=80' },
    { id: 'habitats', name: 'Habitats & Aquariums', slug: 'habitats', pet: 'fish', image: 'https://images.unsplash.com/photo-1522069169874-b58dc027e691?w=600&q=80' },
  ];

  const products = [
    { id: 'p1', name: 'Hill\'s Science Diet Adult Chicken & Barley', brand: 'Hill\'s', category: 'dog-food', price: 54.99, salePrice: 47.99, rating: 4.8, reviews: 1240, image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&q=80', badge: 'Best Seller' },
    { id: 'p2', name: 'Purina Pro Plan Sensitive Skin & Stomach Salmon', brand: 'Purina', category: 'dog-food', price: 62.99, rating: 4.7, reviews: 892, image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&q=80' },
    { id: 'p3', name: 'Blue Buffalo Wilderness High Protein Chicken', brand: 'Blue Buffalo', category: 'dog-food', price: 58.49, salePrice: 52.99, rating: 4.6, reviews: 654, image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3eb?w=400&q=80', badge: 'Sale' },
    { id: 'p4', name: 'Purina ONE Indoor Advantage Cat Food', brand: 'Purina', category: 'cat-food', price: 28.99, rating: 4.7, reviews: 2103, image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80', badge: 'Best Seller' },
    { id: 'p5', name: 'Royal Canin Indoor Adult Dry Cat Food', brand: 'Royal Canin', category: 'cat-food', price: 34.99, rating: 4.8, reviews: 1567, image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&q=80' },
    { id: 'p6', name: 'KONG Classic Dog Toy — Large', brand: 'KONG', category: 'toys', price: 14.99, rating: 4.9, reviews: 4521, image: 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=400&q=80', badge: 'Top Rated' },
    { id: 'p7', name: 'Frisco Plush Squeaky Dog Toy Set', brand: 'Frisco', category: 'toys', price: 12.99, salePrice: 9.99, rating: 4.5, reviews: 890, image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80' },
    { id: 'p8', name: 'NexGard Chewables for Dogs 24.1–60 lbs', brand: 'NexGard', category: 'health', price: 68.99, rating: 4.6, reviews: 743, image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&q=80' },
    { id: 'p9', name: 'FURminator Undercoat Deshedding Tool', brand: 'FURminator', category: 'grooming-supplies', price: 34.99, rating: 4.8, reviews: 3201, image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&q=80', badge: 'Best Seller' },
    { id: 'p10', name: 'Aqueon LED Aquarium Kit 20 Gallon', brand: 'Aqueon', category: 'habitats', price: 129.99, salePrice: 109.99, rating: 4.4, reviews: 412, image: 'https://images.unsplash.com/photo-1522069169874-b58dc027e691?w=400&q=80' },
    { id: 'p11', name: 'Wellness CORE Grain-Free Turkey & Chicken', brand: 'Wellness', category: 'dog-food', price: 49.99, rating: 4.7, reviews: 978, image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&q=80' },
    { id: 'p12', name: 'Temptations Classic Tasty Chicken Treats', brand: 'Temptations', category: 'cat-food', price: 5.99, rating: 4.9, reviews: 8901, image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&q=80', badge: 'Top Rated' },
  ];

  const articles = [
    { id: 'bringing-home', title: 'Bringing Home a New Pet: Your First-Week Checklist', topic: 'New Pet', excerpt: 'Everything you need for a smooth transition — from supplies to routines that help your pet feel safe.', image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&q=80', readTime: '8 min' },
    { id: 'nutrition-basics', title: 'Pet Nutrition Basics: What to Look for on Labels', topic: 'Nutrition', excerpt: 'Learn how to compare ingredients, understand life-stage formulas, and choose food your pet will thrive on.', image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&q=80', readTime: '6 min' },
    { id: 'grooming-at-home', title: 'At-Home Grooming: Brushing, Bathing & Nail Care', topic: 'Grooming', excerpt: 'Step-by-step guidance for keeping coats healthy between professional grooming appointments.', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&q=80', readTime: '7 min' },
    { id: 'puppy-training', title: 'Puppy Training Foundations: Start with Consistency', topic: 'Training', excerpt: 'Positive reinforcement techniques that build trust and set your puppy up for a lifetime of good behavior.', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80', readTime: '10 min' },
    { id: 'seasonal-safety', title: 'Seasonal Pet Safety: Heat, Cold & Holiday Hazards', topic: 'Safety', excerpt: 'Protect your pets year-round with practical tips for weather extremes and common household risks.', image: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=600&q=80', readTime: '5 min' },
    { id: 'senior-pet-care', title: 'Caring for Senior Pets: Comfort & Quality of Life', topic: 'Health', excerpt: 'How to adapt nutrition, exercise, and vet care as your companion enters their golden years.', image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80', readTime: '9 min' },
  ];

  const stores = [
    { id: 's1', name: 'PetSmart Manchester', address: '1525 S Willow St', city: 'Manchester', state: 'NH', zip: '03103', phone: '(603) 555-0142', hours: 'Mon–Sat 9am–9pm, Sun 10am–7pm', services: ['Grooming', 'Training', 'Doggie Day Camp', 'Adoption'], lat: 42.96, lng: -71.43 },
    { id: 's2', name: 'PetSmart Nashua', address: '228 Daniel Webster Hwy', city: 'Nashua', state: 'NH', zip: '03060', phone: '(603) 555-0198', hours: 'Mon–Sat 9am–9pm, Sun 10am–7pm', services: ['Grooming', 'Training', 'Adoption'], lat: 42.73, lng: -71.47 },
    { id: 's3', name: 'PetSmart Portsmouth', address: '775 Lafayette Rd', city: 'Portsmouth', state: 'NH', zip: '03801', phone: '(603) 555-0167', hours: 'Mon–Sat 9am–9pm, Sun 10am–7pm', services: ['Grooming', 'Doggie Day Camp', 'Adoption'], lat: 43.07, lng: -70.78 },
    { id: 's4', name: 'PetSmart Concord', address: '240 Loudon Rd', city: 'Concord', state: 'NH', zip: '03301', phone: '(603) 555-0134', hours: 'Mon–Sat 9am–9pm, Sun 10am–7pm', services: ['Grooming', 'Training', 'Adoption'], lat: 43.22, lng: -71.52 },
  ];

  const services = [
    { id: 'grooming', name: 'Grooming Salon', description: 'Professional baths, haircuts, nail trims, and spa treatments for dogs and cats.', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&q=80', cta: 'Book grooming' },
    { id: 'training', name: 'Dog Training', description: 'Group classes and private sessions using positive reinforcement for puppies and adult dogs.', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80', cta: 'View classes' },
    { id: 'day-camp', name: 'Doggie Day Camp', description: 'Supervised play, socialization, and exercise in a safe, climate-controlled environment.', image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80', cta: 'Reserve a spot' },
    { id: 'vet', name: 'Veterinary Connections', description: 'Find Banfield Pet Hospital locations and wellness plans inside select PetSmart stores.', image: 'https://images.unsplash.com/photo-1628009368231-7bb8d5fcef4c?w=600&q=80', cta: 'Find vet care' },
  ];

  function getCategory(slug) {
    return categories.find((c) => c.slug === slug || c.id === slug);
  }

  function getProducts({ category, query, sort, limit } = {}) {
    let result = [...products];
    if (category) {
      result = result.filter((p) => p.category === category);
    }
    if (query) {
      const q = query.toLowerCase();
      result = result.filter((p) =>
        `${p.name} ${p.brand}`.toLowerCase().includes(q)
      );
    }
    if (sort === 'price-asc') result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    if (sort === 'price-desc') result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);
    if (limit) result = result.slice(0, limit);
    return result;
  }

  function getProduct(id) {
    return products.find((p) => p.id === id);
  }

  function getArticle(id) {
    return articles.find((a) => a.id === id);
  }

  function getStore(id) {
    return stores.find((s) => s.id === id);
  }

  function formatPrice(amount) {
    return `$${amount.toFixed(2)}`;
  }

  function renderStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    let stars = '★'.repeat(full);
    if (half) stars += '½';
    return stars;
  }

  return {
    categories,
    products,
    articles,
    stores,
    services,
    getCategory,
    getProducts,
    getProduct,
    getArticle,
    getStore,
    formatPrice,
    renderStars,
  };
})();

if (typeof module !== 'undefined') module.exports = PetSmartData;
