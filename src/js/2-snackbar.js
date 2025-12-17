import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

function createPromise(delay, state) {
	return new Promise((resolve, reject) => {
		setTimeout(() => (state === "fulfilled" ? resolve(delay) : reject(delay)), delay);
	});
}

form.addEventListener("submit", (e) => {
	e.preventDefault();

	const delay = Number(form.elements.delay.value);
	const state = form.elements.state.value;

	createPromise(delay, state)
		.then((d) => iziToast.success({ message: `✅ Fulfilled promise in ${d}ms`, position: "topRight" }))
		.catch((d) => iziToast.error({ message: `❌ Rejected promise in ${d}ms`, position: "topRight" }));

	form.reset();
});
