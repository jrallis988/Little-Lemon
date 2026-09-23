/* Little Lemon — shared interactions */
(function () {
  const CART_KEY = "ll-cart";
  const FORM_ACTION = "https://formsubmit.co/jjrallis@unh.edu";

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

  function absoluteNext(path) {
    try {
      return new URL(path, window.location.href).href;
    } catch {
      return path;
    }
  }

  function ensureHidden(form, name, value) {
    let input = form.querySelector(`input[name="${name}"]`);
    if (!input) {
      input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      form.appendChild(input);
    }
    input.value = value;
  }

  function wireFormsubmitForm(form, subject, nextPath) {
    form.setAttribute("action", FORM_ACTION);
    form.setAttribute("method", "POST");
    ensureHidden(form, "_subject", subject);
    ensureHidden(form, "_captcha", "false");
    ensureHidden(form, "_template", "table");
    ensureHidden(form, "_next", absoluteNext(nextPath));
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

  function renderOrderPage() {
    const root = document.getElementById("order-root");
    if (!root) return;

    const params = new URLSearchParams(window.location.search);
    if (params.get("sent") === "1") {
      writeCart([]);
      root.innerHTML = `
        <div class="order-empty">
          <h2>Order received</h2>
          <p>Thanks — check your inbox for Formsubmit’s confirmation (activate it the first time).</p>
          <a class="btn btn-primary" href="index.html">Back home</a>
        </div>`;
      return;
    }

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
    const tax = subtotal * 0.08875;
    const total = subtotal + tax;
    const line = cart
      .map((i) => `${i.qty}× ${i.name} ($${(i.price * i.qty).toFixed(2)})`)
      .join("\n");

    root.innerHTML = `
      <div class="order-layout">
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
          <div><span>Tax (est.)</span><strong>$${tax.toFixed(2)}</strong></div>
          <div class="order-total"><span>Total</span><strong>$${total.toFixed(2)}</strong></div>
          <form id="order-form" class="form-grid" style="margin-top:1rem;max-width:none">
            <label>Name<input name="name" required placeholder="Your name"></label>
            <label>Email<input type="email" name="email" required placeholder="you@email.com"></label>
            <label>Phone<input type="tel" name="phone" placeholder="(312) 555-0100"></label>
            <label>Pickup notes<textarea name="notes" placeholder="Allergy notes, timing…"></textarea></label>
            <input type="hidden" name="order" value="">
            <input type="hidden" name="subtotal" value="$${subtotal.toFixed(2)}">
            <input type="hidden" name="total" value="$${total.toFixed(2)}">
            <button type="submit" class="btn btn-primary btn-block" id="place-order">Place order</button>
          </form>
        </div>
      </div>`;

    root.querySelector(".order-list").addEventListener("click", (e) => {
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

    const form = document.getElementById("order-form");
    form.querySelector('input[name="order"]').value = line;
    wireFormsubmitForm(form, "Little Lemon pickup order", "order.html?sent=1");
    form.addEventListener("submit", () => {
      // Clear cart optimistically; confirmation page also clears.
      writeCart([]);
    });
  }

  function wireReserveForm() {
    const form = document.getElementById("reserve-form");
    if (!form) return;
    wireFormsubmitForm(form, "Little Lemon reservation", "reserve.html?sent=1");

    const params = new URLSearchParams(window.location.search);
    if (params.get("sent") === "1") {
      const note = document.getElementById("reserve-success");
      if (note) {
        note.hidden = false;
        note.textContent =
          "Reservation sent. Check your email — activate Formsubmit the first time, then you’re set.";
      }
      flashToast("Reservation submitted");
    }
  }

  function wireNewsletterForms() {
    document.querySelectorAll(".newsletter-form").forEach((form) => {
      form.removeAttribute("onsubmit");
      wireFormsubmitForm(form, "Little Lemon newsletter signup", "index.html?subscribed=1");
    });
    if (new URLSearchParams(window.location.search).get("subscribed") === "1") {
      flashToast("Subscribed — welcome to the table");
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    updateCartBadge();
    renderOrderPage();
    wireReserveForm();
    wireNewsletterForms();

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
