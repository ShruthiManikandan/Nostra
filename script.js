/* =========================================================
   NOSTRA - Main JavaScript
   1. Product data
   2. Helpers (price, safe storage, product cards)
   3. Mobile navigation
   4. Wishlist + cart counters
   5. Hero slider
   6. Home page sections (new arrivals, most wanted, countdown)
   7. Collections: live search + category + sidebar filters
   8. Newsletter validation
   9. Contact form validation
   ========================================================= */

/* ---------- 1. PRODUCT DATA ---------- */
// category: Men / Women / Accessories / Footwear
// occasion: Summer / Party / Beach     color: Red / Blue / White / Green / Black
// arrival: New / Old                   oldPrice: optional (shows a SALE tag)
const products = [
  { id: 1,  name: "Classic White Tee",        category: "Men",         price: 1299, oldPrice: 1799, occasion: "Summer", color: "White", arrival: "New",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=70" },
  { id: 2,  name: "Black Leather Jacket",     category: "Men",         price: 8999, oldPrice: 11999, occasion: "Party", color: "Black", arrival: "Old",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=70" },
  { id: 3,  name: "Slim Fit Denim Jeans",     category: "Men",         price: 2499, oldPrice: 2999, occasion: "Summer", color: "Blue", arrival: "Old",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=70" },
  { id: 4,  name: "Oversized Knit Sweater",   category: "Women",       price: 3299, oldPrice: 3999, occasion: "Party", color: "Red", arrival: "New",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=70" },
  { id: 5,  name: "Tailored Wool Coat",       category: "Women",       price: 7499, oldPrice: 8999, occasion: "Party", color: "Black", arrival: "Old",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=70" },
  { id: 6,  name: "Minimal Linen Shirt",      category: "Women",       price: 1999, oldPrice: 2499, occasion: "Beach", color: "White", arrival: "New",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=70" },
  { id: 7,  name: "Structured Tote Bag",      category: "Accessories", price: 4299, oldPrice: 4999, occasion: "Party", color: "Green", arrival: "Old",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=70" },
  { id: 8,  name: "Steel Chronograph Watch",  category: "Accessories", price: 5999, oldPrice: 7499, occasion: "Party", color: "Black", arrival: "Old",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=70" },
  { id: 9,  name: "Round Sunglasses",         category: "Accessories", price: 1499, oldPrice: 1999, occasion: "Beach", color: "Black", arrival: "New",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=70" },
  { id: 10, name: "Everyday Canvas Backpack", category: "Accessories", price: 2799, oldPrice: 3299, occasion: "Summer", color: "Green", arrival: "Old",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=70" },
  { id: 11, name: "Street Runner Sneakers",   category: "Footwear",    price: 3999, oldPrice: 4999, occasion: "Summer", color: "Red", arrival: "New",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=70" },
  { id: 12, name: "White Court Sneakers",     category: "Footwear",    price: 3499, oldPrice: 3999, occasion: "Summer", color: "White", arrival: "Old",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=600&q=70" },
  { id: 13, name: "Leather Ankle Boots",      category: "Footwear",    price: 5499, oldPrice: 6499, occasion: "Party", color: "Black", arrival: "New",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=70" },
  { id: 14, name: "Black Essential Tee",      category: "Women",       price: 1199, oldPrice: 1499, occasion: "Summer", color: "Black", arrival: "Old",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=70" },
  { id: 15, name: "Utility Bomber Jacket",    category: "Men",         price: 4699, oldPrice: 5499, occasion: "Party", color: "Green", arrival: "New",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=70" },
  { id: 16, name: "Low-Top Trainers",         category: "Footwear",    price: 2999, oldPrice: 3499, occasion: "Beach", color: "Blue", arrival: "Old",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=70" }
];

/* ---------- 2. HELPERS ---------- */

// Plain grey image shown if a photo fails to load
const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='600' height='800'>" +
    "<rect width='100%' height='100%' fill='#ece9e4'/>" +
    "<text x='50%' y='50%' fill='#999' font-family='Georgia' font-size='36' text-anchor='middle'>NOSTRA</text></svg>"
  );

// Format number as Indian rupees, e.g. 1299 -> ₹1,299
function formatPrice(amount) {
  return "₹" + amount.toLocaleString("en-IN");
}

// localStorage can fail (private mode etc.), so wrap it in try/catch
function loadList(key) {
  try { return JSON.parse(localStorage.getItem(key)) || []; }
  catch (e) { return []; }
}
function saveList(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); }
  catch (e) { /* ignore: counters just won't persist */ }
}

let wishlist = loadList("nostraWishlist");   // array of product ids
let cartCount = Number(loadList("nostraCart")) || 0;

// Heart icon used inside the wishlist button
const HEART_SVG =
  '<svg viewBox="0 0 24 24" width="18" height="18"><path d="M12 21s-7-4.6-9.5-9.2C.9 8.6 2.5 5 6 5c2 0 3.4 1.1 4 2.2h4C14.6 6.1 16 5 18 5c3.5 0 5.1 3.6 3.5 6.8C19 16.4 12 21 12 21z"/></svg>';

// Product card used in "Most Wanted" and on the Collections page
function createProductCard(product) {
  const isWished = wishlist.includes(product.id);
  const oldPrice = product.oldPrice ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>` : "";
  const saleTag = product.oldPrice ? '<span class="sale-tag">Sale</span>' : "";
  return `
    <article class="product-card">
      <div class="product-image">
        ${saleTag}
        <button class="wish-btn ${isWished ? "active" : ""}" type="button"
                data-wish="${product.id}" aria-label="Add ${product.name} to wishlist">${HEART_SVG}</button>
        <img src="${product.image}" alt="${product.name}" loading="lazy"
             onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'" />
        <button class="product-action" type="button" data-cart="${product.id}">Add to Cart</button>
      </div>
      <div class="product-info">
        <p class="product-category">${product.category}</p>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">${formatPrice(product.price)}${oldPrice}</p>
      </div>
    </article>`;
}

// Card used in "New Arrivals" (image with a Shop Now overlay)
function createArrivalCard(product) {
  return `
    <a class="arrival-card" href="collections.html?category=${product.category}">
      <img src="${product.image}" alt="${product.name}" loading="lazy"
           onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'" />
      <div class="arrival-overlay">
        <h3>${product.name}</h3>
        <span>Shop Now</span>
      </div>
    </a>`;
}

/* ---------- 3. MOBILE NAVIGATION ---------- */
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", function () {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen);
  });

  // Close the menu after a link is tapped
  mainNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      mainNav.classList.remove("open");
      menuToggle.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", false);
    });
  });
}
/* ---------- 3b. ANNOUNCEMENT BAR CLOSE (X) BUTTON ---------- */
const announceBar = document.getElementById("announceBar");
const announceClose = document.getElementById("announceClose");

if (announceBar && announceClose) {
  // If the visitor already closed it earlier in this session, keep it hidden
  try {
    if (sessionStorage.getItem("nostraAnnounceClosed") === "yes") {
      announceBar.remove();
    }
  } catch (e) { /* storage not available: ignore */ }

  // Clicking the X removes the bar
  announceClose.addEventListener("click", function () {
    announceBar.remove();
    try { sessionStorage.setItem("nostraAnnounceClosed", "yes"); }
    catch (e) { /* ignore */ }
  });
}

/* ---------- 4. WISHLIST + CART COUNTERS ---------- */
const wishCountEl = document.getElementById("wishCount");
const cartCountEl = document.getElementById("cartCount");

function updateBadges() {
  if (wishCountEl) wishCountEl.textContent = wishlist.length;
  if (cartCountEl) cartCountEl.textContent = cartCount;
}
updateBadges();

// One click listener for every heart / add-to-cart button (event delegation),
// so it also works for cards that are created later by JavaScript.
document.addEventListener("click", function (event) {
  const wishBtn = event.target.closest("[data-wish]");
  if (wishBtn) {
    const id = Number(wishBtn.dataset.wish);
    if (wishlist.includes(id)) {
      wishlist = wishlist.filter(function (item) { return item !== id; });
    } else {
      wishlist.push(id);
    }
    wishBtn.classList.toggle("active", wishlist.includes(id));
    saveList("nostraWishlist", wishlist);
    updateBadges();
    return;
  }

  const cartBtn = event.target.closest("[data-cart]");
  if (cartBtn) {
    cartCount += 1;
    saveList("nostraCart", cartCount);
    updateBadges();
    // quick "Added" feedback on the button
    const original = cartBtn.textContent;
    cartBtn.textContent = "Added \u2713";
    setTimeout(function () { cartBtn.textContent = original; }, 1000);
  }
});

/* ---------- 5. HERO SLIDER ---------- */
const slidesEl = document.getElementById("slides");

if (slidesEl) {
  const slideCount = slidesEl.children.length;
  const dotsBox = document.getElementById("sliderDots");
  const sliderBox = document.getElementById("slider");
  let current = 0;
  let timer = null;

  // Create one dot per slide
  for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement("button");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", "Go to slide " + (i + 1));
    dot.addEventListener("click", function () { goToSlide(i); restartAutoplay(); });
    dotsBox.appendChild(dot);
  }

  // Move the slide strip and update the dots
  function goToSlide(index) {
    current = (index + slideCount) % slideCount;   // wraps around both ways
    slidesEl.style.transform = "translateX(-" + (current * 100) + "%)";
    dotsBox.querySelectorAll(".dot").forEach(function (dot, i) {
      dot.classList.toggle("active", i === current);
    });
  }

  function startAutoplay() { timer = setInterval(function () { goToSlide(current + 1); }, 5000); }
  function stopAutoplay() { clearInterval(timer); }
  function restartAutoplay() { stopAutoplay(); startAutoplay(); }

  document.getElementById("nextSlide").addEventListener("click", function () { goToSlide(current + 1); restartAutoplay(); });
  document.getElementById("prevSlide").addEventListener("click", function () { goToSlide(current - 1); restartAutoplay(); });

  // Pause while the mouse is over the slider
  sliderBox.addEventListener("mouseenter", stopAutoplay);
  sliderBox.addEventListener("mouseleave", startAutoplay);

  // Swipe support for phones
  let touchStartX = 0;
  sliderBox.addEventListener("touchstart", function (e) { touchStartX = e.touches[0].clientX; }, { passive: true });
  sliderBox.addEventListener("touchend", function (e) {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 50) { goToSlide(diff < 0 ? current + 1 : current - 1); restartAutoplay(); }
  }, { passive: true });

  startAutoplay();
}

/* ---------- 6. HOME PAGE SECTIONS ---------- */
const newArrivalsBox = document.getElementById("newArrivals");
const mostWantedBox = document.getElementById("mostWanted");

if (newArrivalsBox) {
  // First 4 products marked "New"
  const newItems = products.filter(function (p) { return p.arrival === "New"; }).slice(0, 4);
  newArrivalsBox.innerHTML = newItems.map(createArrivalCard).join("");
}

if (mostWantedBox) {
  // 8 sale products for the Most Wanted grid (ids picked for a nice mix)
  const wantedIds = [2, 11, 4, 8, 15, 7, 13, 5];
  const wanted = wantedIds.map(function (id) {
    return products.find(function (p) { return p.id === id; });
  });
  mostWantedBox.innerHTML = wanted.map(createProductCard).join("");
}

// Limited offer countdown: counts down to midnight tonight
const cdHours = document.getElementById("cdHours");
if (cdHours) {
  const cdMins = document.getElementById("cdMins");
  const cdSecs = document.getElementById("cdSecs");

  function pad(n) { return String(n).padStart(2, "0"); }

  function tick() {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const left = Math.floor((midnight - now) / 1000);
    cdHours.textContent = pad(Math.floor(left / 3600));
    cdMins.textContent = pad(Math.floor((left % 3600) / 60));
    cdSecs.textContent = pad(left % 60);
  }
  tick();
  setInterval(tick, 1000);
}

/* ---------- 7. COLLECTIONS: SEARCH + ALL FILTERS ---------- */
const productGrid = document.getElementById("productGrid");

if (productGrid) {
  const searchInput = document.getElementById("searchInput");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const sideChecks = document.querySelectorAll(".sidebar input[type='checkbox']");
  const clearBtn = document.getElementById("clearFilters");
  const noResults = document.getElementById("noResults");
  const resultCount = document.getElementById("resultCount");

  // All filter values live here and are combined every time
  let activeCategory = "All";
  let searchText = "";

  // Read which sidebar boxes are ticked for one group, e.g. "color" -> ["Red", "Blue"]
  function checkedValues(group) {
    return Array.from(sideChecks)
      .filter(function (box) { return box.dataset.group === group && box.checked; })
      .map(function (box) { return box.value; });
  }

  // Keep products that match search AND category AND every ticked sidebar group
  function renderProducts() {
    const occasions = checkedValues("occasion");
    const colors = checkedValues("color");
    const arrivals = checkedValues("arrival");

    const filtered = products.filter(function (p) {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const haystack = (p.name + " " + p.category + " " + p.color + " " + p.occasion).toLowerCase();
      const matchesSearch = haystack.includes(searchText);
      // an empty group means "no restriction"; inside a group any ticked value can match
      const matchesOccasion = occasions.length === 0 || occasions.includes(p.occasion);
      const matchesColor = colors.length === 0 || colors.includes(p.color);
      const matchesArrival = arrivals.length === 0 || arrivals.includes(p.arrival);
      return matchesCategory && matchesSearch && matchesOccasion && matchesColor && matchesArrival;
    });

    productGrid.innerHTML = filtered.map(createProductCard).join("");
    noResults.hidden = filtered.length > 0;   // show message only when empty
    resultCount.textContent = filtered.length + (filtered.length === 1 ? " product" : " products");
  }

  // Highlight the clicked category button and refresh the list
  function setCategory(category) {
    activeCategory = category;
    filterButtons.forEach(function (btn) {
      btn.classList.toggle("active", btn.dataset.category === category);
    });
    renderProducts();
  }

  // Live search on every keystroke
  searchInput.addEventListener("input", function () {
    searchText = searchInput.value.trim().toLowerCase();
    renderProducts();
  });

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () { setCategory(btn.dataset.category); });
  });

  sideChecks.forEach(function (box) { box.addEventListener("change", renderProducts); });

  // Reset everything
  clearBtn.addEventListener("click", function () {
    searchInput.value = "";
    searchText = "";
    sideChecks.forEach(function (box) { box.checked = false; });
    setCategory("All");
  });

  // Links like collections.html?category=Men come from the home page and footer
  const urlCategory = new URLSearchParams(window.location.search).get("category");
  const validCategories = ["Men", "Women", "Accessories", "Footwear"];
  if (urlCategory && validCategories.includes(urlCategory)) {
    setCategory(urlCategory);
  } else {
    renderProducts();
  }
}

/* ---------- 8. NEWSLETTER VALIDATION (on every page) ---------- */
// Simple email pattern: text@text.text
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {
  const emailField = document.getElementById("newsletterEmail");
  const nlMessage = document.getElementById("newsletterMessage");

  newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();   // stop page reload
    if (!emailPattern.test(emailField.value.trim())) {
      nlMessage.textContent = "Please enter a valid email address.";
      nlMessage.className = "form-message fail";
    } else {
      nlMessage.textContent = "Thank you for subscribing to NOSTRA!";
      nlMessage.className = "form-message success";
      newsletterForm.reset();
    }
  });
}

/* ---------- 9. CONTACT FORM VALIDATION ---------- */
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  const fields = {
    name:    { input: document.getElementById("name"),    error: document.getElementById("nameError") },
    email:   { input: document.getElementById("email"),   error: document.getElementById("emailError") },
    phone:   { input: document.getElementById("phone"),   error: document.getElementById("phoneError") },
    message: { input: document.getElementById("message"), error: document.getElementById("messageError") }
  };
  const successBox = document.getElementById("formSuccess");

  // Returns an error text, or "" if the field is fine
  function validateField(key) {
    const value = fields[key].input.value.trim();

    if (key === "name") {
      if (value === "") return "Please enter your name.";
      if (value.length < 2) return "Name must be at least 2 characters.";
    }
    if (key === "email") {
      if (value === "") return "Please enter your email.";
      if (!emailPattern.test(value)) return "Please enter a valid email address.";
    }
    if (key === "phone") {
      // Optional, but if filled it must be a 10-digit Indian mobile number
      if (value !== "" && !/^[6-9]\d{9}$/.test(value)) return "Enter a valid 10-digit mobile number.";
    }
    if (key === "message") {
      if (value === "") return "Please write a message.";
      if (value.length < 10) return "Message must be at least 10 characters.";
    }
    return "";
  }

  // Show or clear the error for one field; returns true if valid
  function showFieldState(key) {
    const errorText = validateField(key);
    fields[key].error.textContent = errorText;
    fields[key].input.parentElement.classList.toggle("invalid", errorText !== "");
    return errorText === "";
  }

  // Validate when leaving a field, and re-check live while it shows an error
  Object.keys(fields).forEach(function (key) {
    fields[key].input.addEventListener("blur", function () { showFieldState(key); });
    fields[key].input.addEventListener("input", function () {
      if (fields[key].input.parentElement.classList.contains("invalid")) showFieldState(key);
    });
  });

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    successBox.textContent = "";

    // Check every field (don't stop at the first error)
    let allValid = true;
    Object.keys(fields).forEach(function (key) {
      if (!showFieldState(key)) allValid = false;
    });

    if (allValid) {
      successBox.textContent = "Thank you! Your message has been sent. We'll reply soon.";
      successBox.className = "form-message success";
      contactForm.reset();
    }
  });
}