/* ==========================================================================
   VoltEdge Electronics — main.js
   Vanilla ES6+. Cart & wishlist persist via localStorage (frontend demo only,
   no backend / payment processing of any kind).
   ========================================================================== */

/* ---------------------------------------------------------------------- */
/* Product catalog                                                         */
/* ---------------------------------------------------------------------- */
const PRODUCTS = [
  {
    id: "p01", name: "ProPhone 15 Series", brand: "Nova", category: "Smartphones",
    price: 999, originalPrice: 1099, rating: 4.8, reviews: 612,
    image: "https://images.unsplash.com/photo-1592286927505-1def25115558?q=80&w=900&auto=format&fit=crop",
    tags: ["trending", "bestseller"], badge: "New",
    description: "A titanium-frame flagship with a 6.7\" ProMotion display, triple-lens camera system and all-day battery life.",
    specs: ["6.7\" OLED, 120Hz ProMotion", "A-series 3nm chip", "48MP triple camera", "5,000mAh battery, 30W fast charge", "256GB storage"]
  },
  {
    id: "p02", name: "Galaxy Fold X", brand: "Samtech", category: "Smartphones",
    price: 1349, originalPrice: 1599, rating: 4.6, reviews: 284,
    image: "https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?q=80&w=900&auto=format&fit=crop",
    tags: ["new"], badge: "New Arrival",
    description: "A foldable powerhouse with a 7.6\" inner display, S-Pen support and a flagship triple camera array.",
    specs: ["7.6\" foldable AMOLED", "Snapdragon flagship chipset", "50MP wide + telephoto", "4,400mAh battery", "512GB storage"]
  },
  {
    id: "p03", name: "Pixel Vision 9", brand: "Orbit", category: "Smartphones",
    price: 699, originalPrice: 799, rating: 4.7, reviews: 401,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=900&auto=format&fit=crop",
    tags: ["trending"],
    description: "Clean software, a computational-photography camera, and a 6.3\" display built for everyday speed.",
    specs: ["6.3\" OLED, 90Hz", "Tensor-class chip", "50MP main sensor", "4,700mAh battery", "128GB storage"]
  },
  {
    id: "p04", name: "AirBook 13 Air", brand: "Nova", category: "Laptops",
    price: 1099, originalPrice: 1249, rating: 4.9, reviews: 738,
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=900&auto=format&fit=crop",
    tags: ["bestseller"], badge: "Best Seller",
    description: "A fanless, ultralight 13\" laptop with an 18-hour battery and a stunning Liquid Retina display.",
    specs: ["13.6\" Liquid Retina", "M-series 8-core chip", "16GB unified memory", "512GB SSD", "18-hr battery"]
  },
  {
    id: "p05", name: "XPS Studio 15", brand: "Vantec", category: "Laptops",
    price: 1799, originalPrice: 1999, rating: 4.7, reviews: 322,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=900&auto=format&fit=crop",
    tags: ["trending"],
    description: "A near-borderless 15\" InfinityEdge display paired with a 13th-gen processor for creative workloads.",
    specs: ["15.6\" 3.5K OLED touch", "14-core processor", "32GB RAM", "1TB SSD", "RTX-class graphics"]
  },
  {
    id: "p06", name: "StrikeForce Gaming Laptop", brand: "Raidon", category: "Gaming",
    price: 1699, originalPrice: 1999, rating: 4.6, reviews: 256,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=900&auto=format&fit=crop",
    tags: ["new", "trending"], badge: "New Arrival",
    description: "A 165Hz QHD gaming rig with per-key RGB, a vapor-chamber cooling system and desktop-class graphics.",
    specs: ["16\" QHD, 165Hz", "8-core gaming CPU", "32GB DDR5 RAM", "1TB NVMe SSD", "RTX-class GPU, 12GB VRAM"]
  },
  {
    id: "p07", name: "TabPro 12 Ultra", brand: "Orbit", category: "Tablets",
    price: 849, originalPrice: 949, rating: 4.5, reviews: 189,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=900&auto=format&fit=crop",
    tags: [],
    description: "A 12.9\" Liquid Retina-class tablet built for sketching, note-taking and full desktop-grade multitasking.",
    specs: ["12.9\" Mini-LED display", "8-core tablet chip", "8GB RAM", "256GB storage", "Stylus support"]
  },
  {
    id: "p08", name: "Vega 65\" QLED Smart TV", brand: "Vantec", category: "TVs",
    price: 999, originalPrice: 1299, rating: 4.7, reviews: 445,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=900&auto=format&fit=crop",
    tags: ["bestseller"], badge: "Best Seller",
    description: "A 65\" 4K QLED panel with quantum-dot color, 120Hz gaming support and a built-in smart hub.",
    specs: ["65\" 4K QLED, 120Hz", "Quantum-dot color", "HDR10+ & Dolby Vision", "Built-in smart hub", "4x HDMI 2.1"]
  },
  {
    id: "p09", name: "AuraSound Over-Ear Headphones", brand: "Sonari", category: "Headphones",
    price: 279, originalPrice: 349, rating: 4.8, reviews: 892,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=900&auto=format&fit=crop",
    tags: ["trending", "bestseller"], badge: "Best Seller",
    description: "Industry-leading adaptive noise cancellation with 30-hour battery life and studio-tuned drivers.",
    specs: ["Adaptive noise cancellation", "30-hr battery, fast charge", "40mm studio drivers", "Multipoint Bluetooth 5.3", "Foldable, travel case included"]
  },
  {
    id: "p10", name: "PulseFit Watch Series 9", brand: "Nova", category: "Smart Watches",
    price: 379, originalPrice: 429, rating: 4.6, reviews: 567,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=900&auto=format&fit=crop",
    tags: ["new"], badge: "New",
    description: "An always-on retina display, blood-oxygen sensing and up to 18 hours of battery in a titanium case.",
    specs: ["Always-on retina display", "Blood oxygen + ECG sensors", "GPS + cellular option", "18-hr battery", "50m water resistance"]
  },
  {
    id: "p11", name: "OrbitFit Galaxy Watch", brand: "Samtech", category: "Smart Watches",
    price: 289, originalPrice: 329, rating: 4.5, reviews: 312,
    image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?q=80&w=900&auto=format&fit=crop",
    tags: [],
    description: "A rotating bezel interface, sleep-coaching software and dual-band GPS in a sapphire-crystal case.",
    specs: ["1.4\" AMOLED display", "Sleep + body composition tracking", "Dual-band GPS", "40-hr battery", "Sapphire crystal glass"]
  },
  {
    id: "p12", name: "NightHawk RGB Gaming Mouse", brand: "Raidon", category: "Gaming",
    price: 59, originalPrice: 79, rating: 4.7, reviews: 723,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=900&auto=format&fit=crop",
    tags: ["bestseller"],
    description: "A 26,000 DPI optical sensor, hot-swappable side buttons and 100-hour wireless battery life.",
    specs: ["26,000 DPI optical sensor", "Hot-swappable buttons", "100-hr wireless battery", "Per-zone RGB lighting", "68g ultralight shell"]
  },
  {
    id: "p13", name: "HomeHub Central Smart Display", brand: "Orbit", category: "Smart Home",
    price: 129, originalPrice: 159, rating: 4.4, reviews: 218,
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=900&auto=format&fit=crop",
    tags: ["new"], badge: "New",
    description: "A 10\" smart display that controls lighting, climate and cameras from a single dashboard.",
    specs: ["10.1\" touch display", "Built-in voice assistant", "Matter & Thread compatible", "Multi-room audio", "Privacy camera shutter"]
  },
  {
    id: "p14", name: "GlowLine Smart Bulb Starter Kit", brand: "Lumio", category: "Smart Home",
    price: 49, originalPrice: 69, rating: 4.5, reviews: 456,
    image: "https://images.unsplash.com/photo-1565814636199-ae8133055c1f?q=80&w=900&auto=format&fit=crop",
    tags: ["trending"],
    description: "Four color-tunable smart bulbs with scheduling, scenes and voice-assistant compatibility.",
    specs: ["16 million colors", "App scheduling & scenes", "Voice assistant compatible", "No hub required", "4-pack starter kit"]
  },
  {
    id: "p15", name: "FlexCharge 3-in-1 Wireless Pad", brand: "Vantec", category: "Accessories",
    price: 45, originalPrice: 59, rating: 4.3, reviews: 341,
    image: "https://images.unsplash.com/photo-1587033411391-5d9e51cce126?q=80&w=900&auto=format&fit=crop",
    tags: [],
    description: "Charge your phone, watch and earbuds simultaneously with this fast-charging folding pad.",
    specs: ["15W fast wireless charging", "Charges 3 devices at once", "Folding travel design", "LED charge indicator", "USB-C powered"]
  },
  {
    id: "p16", name: "HubLink 8-Port USB-C Dock", brand: "Vantec", category: "Accessories",
    price: 69, originalPrice: 89, rating: 4.6, reviews: 198,
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?q=80&w=900&auto=format&fit=crop",
    tags: ["trending"],
    description: "An 8-port docking hub with 4K HDMI output, gigabit ethernet and 100W pass-through charging.",
    specs: ["4K@60Hz HDMI output", "Gigabit ethernet port", "100W USB-C power delivery", "SD & microSD card slots", "3x USB-A 3.0 ports"]
  },
  {
    id: "p17", name: "SkyBook Pro 14", brand: "Samtech", category: "Laptops",
    price: 1299, originalPrice: 1449, rating: 4.5, reviews: 176,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=900&auto=format&fit=crop",
    tags: ["new"], badge: "New Arrival",
    description: "A 14\" 2-in-1 convertible with a 3K AMOLED touchscreen and all-day battery for hybrid work.",
    specs: ["14\" 3K AMOLED touch", "12-core processor", "16GB RAM", "1TB SSD", "360° convertible hinge"]
  },
  {
    id: "p18", name: "ArenaView 27\" Gaming Monitor", brand: "Raidon", category: "Gaming",
    price: 349, originalPrice: 429, rating: 4.7, reviews: 264,
    image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=900&auto=format&fit=crop",
    tags: ["bestseller"],
    description: "A 27\" QHD panel with a 240Hz refresh rate, 1ms response time and G-Sync compatible tech.",
    specs: ["27\" QHD IPS panel", "240Hz refresh rate", "1ms response time", "G-Sync compatible", "HDR400"]
  }
];

