/* Little Lemon — shared interactions */
(function () {
  const CART_KEY = "ll-cart";

  function readCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    } catch {
      return [];
    }
  }

  function writeCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    updateCartBadge();
  }

  function updateCartBadge() {
    const count = readCart().reduce((n, i) => n + i.qty, 0);
    document.querySelectorAll("[data-cart-count]").forEach((el) => {
      el.textContent = String(count);
      el.hidden = count === 0;
    });
  }

  function addToCart(item) {
    const cart = readCart();
    const existing = cart.find((c) => c.id === item.id);
    if (existing) existing.qty += 1;
    else cart.push({ ...item, qty: 1 });
    writeCart(cart);
    flashToast(`${item.name} added to order`);
  }

  function flashToast(message) {
    let toast = document.querySelector(".ll-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "ll-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(flashToast._t);
    flashToast._t = setTimeout(() => toast.classList.remove("is-visible"), 2200);
  }

  function toggleNav() {
    const nav = document.getElementById("primary-nav");
    const btn = document.querySelector(".nav-toggle");
    if (!nav || !btn) return;
    const open = nav.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  }

  document.addEventListener("click", (e) => {
    const addBtn = e.target.closest("[data-add-cart]");
    if (addBtn) {
      e.preventDefault();
      addToCart({
        id: addBtn.dataset.id,
        name: addBtn.dataset.name,
        price: Number(addBtn.dataset.price),
      });
      return;
    }
    if (e.target.closest(".nav-toggle")) {
      toggleNav();
    }
  });

  // Order page rendering
  function renderOrderPage() {
    const root = document.getElementById("order-root");
    if (!root) return;

    const cart = readCart();
    if (!cart.length) {
      root.innerHTML = `
        <div class="order-empty">
          <h2>Your order is empty</h2>
          <p>Browse the menu and add a few Mediterranean favorites.</p>
          <a class="btn btn-primary" href="menu.html">View menu</a>
        </div>`;
      return;
    }

    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    root.innerHTML = `
      <ul class="order-list">
        ${cart
          .map(
            (i) => `
          <li class="order-item" data-id="${i.id}">
            <div>
              <strong>${i.name}</strong>
              <div class="muted">$${i.price.toFixed(2)} each</div>
            </div>
            <div class="order-qty">
              <button type="button" data-qty="-1" aria-label="Decrease">−</button>
              <span>${i.qty}</span>
              <button type="button" data-qty="1" aria-label="Increase">+</button>
            </div>
            <div class="order-line">$${(i.price * i.qty).toFixed(2)}</div>
            <button type="button" class="order-remove" data-remove aria-label="Remove">✕</button>
          </li>`
          )
          .join("")}
      </ul>
      <div class="order-summary">
        <div><span>Subtotal</span><strong>$${subtotal.toFixed(2)}</strong></div>
        <div><span>Tax (est.)</span><strong>$${(subtotal * 0.08875).toFixed(2)}</strong></div>
        <div class="order-total"><span>Total</span><strong>$${(subtotal * 1.08875).toFixed(2)}</strong></div>
        <button type="button" class="btn btn-primary btn-block" id="place-order">Place order</button>
      </div>`;

    root.addEventListener("click", (e) => {
      const row = e.target.closest(".order-item");
      if (!row) return;
      const id = row.dataset.id;
      let next = readCart();
      if (e.target.closest("[data-remove]")) {
        next = next.filter((i) => i.id !== id);
      } else if (e.target.closest("[data-qty]")) {
        const delta = Number(e.target.closest("[data-qty]").dataset.qty);
        next = next
          .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
          .filter((i) => i.qty > 0);
      } else return;
      writeCart(next);
      renderOrderPage();
    });

    document.getElementById("place-order")?.addEventListener("click", () => {
      writeCart([]);
      root.innerHTML = `
        <div class="order-empty">
          <h2>Order received</h2>
          <p>Mario &amp; Adrian are preparing your Mediterranean feast. Grazie!</p>
          <a class="btn btn-primary" href="index.html">Back home</a>
        </div>`;
      flashToast("Order placed — thank you!");
    });
  }

  // Reservation form
  function wireReserveForm() {
    const form = document.getElementById("reserve-form");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get("name") || "Guest";
      form.reset();
      flashToast(`Table reserved for ${name}. See you soon!`);
      const note = document.getElementById("reserve-success");
      if (note) {
        note.hidden = false;
        note.textContent = `You're booked, ${name}. We'll hold your table — Little Lemon, Chicago.`;
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    updateCartBadge();
    renderOrderPage();
    wireReserveForm();

    // Reveal on scroll
    const reveals = document.querySelectorAll(".reveal");
    if (reveals.length && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add("is-in");
              io.unobserve(en.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      reveals.forEach((el) => io.observe(el));
    } else {
      reveals.forEach((el) => el.classList.add("is-in"));
    }
  });

  window.LittleLemon = { addToCart, readCart, writeCart, toggleNav };
})();
