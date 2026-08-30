/**
 * PetSmart redesign — content & commerce data layer
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
    { id: 'p1', name: "Hill's Science Diet Adult Chicken & Barley", brand: "Hill's", category: 'dog-food', price: 54.99, salePrice: 47.99, rating: 4.8, reviews: 1240, image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&q=80', badge: 'Best Seller', variants: [{ id: '15lb', label: '15 lb', price: 47.99 }, { id: '30lb', label: '30 lb', price: 79.99 }], description: 'Complete, balanced nutrition for adult dogs with chicken and barley. Supports healthy digestion and lean muscle.', reviewSnippets: [{ author: 'Megan R.', rating: 5, text: 'My Lab thrives on this — coat looks great and stool quality improved.' }, { author: 'Chris T.', rating: 4, text: 'Solid everyday food. Wish the 30 lb bag was on sale more often.' }] },
    { id: 'p2', name: 'Purina Pro Plan Sensitive Skin & Stomach Salmon', brand: 'Purina', category: 'dog-food', price: 62.99, rating: 4.7, reviews: 892, image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&q=80', variants: [{ id: '16lb', label: '16 lb', price: 62.99 }, { id: '30lb', label: '30 lb', price: 94.99 }], description: 'Formulated for dogs with sensitive digestion. Salmon as first ingredient plus probiotics.', reviewSnippets: [{ author: 'Alicia M.', rating: 5, text: 'Finally a food that doesn’t upset his stomach.' }] },
    { id: 'p3', name: 'Blue Buffalo Wilderness High Protein Chicken', brand: 'Blue Buffalo', category: 'dog-food', price: 58.49, salePrice: 52.99, rating: 4.6, reviews: 654, image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3eb?w=400&q=80', badge: 'Sale', variants: [{ id: '11lb', label: '11 lb', price: 52.99 }, { id: '24lb', label: '24 lb', price: 84.99 }], description: 'Grain-free high-protein formula inspired by the diet of wolves.', reviewSnippets: [{ author: 'Jordan P.', rating: 4, text: 'Dogs love the taste. A bit pricey but quality ingredients.' }] },
    { id: 'p4', name: 'Purina ONE Indoor Advantage Cat Food', brand: 'Purina', category: 'cat-food', price: 28.99, rating: 4.7, reviews: 2103, image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80', badge: 'Best Seller', variants: [{ id: '3lb', label: '3.5 lb', price: 14.99 }, { id: '16lb', label: '16 lb', price: 28.99 }], description: 'Helps control hairballs and supports healthy weight for indoor cats.', reviewSnippets: [{ author: 'Sam K.', rating: 5, text: 'Both cats cleaned their bowls. Less hairball mess.' }] },
    { id: 'p5', name: 'Royal Canin Indoor Adult Dry Cat Food', brand: 'Royal Canin', category: 'cat-food', price: 34.99, rating: 4.8, reviews: 1567, image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&q=80', variants: [{ id: '3lb', label: '3 lb', price: 18.99 }, { id: '7lb', label: '7 lb', price: 34.99 }], description: 'Precision nutrition for indoor adult cats with stool odor reduction.', reviewSnippets: [{ author: 'Priya N.', rating: 5, text: 'Vet recommended and worth every penny.' }] },
    { id: 'p6', name: 'KONG Classic Dog Toy — Large', brand: 'KONG', category: 'toys', price: 14.99, rating: 4.9, reviews: 4521, image: 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=400&q=80', badge: 'Top Rated', variants: [{ id: 'm', label: 'Medium', price: 11.99 }, { id: 'l', label: 'Large', price: 14.99 }, { id: 'xl', label: 'X-Large', price: 18.99 }], description: 'Durable rubber toy for stuffing treats and reducing boredom.', reviewSnippets: [{ author: 'Devin L.', rating: 5, text: 'Survived our power-chewer. Stuff with peanut butter.' }] },
    { id: 'p7', name: 'Frisco Plush Squeaky Dog Toy Set', brand: 'Frisco', category: 'toys', price: 12.99, salePrice: 9.99, rating: 4.5, reviews: 890, image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80', variants: [{ id: '3pk', label: '3-pack', price: 9.99 }], description: 'Soft plush toys with squeakers for interactive play.', reviewSnippets: [{ author: 'Nina W.', rating: 4, text: 'Great value set. One squeaker died quickly but dogs loved them.' }] },
    { id: 'p8', name: 'NexGard Chewables for Dogs 24.1–60 lbs', brand: 'NexGard', category: 'health', price: 68.99, rating: 4.6, reviews: 743, image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&q=80', variants: [{ id: '3mo', label: '3 doses', price: 68.99 }, { id: '6mo', label: '6 doses', price: 124.99 }], description: 'Monthly soft chew for flea and tick protection. Vet recommended.', reviewSnippets: [{ author: 'Omar H.', rating: 5, text: 'Easy to give — he thinks it’s a treat.' }] },
    { id: 'p9', name: 'FURminator Undercoat Deshedding Tool', brand: 'FURminator', category: 'grooming-supplies', price: 34.99, rating: 4.8, reviews: 3201, image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&q=80', badge: 'Best Seller', variants: [{ id: 'm', label: 'Medium dog', price: 34.99 }, { id: 'l', label: 'Large dog', price: 39.99 }], description: 'Removes loose undercoat without cutting the topcoat.', reviewSnippets: [{ author: 'Taylor B.', rating: 5, text: 'Cut shedding in half after two sessions.' }] },
    { id: 'p10', name: 'Aqueon LED Aquarium Kit 20 Gallon', brand: 'Aqueon', category: 'habitats', price: 129.99, salePrice: 109.99, rating: 4.4, reviews: 412, image: 'https://images.unsplash.com/photo-1522069169874-b58dc027e691?w=400&q=80', variants: [{ id: '20g', label: '20 Gallon', price: 109.99 }], description: 'Complete starter kit with LED lighting, filter, and heater.', reviewSnippets: [{ author: 'Riley C.', rating: 4, text: 'Good starter kit. Upgraded the filter later.' }] },
    { id: 'p11', name: 'Wellness CORE Grain-Free Turkey & Chicken', brand: 'Wellness', category: 'dog-food', price: 49.99, rating: 4.7, reviews: 978, image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&q=80', variants: [{ id: '12lb', label: '12 lb', price: 49.99 }, { id: '26lb', label: '26 lb', price: 89.99 }], description: 'Grain-free protein-focused recipe with turkey and chicken.', reviewSnippets: [{ author: 'Casey F.', rating: 5, text: 'Energy levels up, and no itchy skin.' }] },
    { id: 'p12', name: 'Temptations Classic Tasty Chicken Treats', brand: 'Temptations', category: 'cat-food', price: 5.99, rating: 4.9, reviews: 8901, image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&q=80', badge: 'Top Rated', variants: [{ id: '3oz', label: '3 oz', price: 2.99 }, { id: '16oz', label: '16 oz', price: 5.99 }], description: 'Crunchy outside, soft inside — cats go crazy for these.', reviewSnippets: [{ author: 'Alex J.', rating: 5, text: 'Training treat MVP. Never fails.' }] },
    { id: 'p13', name: 'Greenies Original Dental Chews', brand: 'Greenies', category: 'health', price: 24.99, rating: 4.7, reviews: 5320, image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80', badge: 'Best Seller', variants: [{ id: 'tees', label: 'Teenie 96ct', price: 24.99 }, { id: 'reg', label: 'Regular 36ct', price: 29.99 }], description: 'VOHC-accepted dental chews that clean teeth and freshen breath.', reviewSnippets: [{ author: 'Pat S.', rating: 5, text: 'Dentist noticed less tartar at checkup.' }] },
    { id: 'p14', name: 'Petmate Kennel Cab Travel Carrier', brand: 'Petmate', category: 'grooming-supplies', price: 44.99, rating: 4.5, reviews: 1102, image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80', variants: [{ id: 'md', label: 'Medium', price: 44.99 }, { id: 'lg', label: 'Large', price: 59.99 }], description: 'Airline-compatible hard-sided carrier for cats and small dogs.', reviewSnippets: [{ author: 'Jamie Q.', rating: 4, text: 'Sturdy and easy to clean. Cat calmed down once covered.' }] },
  ];

  const articles = [
    { id: 'bringing-home', title: 'Bringing Home a New Pet: Your First-Week Checklist', topic: 'New Pet', excerpt: 'Everything you need for a smooth transition — from supplies to routines that help your pet feel safe.', image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&q=80', readTime: '8 min', author: 'Pet Care Team', date: 'March 2026' },
    { id: 'nutrition-basics', title: 'Pet Nutrition Basics: What to Look for on Labels', topic: 'Nutrition', excerpt: 'Learn how to compare ingredients, understand life-stage formulas, and choose food your pet will thrive on.', image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&q=80', readTime: '6 min', author: 'Nutrition Desk', date: 'February 2026' },
    { id: 'grooming-at-home', title: 'At-Home Grooming: Brushing, Bathing & Nail Care', topic: 'Grooming', excerpt: 'Step-by-step guidance for keeping coats healthy between professional grooming appointments.', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&q=80', readTime: '7 min', author: 'Grooming Team', date: 'January 2026' },
    { id: 'puppy-training', title: 'Puppy Training Foundations: Start with Consistency', topic: 'Training', excerpt: 'Positive reinforcement techniques that build trust and set your puppy up for a lifetime of good behavior.', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80', readTime: '10 min', author: 'Training Academy', date: 'March 2026' },
    { id: 'seasonal-safety', title: 'Seasonal Pet Safety: Heat, Cold & Holiday Hazards', topic: 'Safety', excerpt: 'Protect your pets year-round with practical tips for weather extremes and common household risks.', image: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=600&q=80', readTime: '5 min', author: 'Pet Care Team', date: 'December 2025' },
    { id: 'senior-pet-care', title: 'Caring for Senior Pets: Comfort & Quality of Life', topic: 'Health', excerpt: 'How to adapt nutrition, exercise, and vet care as your companion enters their golden years.', image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80', readTime: '9 min', author: 'Wellness Desk', date: 'February 2026' },
  ];

  const stores = [
    { id: 's1', name: 'PetSmart Manchester', address: '1525 S Willow St', city: 'Manchester', state: 'NH', zip: '03103', phone: '(603) 555-0142', hours: 'Mon–Sat 9am–9pm, Sun 10am–7pm', services: ['Grooming', 'Training', 'Doggie Day Camp', 'Adoption'], lat: 42.96, lng: -71.43 },
    { id: 's2', name: 'PetSmart Nashua', address: '228 Daniel Webster Hwy', city: 'Nashua', state: 'NH', zip: '03060', phone: '(603) 555-0198', hours: 'Mon–Sat 9am–9pm, Sun 10am–7pm', services: ['Grooming', 'Training', 'Adoption'], lat: 42.73, lng: -71.47 },
    { id: 's3', name: 'PetSmart Portsmouth', address: '775 Lafayette Rd', city: 'Portsmouth', state: 'NH', zip: '03801', phone: '(603) 555-0167', hours: 'Mon–Sat 9am–9pm, Sun 10am–7pm', services: ['Grooming', 'Doggie Day Camp', 'Adoption'], lat: 43.07, lng: -70.78 },
    { id: 's4', name: 'PetSmart Concord', address: '240 Loudon Rd', city: 'Concord', state: 'NH', zip: '03301', phone: '(603) 555-0134', hours: 'Mon–Sat 9am–9pm, Sun 10am–7pm', services: ['Grooming', 'Training', 'Adoption'], lat: 43.22, lng: -71.52 },
  ];

  const services = [
    { id: 'grooming', name: 'Grooming Salon', description: 'Professional baths, haircuts, nail trims, and spa treatments for dogs and cats.', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&q=80', cta: 'Book grooming', bookable: true },
    { id: 'training', name: 'Dog Training', description: 'Group classes and private sessions using positive reinforcement for puppies and adult dogs.', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80', cta: 'Book a class', bookable: true },
    { id: 'day-camp', name: 'Doggie Day Camp', description: 'Supervised play, socialization, and exercise in a safe, climate-controlled environment.', image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80', cta: 'Reserve a spot', bookable: true },
    { id: 'vet', name: 'Veterinary Connections', description: 'Find Banfield Pet Hospital locations and wellness plans inside select PetSmart stores.', image: 'https://images.unsplash.com/photo-1628009368231-7bb8d5fcef4c?w=600&q=80', cta: 'Find vet care', bookable: false },
  ];

  const bookingOptions = {
    grooming: [
      { id: 'bath', name: 'Bath & brush', price: 35, duration: '60–90 min' },
      { id: 'haircut', name: 'Haircut & style', price: 55, duration: '90–120 min' },
      { id: 'spa', name: 'Spa package', price: 65, duration: '2–3 hrs' },
    ],
    training: [
      { id: 'puppy', name: 'Puppy foundations', price: 119, duration: '6 weeks' },
      { id: 'intermediate', name: 'Intermediate skills', price: 139, duration: '6 weeks' },
      { id: 'private', name: 'Private session', price: 79, duration: '45 min' },
    ],
    'day-camp': [
      { id: 'half', name: 'Half day', price: 25, duration: 'Up to 5 hrs' },
      { id: 'full', name: 'Full day', price: 39, duration: 'Up to 10 hrs' },
      { id: 'pack', name: '5-day pack', price: 175, duration: '5 visits' },
    ],
  };

  const pets = [
    { id: 'pet1', name: 'Buddy', species: 'Dog', breed: 'Lab Mix', age: '2 years', gender: 'Male', size: 'Large', store: 's1', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80', story: 'Friendly and energetic — loves fetch and kids.', traits: ['Good with kids', 'House-trained', 'Active'] },
    { id: 'pet2', name: 'Luna', species: 'Cat', breed: 'Domestic Shorthair', age: '1 year', gender: 'Female', size: 'Medium', store: 's2', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80', story: 'Curious lap cat who purrs at first hello.', traits: ['Affectionate', 'Indoor', 'Playful'] },
    { id: 'pet3', name: 'Max', species: 'Dog', breed: 'Beagle', age: '4 years', gender: 'Male', size: 'Medium', store: 's3', image: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=600&q=80', story: 'Gentle walker with a nose for adventure.', traits: ['Leash-trained', 'Good with dogs', 'Curious'] },
    { id: 'pet4', name: 'Mochi', species: 'Cat', breed: 'Tabby', age: '3 years', gender: 'Female', size: 'Medium', store: 's1', image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&q=80', story: 'Calm companion who thrives in quiet homes.', traits: ['Quiet', 'Lap cat', 'Low energy'] },
    { id: 'pet5', name: 'Scout', species: 'Dog', breed: 'Terrier Mix', age: '8 months', gender: 'Female', size: 'Small', store: 's4', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80', story: 'Playful puppy ready for training and love.', traits: ['Puppy', 'Energetic', 'Learning basics'] },
    { id: 'pet6', name: 'Oliver', species: 'Cat', breed: 'Orange Tabby', age: '5 years', gender: 'Male', size: 'Large', store: 's2', image: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd46e?w=600&q=80', story: 'Affectionate senior-at-heart who enjoys sunny windows.', traits: ['Calm', 'Independent', 'Sunny spots'] },
    { id: 'pet7', name: 'Daisy', species: 'Dog', breed: 'Spaniel Mix', age: '3 years', gender: 'Female', size: 'Medium', store: 's3', image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80', story: 'Soft-hearted snuggler who loves afternoon walks.', traits: ['Gentle', 'Good with cats', 'Cuddly'] },
    { id: 'pet8', name: 'Pepper', species: 'Cat', breed: 'Tuxedo', age: '2 years', gender: 'Female', size: 'Small', store: 's4', image: 'https://images.unsplash.com/photo-1511044568932-338bbba0a0c5?w=600&q=80', story: 'Curious explorer with a playful streak and soft meow.', traits: ['Playful', 'Curious', 'Vocal'] },
  ];

  function getCategory(slug) {
    return categories.find((c) => c.slug === slug || c.id === slug);
  }

  function effectivePrice(p) {
    return p.salePrice || p.price;
  }

  function getProducts({ category, query, sort, limit, priceBands, brands } = {}) {
    let result = [...products];
    if (category) result = result.filter((p) => p.category === category);
    if (query) {
      const q = query.toLowerCase();
      result = result.filter((p) => `${p.name} ${p.brand}`.toLowerCase().includes(q));
    }
    if (brands && brands.length) result = result.filter((p) => brands.includes(p.brand));
    if (priceBands && priceBands.length) {
      result = result.filter((p) => {
        const price = effectivePrice(p);
        return priceBands.some((band) => {
          if (band === 'under-25') return price < 25;
          if (band === '25-50') return price >= 25 && price <= 50;
          if (band === '50-plus') return price > 50;
          return true;
        });
      });
    }
    if (sort === 'price-asc') result.sort((a, b) => effectivePrice(a) - effectivePrice(b));
    if (sort === 'price-desc') result.sort((a, b) => effectivePrice(b) - effectivePrice(a));
    if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);
    if (limit) result = result.slice(0, limit);
    return result;
  }

  function getProduct(id) { return products.find((p) => p.id === id); }
  function getArticle(id) { return articles.find((a) => a.id === id); }
  function getStore(id) { return stores.find((s) => s.id === id); }
  function getPets({ species, size } = {}) {
    let result = [...pets];
    if (species && species !== 'all') result = result.filter((p) => p.species.toLowerCase() === species.toLowerCase());
    if (size && size !== 'all') result = result.filter((p) => p.size === size);
    return result;
  }
  function getPet(id) { return pets.find((p) => p.id === id); }
  function getBookingOptions(serviceId) { return bookingOptions[serviceId] || []; }
  function brandsForCategory(category) {
    return [...new Set(products.filter((p) => !category || p.category === category).map((p) => p.brand))].sort();
  }
  function formatPrice(amount) { return `$${Number(amount).toFixed(2)}`; }
  function renderStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    return '★'.repeat(full) + (half ? '½' : '');
  }

  return {
    categories, products, articles, stores, services, pets, bookingOptions,
    getCategory, getProducts, getProduct, getArticle, getStore, getPets, getPet,
    getBookingOptions, brandsForCategory, formatPrice, renderStars,
  };
})();

if (typeof module !== 'undefined') module.exports = PetSmartData;
