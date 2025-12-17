import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const KEY = "53636464-0aa9e538fcfa0e1f5f1d953c8";

const form = document.getElementById("searchForm");
const list = document.getElementById("images");
const loader = document.getElementById("loader");

const lightbox = new SimpleLightbox("#images a", { captionsData: "alt", captionDelay: 250 });

function loading(on) {
	loader.hidden = !on;
}

form.addEventListener("submit", (e) => {
	e.preventDefault();

	const q = form.elements.query.value.trim();
	if (!q) return;

	if (!KEY) {
		iziToast.error({ message: "Add VITE_PIXABAY_KEY to .env", position: "topRight" });
		return;
	}

	list.innerHTML = "";
	loading(true);

	const url =
		"https://pixabay.com/api/?" +
		new URLSearchParams({
			key: KEY,
			q,
			image_type: "photo",
			orientation: "horizontal",
			safesearch: "true",
			per_page: "24",
			page: "1",
		});

	fetch(url)
		.then((r) => {
			if (!r.ok) throw new Error();
			return r.json();
		})
		.then((data) => {
			const hits = data.hits || [];
			if (!hits.length) {
				iziToast.warning({
					message: "Sorry, there are no images matching your search query. Please try again!",
					position: "topRight",
				});
				return;
			}

			list.innerHTML = hits
				.map(
					(img) => `
          <li>
            <a href="${img.largeImageURL}">
              <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy">
              <div class="meta">
                <div>Likes: ${img.likes}</div>
                <div>Views: ${img.views}</div>
                <div>Comments: ${img.comments}</div>
                <div>Downloads: ${img.downloads}</div>
              </div>
            </a>
          </li>
        `
				)
				.join("");

			lightbox.refresh();
		})
		.catch(() => {
			iziToast.error({ message: "Request failed. Try again.", position: "topRight" });
		})
		.finally(() => loading(false));
});
