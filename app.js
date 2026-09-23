/* Little Lemon — shared interactions */
(function () {
  const CART_KEY = "ll-cart";
  const FORMSUBMIT = "https://formsubmit.co/ajax/jjrallis@unh.edu";

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

  async function postForm(payload) {
    const res = await fetch(FORMSUBMIT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("submit failed");
    return res.json().catch(() => ({}));
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
            <button type="submit" class="btn btn-primary btn-block" id="place-order">Place order</button>
          </form>
          <p id="order-success" class="muted" hidden></p>
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
    form?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = document.getElementById("place-order");
      const data = new FormData(form);
      const items = readCart();
      const line = items
        .map((i) => `${i.qty}× ${i.name} ($${(i.price * i.qty).toFixed(2)})`)
        .join("\n");
      const sub = items.reduce((s, i) => s + i.price * i.qty, 0);
      btn.disabled = true;
      btn.textContent = "Sending…";
      try {
        await postForm({
          _subject: `Little Lemon order — ${data.get("name")}`,
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone") || "",
          notes: data.get("notes") || "",
          order: line,
          subtotal: `$${sub.toFixed(2)}`,
          total: `$${(sub * 1.08875).toFixed(2)}`,
        });
        writeCart([]);
        root.innerHTML = `
          <div class="order-empty">
            <h2>Order received</h2>
            <p>We emailed the kitchen your pickup request. Grazie!</p>
            <a class="btn btn-primary" href="index.html">Back home</a>
          </div>`;
        flashToast("Order sent — check your email confirmation from Formsubmit if first use");
      } catch {
        btn.disabled = false;
        btn.textContent = "Place order";
        flashToast("Could not send order — try again or call us");
      }
    });
  }

  function wireReserveForm() {
    const form = document.getElementById("reserve-form");
    if (!form) return;
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get("name") || "Guest";
      const btn = form.querySelector('[type="submit"]');
      btn.disabled = true;
      btn.textContent = "Sending…";
      try {
        await postForm({
          _subject: `Little Lemon reservation — ${name}`,
          name,
          email: data.get("email"),
          date: data.get("date"),
          time: data.get("time"),
          guests: data.get("guests"),
          notes: data.get("notes") || "",
        });
        form.reset();
        flashToast(`Table reserved for ${name}. See you soon!`);
        const note = document.getElementById("reserve-success");
        if (note) {
          note.hidden = false;
          note.textContent = `You're booked, ${name}. Confirmation will arrive by email once Formsubmit is activated.`;
        }
      } catch {
        flashToast("Could not send reservation — try again");
      } finally {
        btn.disabled = false;
        btn.textContent = "Confirm reservation";
      }
    });
  }

  function wireNewsletterForms() {
    document.querySelectorAll(".newsletter-form").forEach((form) => {
      form.removeAttribute("onsubmit");
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = new FormData(form).get("email");
        const btn = form.querySelector('[type="submit"]');
        btn.disabled = true;
        try {
          await postForm({
            _subject: "Little Lemon newsletter signup",
            email,
          });
          form.reset();
          flashToast("Subscribed — welcome to the table");
        } catch {
          flashToast("Could not subscribe — try again");
        } finally {
          btn.disabled = false;
        }
      });
    });
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