const CATEGORY_IMAGES = {
  "Smartphones": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=700&auto=format&fit=crop",
  "Laptops": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=700&auto=format&fit=crop",
  "Tablets": "https://images.unsplash.com/photo-1561154464-82e9adf32764?q=80&w=700&auto=format&fit=crop",
  "TVs": "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=700&auto=format&fit=crop",
  "Headphones": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=700&auto=format&fit=crop",
  "Smart Watches": "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=700&auto=format&fit=crop",
  "Gaming": "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=700&auto=format&fit=crop",
  "Smart Home": "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=700&auto=format&fit=crop",
  "Accessories": "https://images.unsplash.com/photo-1625948515291-69613efd103f?q=80&w=700&auto=format&fit=crop"
};

/* ---------------------------------------------------------------------- */
/* Cart & wishlist (localStorage — frontend demo only)                     */
/* ---------------------------------------------------------------------- */
const Store = {
  getCart() {
    try { return JSON.parse(localStorage.getItem("ve_cart")) || {}; }
    catch { return {}; }
  },
  setCart(cart) { localStorage.setItem("ve_cart", JSON.stringify(cart)); },
  getWishlist() {
    try { return JSON.parse(localStorage.getItem("ve_wishlist")) || []; }
    catch { return []; }
  },
  setWishlist(list) { localStorage.setItem("ve_wishlist", JSON.stringify(list)); },

  addToCart(id, qty = 1) {
    const cart = this.getCart();
    cart[id] = (cart[id] || 0) + qty;
    this.setCart(cart);
    updateNavCounts();
  },
  removeFromCart(id) {
    const cart = this.getCart();
    delete cart[id];
    this.setCart(cart);
    updateNavCounts();
  },
  setCartQty(id, qty) {
    const cart = this.getCart();
    if (qty <= 0) delete cart[id];
    else cart[id] = qty;
    this.setCart(cart);
    updateNavCounts();
  },
  cartCount() {
    const cart = this.getCart();
    return Object.values(cart).reduce((a, b) => a + b, 0);
  },
  toggleWishlist(id) {
    let list = this.getWishlist();
    if (list.includes(id)) list = list.filter(x => x !== id);
    else list.push(id);
    this.setWishlist(list);
    updateNavCounts();
    return list.includes(id);
  }
};

