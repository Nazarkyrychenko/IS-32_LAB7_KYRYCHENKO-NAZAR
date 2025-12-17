const KEY = "lab8-cart";
const PER_PAGE = 3;

const products = [
	{ id: 1, title: "Book A" },
	{ id: 2, title: "Book B" },
	{ id: 3, title: "Book C" },
	{ id: 4, title: "Book D" },
	{ id: 5, title: "Book E" },
	{ id: 6, title: "Book F" },
];

const productsEl = document.getElementById("products");
const cartListEl = document.getElementById("cartList");
const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");
const infoEl = document.getElementById("pageInfo");
const clearBtn = document.getElementById("clearCart");

let page = 1;

function loadCart() {
	try {
		return JSON.parse(localStorage.getItem(KEY)) || [];
	} catch {
		return [];
	}
}

function saveCart(cart) {
	localStorage.setItem(KEY, JSON.stringify(cart));
}

function renderProducts() {
	productsEl.innerHTML = products
		.map(
			(p) => `
      <article class="news-item">
        <h3>${p.title}</h3>
        <button type="button" data-add="${p.id}">Add to cart</button>
      </article>
    `
		)
		.join("");
}

function renderCart() {
	const cart = loadCart();
	const pages = Math.max(1, Math.ceil(cart.length / PER_PAGE));
	page = Math.min(page, pages);

	const start = (page - 1) * PER_PAGE;
	const slice = cart.slice(start, start + PER_PAGE);

	cartListEl.innerHTML = slice.length ? slice.map((x) => `<li>${x.title}</li>`).join("") : "<li>Cart is empty</li>";

	infoEl.textContent = `${page}/${pages}`;
	prevBtn.disabled = page <= 1;
	nextBtn.disabled = page >= pages;
	clearBtn.disabled = cart.length === 0;
}

productsEl.addEventListener("click", (e) => {
	const btn = e.target.closest("[data-add]");
	if (!btn) return;

	const id = Number(btn.dataset.add);
	const product = products.find((p) => p.id === id);
	if (!product) return;

	const cart = loadCart();
	cart.push(product);
	saveCart(cart);
	renderCart();
});

prevBtn.addEventListener("click", () => {
	page--;
	renderCart();
});

nextBtn.addEventListener("click", () => {
	page++;
	renderCart();
});

clearBtn.addEventListener("click", () => {
	localStorage.removeItem(KEY);
	page = 1;
	renderCart();
});

renderProducts();
renderCart();
