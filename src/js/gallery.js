import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";

const images = [
	{ preview: "https://picsum.photos/id/1015/500/320", original: "https://picsum.photos/id/1015/1200/800", description: "Mountains" },
	{ preview: "https://picsum.photos/id/1025/500/320", original: "https://picsum.photos/id/1025/1200/800", description: "Dog" },
	{ preview: "https://picsum.photos/id/1035/500/320", original: "https://picsum.photos/id/1035/1200/800", description: "Forest" },
	{ preview: "https://picsum.photos/id/1043/500/320", original: "https://picsum.photos/id/1043/1200/800", description: "Sea" },
];

const ul = document.getElementById("gallery");

ul.innerHTML = images
	.map(
		({ preview, original, description }) => `
    <li>
      <a href="${original}">
        <img src="${preview}" alt="${description}" loading="lazy">
      </a>
    </li>
  `
	)
	.join("");

ul.addEventListener("click", (e) => {
	const a = e.target.closest("a");
	if (!a || !ul.contains(a)) return;
	e.preventDefault();
	const alt = a.querySelector("img")?.alt || "";
	basicLightbox.create(`<img src="${a.href}" alt="${alt}">`).show();
});