function updateNavCounts() {
  document.querySelectorAll("[data-cart-count]").forEach(el => {
    el.textContent = Store.cartCount();
    el.classList.toggle("hidden", Store.cartCount() === 0);
  });
  document.querySelectorAll("[data-wishlist-count]").forEach(el => {
    el.textContent = Store.getWishlist().length;
    el.classList.toggle("hidden", Store.getWishlist().length === 0);
  });
}

/* ---------------------------------------------------------------------- */
/* Toast                                                                    */
/* ---------------------------------------------------------------------- */
function showToast(message, icon = "check-circle") {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i data-lucide="${icon}" class="w-4 h-4 text-[var(--cyan)]"></i><span>${message}</span>`;
  if (window.lucide) lucide.createIcons();
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 2400);
}

/* ---------------------------------------------------------------------- */
/* Product card + star rating markup                                       */
/* ---------------------------------------------------------------------- */
function starRow(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  let s = "★".repeat(full);
  if (half) s += "½";
  return s;
}

function discountPct(p) {
  return Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
}

function productCardHTML(p) {
  const wished = Store.getWishlist().includes(p.id);
  return `
  <article class="product-card reveal" data-id="${p.id}" data-category="${p.category}" data-price="${p.price}" data-rating="${p.rating}" data-name="${p.name.toLowerCase()}" data-brand="${p.brand.toLowerCase()}">
    <div class="img-wrap h-48 md:h-52">
      <span class="discount-tag">-${discountPct(p)}%</span>
      <button class="wishlist-btn ${wished ? "active" : ""}" aria-label="Toggle wishlist for ${p.name}" data-wishlist-toggle="${p.id}">
        <i data-lucide="heart" class="w-4 h-4"></i>
      </button>
      <img src="${p.image}" alt="${p.brand} ${p.name}" loading="lazy" class="w-full h-full object-cover">
      <button class="quickview-btn btn btn-dark btn-sm" data-quickview="${p.id}">
        <i data-lucide="eye" class="w-3.5 h-3.5"></i> Quick View
      </button>
    </div>
    <div class="p-5">
      <p class="text-[0.68rem] uppercase tracking-widest text-[var(--electric)] font-semibold mb-1">${p.brand}</p>
      <h3 class="font-display text-base leading-snug mb-1.5 line-clamp-2">${p.name}</h3>
      <div class="flex items-center gap-1.5 mb-3">
        <span class="star-row">${starRow(p.rating)}</span>
        <span class="text-xs text-[var(--gray-500)]">${p.rating} (${p.reviews})</span>
      </div>
      <div class="flex items-baseline gap-2 mb-4">
        <span class="font-display text-xl font-tabular">$${p.price}</span>
        <span class="text-sm text-[var(--gray-500)] line-through font-tabular">$${p.originalPrice}</span>
      </div>
      <div class="flex gap-2">
        <a href="product-details.html?id=${p.id}" class="btn btn-ghost btn-sm flex-1 justify-center">Details</a>
        <button class="btn btn-primary btn-sm flex-1 justify-center" data-add-cart="${p.id}">
          <i data-lucide="shopping-cart" class="w-3.5 h-3.5"></i> Add
        </button>
      </div>
    </div>
  </article>`;
}

function bindCardEvents(container) {
  container.querySelectorAll("[data-add-cart]").forEach(btn => {
    btn.addEventListener("click", () => {
      Store.addToCart(btn.dataset.addCart, 1);
      const p = PRODUCTS.find(x => x.id === btn.dataset.addCart);
      showToast(`${p.name} added to cart`, "shopping-cart");
    });
  });
  container.querySelectorAll("[data-wishlist-toggle]").forEach(btn => {
    btn.addEventListener("click", () => {
      const active = Store.toggleWishlist(btn.dataset.wishlistToggle);
      btn.classList.toggle("active", active);
      showToast(active ? "Added to wishlist" : "Removed from wishlist", "heart");
    });
  });
  container.querySelectorAll("[data-quickview]").forEach(btn => {
    btn.addEventListener("click", () => openQuickView(btn.dataset.quickview));
  });
  observeReveals();
  if (window.lucide) lucide.createIcons();
}

/* ---------------------------------------------------------------------- */
/* Scroll reveal                                                           */
/* ---------------------------------------------------------------------- */
let revealObserver;
function observeReveals() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("in-view"); revealObserver.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
  }
  document.querySelectorAll(".reveal:not(.in-view)").forEach(el => revealObserver.observe(el));
}

/* ---------------------------------------------------------------------- */
/* Nav / mobile menu                                                       */
/* ---------------------------------------------------------------------- */
function initNav() {
  const nav = document.getElementById("site-nav");
  if (nav) {
    const onScroll = () => nav.classList.toggle("nav-scrolled", window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
  const menuBtn = document.getElementById("mobile-menu-btn");
  const closeBtn = document.getElementById("mobile-menu-close");
  const mobileMenu = document.getElementById("mobile-menu");
  menuBtn?.addEventListener("click", () => { mobileMenu.classList.add("open"); document.body.style.overflow = "hidden"; });
  closeBtn?.addEventListener("click", closeMenu);
  mobileMenu?.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));
  function closeMenu() { mobileMenu.classList.remove("open"); document.body.style.overflow = ""; }
}

/* ---------------------------------------------------------------------- */
/* Search (header)                                                         */
/* ---------------------------------------------------------------------- */
function initHeaderSearch() {
  const form = document.getElementById("header-search-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = document.getElementById("header-search-input").value.trim();
    window.location.href = `products.html?search=${encodeURIComponent(q)}`;
  });
}

/* ---------------------------------------------------------------------- */
/* Flash deals countdown                                                   */
/* ---------------------------------------------------------------------- */
function initCountdown() {
  const el = document.getElementById("flash-countdown");
  if (!el) return;
  let deadline = parseInt(localStorage.getItem("ve_deal_deadline"), 10);
  if (!deadline || deadline < Date.now()) {
    deadline = Date.now() + 1000 * 60 * 60 * 26; // ~26 hours from first visit
    localStorage.setItem("ve_deal_deadline", deadline);
  }
  function tick() {
    const diff = Math.max(0, deadline - Date.now());
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    el.querySelector("[data-h]").textContent = String(h).padStart(2, "0");
    el.querySelector("[data-m]").textContent = String(m).padStart(2, "0");
    el.querySelector("[data-s]").textContent = String(s).padStart(2, "0");
  }
  tick();
  setInterval(tick, 1000);
}

/* ---------------------------------------------------------------------- */
/* Homepage sections: flash deals, categories, tabs                        */
/* ---------------------------------------------------------------------- */
function renderFlashDeals() {
  const el = document.getElementById("flash-deals-grid");
  if (!el) return;
  const deals = [...PRODUCTS].sort((a, b) => discountPct(b) - discountPct(a)).slice(0, 4);
  el.innerHTML = deals.map(productCardHTML).join("");
  bindCardEvents(el);
}

function renderCategories() {
  const el = document.getElementById("category-grid");
  if (!el) return;
  el.innerHTML = Object.entries(CATEGORY_IMAGES).map(([name, img]) => `
    <a href="products.html?category=${encodeURIComponent(name)}" class="category-card reveal block h-40 md:h-48">
      <img src="${img}" alt="${name} category" loading="lazy" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-[var(--navy-950)]/85 via-[var(--navy-950)]/10 to-transparent"></div>
      <div class="absolute bottom-0 left-0 p-4">
        <p class="text-white font-display text-sm md:text-base">${name}</p>
      </div>
    </a>`).join("");
  observeReveals();
}

function initHomeTabs() {
  const tabs = document.querySelectorAll("[data-tab]");
  const grid = document.getElementById("tabbed-grid");
  if (!tabs.length || !grid) return;

  function render(tag) {
    const list = PRODUCTS.filter(p => p.tags.includes(tag)).slice(0, 8);
    grid.innerHTML = (list.length ? list : PRODUCTS.slice(0, 8)).map(productCardHTML).join("");
    bindCardEvents(grid);
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      render(tab.dataset.tab);
    });
  });

  render(tabs[0].dataset.tab);
}

/* ---------------------------------------------------------------------- */
/* Products listing page: filters, sort, search                            */
/* ---------------------------------------------------------------------- */
function initProductListing() {
  const grid = document.getElementById("product-listing-grid");
  if (!grid) return;

  const params = new URLSearchParams(window.location.search);
  const categorySel = document.getElementById("filter-category");
  const priceRange = document.getElementById("filter-price-range");
  const priceLabel = document.getElementById("filter-price-label");
  const sortSel = document.getElementById("filter-sort");
  const searchInput = document.getElementById("listing-search-input");
  const resultsCount = document.getElementById("results-count");
  const clearBtn = document.getElementById("filter-clear");

  if (params.get("category")) categorySel.value = params.get("category");
  if (params.get("search")) searchInput.value = params.get("search");

  function apply() {
    let list = [...PRODUCTS];
    const cat = categorySel.value;
    const maxPrice = Number(priceRange.value);
    const q = searchInput.value.trim().toLowerCase();

    if (cat) list = list.filter(p => p.category === cat);
    list = list.filter(p => p.price <= maxPrice);
    if (q) list = list.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));

    switch (sortSel.value) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      case "name": list.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: break;
    }

    priceLabel.textContent = `$${maxPrice}`;
    resultsCount.textContent = `${list.length} product${list.length !== 1 ? "s" : ""}`;
    grid.innerHTML = list.length
      ? list.map(productCardHTML).join("")
      : `<p class="col-span-full text-center text-[var(--gray-500)] py-16">No products match your filters. Try adjusting your search.</p>`;
    bindCardEvents(grid);
  }

  [categorySel, priceRange, sortSel].forEach(el => el.addEventListener("input", apply));
  searchInput.addEventListener("input", apply);
  clearBtn.addEventListener("click", () => {
    categorySel.value = "";
    priceRange.value = priceRange.max;
    sortSel.value = "";
    searchInput.value = "";
    apply();
  });

  apply();
}

/* ---------------------------------------------------------------------- */
/* Quick view modal                                                        */
/* ---------------------------------------------------------------------- */
function openQuickView(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const backdrop = document.getElementById("quickview-modal");
  const body = document.getElementById("quickview-body");
  const wished = Store.getWishlist().includes(p.id);

  body.innerHTML = `
    <div class="grid md:grid-cols-2 gap-0">
      <div class="bg-[var(--gray-50)] flex items-center justify-center p-8">
        <img src="${p.image}" alt="${p.brand} ${p.name}" class="max-h-72 object-contain">
      </div>
      <div class="p-7 md:p-9">
        <p class="text-xs uppercase tracking-widest text-[var(--electric)] font-semibold mb-2">${p.brand}</p>
        <h3 class="font-display text-2xl mb-2">${p.name}</h3>
        <div class="flex items-center gap-2 mb-4">
          <span class="star-row">${starRow(p.rating)}</span>
          <span class="text-sm text-[var(--gray-500)]">${p.rating} (${p.reviews} reviews)</span>
        </div>
        <p class="text-sm text-[var(--gray-700)] leading-relaxed mb-5">${p.description}</p>
        <div class="flex items-baseline gap-3 mb-6">
          <span class="font-display text-3xl font-tabular">$${p.price}</span>
          <span class="text-base text-[var(--gray-500)] line-through font-tabular">$${p.originalPrice}</span>
          <span class="text-xs font-semibold text-white bg-[var(--navy-900)] px-2 py-1 rounded">-${discountPct(p)}%</span>
        </div>
        <div class="flex items-center gap-4 mb-6">
          <span class="text-xs uppercase tracking-widest text-[var(--gray-500)]">Quantity</span>
          <div class="qty-selector">
            <button type="button" data-qty-decr>−</button>
            <input type="number" id="quickview-qty" value="1" min="1" max="10">
            <button type="button" data-qty-incr>+</button>
          </div>
        </div>
        <div class="flex gap-3">
          <button class="btn btn-primary flex-1 justify-center" id="quickview-add-cart">
            <i data-lucide="shopping-cart" class="w-4 h-4"></i> Add to Cart
          </button>
          <button class="btn btn-ghost" id="quickview-wishlist" data-active="${wished}">
            <i data-lucide="heart" class="w-4 h-4 ${wished ? 'fill-current text-[#ff4d67]' : ''}"></i>
          </button>
        </div>
        <a href="product-details.html?id=${p.id}" class="block text-center text-sm text-[var(--electric)] mt-5 hover:underline">View full details &amp; specifications →</a>
      </div>
    </div>`;

  const qtyInput = () => document.getElementById("quickview-qty");
  body.querySelector("[data-qty-decr]").addEventListener("click", () => {
    qtyInput().value = Math.max(1, Number(qtyInput().value) - 1);
  });
  body.querySelector("[data-qty-incr]").addEventListener("click", () => {
    qtyInput().value = Math.min(10, Number(qtyInput().value) + 1);
  });
  body.querySelector("#quickview-add-cart").addEventListener("click", () => {
    Store.addToCart(p.id, Number(qtyInput().value));
    showToast(`${p.name} added to cart`, "shopping-cart");
    closeQuickView();
  });
  const wishBtn = body.querySelector("#quickview-wishlist");
  wishBtn.addEventListener("click", () => {
    const active = Store.toggleWishlist(p.id);
    wishBtn.dataset.active = active;
    wishBtn.querySelector("i").classList.toggle("fill-current", active);
    wishBtn.querySelector("i").classList.toggle("text-[#ff4d67]", active);
    showToast(active ? "Added to wishlist" : "Removed from wishlist", "heart");
  });

  if (window.lucide) lucide.createIcons();
  backdrop.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeQuickView() {
  document.getElementById("quickview-modal")?.classList.remove("open");
  document.body.style.overflow = "";
}

function initQuickViewModal() {
  const backdrop = document.getElementById("quickview-modal");
  if (!backdrop) return;
  backdrop.addEventListener("click", (e) => { if (e.target === backdrop) closeQuickView(); });
  document.getElementById("quickview-close")?.addEventListener("click", closeQuickView);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeQuickView(); });
}

/* ---------------------------------------------------------------------- */
/* Product details page                                                    */
/* ---------------------------------------------------------------------- */
function initProductDetailsPage() {
  const root = document.getElementById("product-details-root");
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const p = PRODUCTS.find(x => x.id === params.get("id")) || PRODUCTS[0];
  const wished = Store.getWishlist().includes(p.id);

  document.title = `${p.name} | VoltEdge Electronics`;

  root.innerHTML = `
    <div class="grid lg:grid-cols-2 gap-12">
      <div class="reveal">
        <div class="bg-[var(--gray-50)] rounded-2xl flex items-center justify-center p-10 border border-[var(--gray-100)]">
          <img src="${p.image}" alt="${p.brand} ${p.name}" class="max-h-[26rem] object-contain">
        </div>
      </div>
      <div class="reveal">
        <p class="text-xs uppercase tracking-widest text-[var(--electric)] font-semibold mb-2">${p.brand} · ${p.category}</p>
        <h1 class="font-display text-3xl md:text-4xl mb-3">${p.name}</h1>
        <div class="flex items-center gap-2 mb-5">
          <span class="star-row text-base">${starRow(p.rating)}</span>
          <span class="text-sm text-[var(--gray-500)]">${p.rating} · ${p.reviews} reviews</span>
        </div>
        <p class="text-[var(--gray-700)] leading-relaxed mb-6">${p.description}</p>
        <div class="flex items-baseline gap-3 mb-7">
          <span class="font-display text-4xl font-tabular">$${p.price}</span>
          <span class="text-lg text-[var(--gray-500)] line-through font-tabular">$${p.originalPrice}</span>
          <span class="text-xs font-semibold text-white bg-[var(--navy-900)] px-2 py-1 rounded">-${discountPct(p)}% OFF</span>
        </div>
        <div class="flex items-center gap-4 mb-7">
          <span class="text-xs uppercase tracking-widest text-[var(--gray-500)]">Quantity</span>
          <div class="qty-selector">
            <button type="button" data-qty-decr>−</button>
            <input type="number" id="details-qty" value="1" min="1" max="10">
            <button type="button" data-qty-incr>+</button>
          </div>
        </div>
        <div class="flex flex-wrap gap-3 mb-8">
          <button class="btn btn-primary" id="details-add-cart"><i data-lucide="shopping-cart" class="w-4 h-4"></i> Add to Cart</button>
          <button class="btn btn-ghost" id="details-wishlist" data-active="${wished}">
            <i data-lucide="heart" class="w-4 h-4 ${wished ? 'fill-current text-[#ff4d67]' : ''}"></i>
            <span>${wished ? "In Wishlist" : "Add to Wishlist"}</span>
          </button>
          <button class="btn btn-ghost" id="open-specs-modal"><i data-lucide="file-text" class="w-4 h-4"></i> Full Specifications</button>
        </div>
        <div class="flex items-center gap-3 text-sm text-[var(--gray-700)] border-t border-[var(--gray-100)] pt-5">
          <i data-lucide="truck" class="w-4 h-4 text-[var(--electric)]"></i> Free delivery in 2-4 business days
        </div>
        <div class="flex items-center gap-3 text-sm text-[var(--gray-700)] mt-2">
          <i data-lucide="shield-check" class="w-4 h-4 text-[var(--electric)]"></i> 1-year warranty included
        </div>
      </div>
    </div>

    <div class="mt-16 reveal">
      <h2 class="font-display text-2xl mb-5">Key Specifications</h2>
      <div class="grid sm:grid-cols-2 gap-3">
        ${p.specs.map(s => `<div class="flex items-center gap-2 text-sm text-[var(--gray-700)] border border-[var(--gray-100)] rounded-lg px-4 py-3"><i data-lucide="check" class="w-4 h-4 text-[var(--electric)] flex-shrink-0"></i>${s}</div>`).join("")}
      </div>
    </div>

    <div class="mt-16 reveal">
      <h2 class="font-display text-2xl mb-6">You May Also Like</h2>
      <div id="related-products-grid" class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"></div>
    </div>
  `;

  const relatedGrid = document.getElementById("related-products-grid");
  const related = PRODUCTS.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);
  relatedGrid.innerHTML = (related.length ? related : PRODUCTS.filter(x => x.id !== p.id).slice(0, 4)).map(productCardHTML).join("");
  bindCardEvents(relatedGrid);

  const qtyInput = document.getElementById("details-qty");
  root.querySelector("[data-qty-decr]").addEventListener("click", () => qtyInput.value = Math.max(1, Number(qtyInput.value) - 1));
  root.querySelector("[data-qty-incr]").addEventListener("click", () => qtyInput.value = Math.min(10, Number(qtyInput.value) + 1));

  document.getElementById("details-add-cart").addEventListener("click", () => {
    Store.addToCart(p.id, Number(qtyInput.value));
    showToast(`${p.name} added to cart`, "shopping-cart");
  });

  const wishBtn = document.getElementById("details-wishlist");
  wishBtn.addEventListener("click", () => {
    const active = Store.toggleWishlist(p.id);
    wishBtn.dataset.active = active;
    wishBtn.querySelector("i").classList.toggle("fill-current", active);
    wishBtn.querySelector("i").classList.toggle("text-[#ff4d67]", active);
    wishBtn.querySelector("span").textContent = active ? "In Wishlist" : "Add to Wishlist";
    showToast(active ? "Added to wishlist" : "Removed from wishlist", "heart");
  });

  // Full specification modal (second, distinct modal from quick-view)
  document.getElementById("open-specs-modal").addEventListener("click", () => {
    const backdrop = document.getElementById("specs-modal");
    document.getElementById("specs-modal-body").innerHTML = `
      <div class="p-8">
        <h3 class="font-display text-2xl mb-1">${p.name}</h3>
        <p class="text-sm text-[var(--gray-500)] mb-6">${p.brand} · ${p.category}</p>
        <table class="w-full text-sm">
          ${p.specs.map((s, i) => `<tr class="border-b border-[var(--gray-100)]"><td class="py-3 pr-4 text-[var(--gray-500)] w-40">Spec ${i + 1}</td><td class="py-3">${s}</td></tr>`).join("")}
        </table>
      </div>`;
    backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
  });

  if (window.lucide) lucide.createIcons();
  observeReveals();
}

function initSpecsModal() {
  const backdrop = document.getElementById("specs-modal");
  if (!backdrop) return;
  const close = () => { backdrop.classList.remove("open"); document.body.style.overflow = ""; };
  backdrop.addEventListener("click", (e) => { if (e.target === backdrop) close(); });
  document.getElementById("specs-modal-close")?.addEventListener("click", close);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
}

/* ---------------------------------------------------------------------- */
/* Deals page                                                              */
/* ---------------------------------------------------------------------- */
function renderDealsPage() {
  const el = document.getElementById("all-deals-grid");
  if (!el) return;
  const deals = [...PRODUCTS].sort((a, b) => discountPct(b) - discountPct(a));
  el.innerHTML = deals.map(productCardHTML).join("");
  bindCardEvents(el);
}

/* ---------------------------------------------------------------------- */
/* Newsletter form                                                         */
/* ---------------------------------------------------------------------- */
function initNewsletter() {
  const form = document.getElementById("newsletter-form");
  if (!form) return;
  const input = document.getElementById("newsletter-email");
  const error = document.getElementById("newsletter-error");
  const success = document.getElementById("newsletter-success");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
    if (!valid) {
      error.classList.add("show");
      input.classList.add("error");
      return;
    }
    error.classList.remove("show");
    input.classList.remove("error");
    form.classList.add("hidden");
    success.classList.remove("hidden");
  });
}

/* ---------------------------------------------------------------------- */
/* Contact form                                                            */
/* ---------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const success = document.getElementById("contact-success");
  const validators = {
    "contact-name": v => v.trim().length >= 2 || "Please enter your name.",
    "contact-email": v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Enter a valid email address.",
    "contact-message": v => v.trim().length >= 10 || "Message should be at least 10 characters."
  };
  function validateField(id) {
    const field = document.getElementById(id);
    const errorEl = document.getElementById(id + "-error");
    const result = validators[id](field.value);
    if (result === true) { field.classList.remove("error"); errorEl.classList.remove("show"); return true; }
    field.classList.add("error"); errorEl.textContent = result; errorEl.classList.add("show"); return false;
  }
  Object.keys(validators).forEach(id => document.getElementById(id)?.addEventListener("blur", () => validateField(id)));
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    Object.keys(validators).forEach(id => { if (!validateField(id)) valid = false; });
    if (!valid) return;
    form.classList.add("hidden");
    success.classList.remove("hidden");
  });
}

/* ---------------------------------------------------------------------- */
/* Init                                                                     */
/* ---------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initHeaderSearch();
  updateNavCounts();
  initQuickViewModal();
  initSpecsModal();

  renderFlashDeals();
  renderCategories();
  initHomeTabs();
  initCountdown();

  initProductListing();
  renderDealsPage();
  initProductDetailsPage();

  initNewsletter();
  initContactForm();

  observeReveals();
  if (window.lucide) lucide.createIcons();

  const year = document.getElementById("current-year");
  if (year) year.textContent = new Date().getFullYear();
});
