const form = document.querySelector(".feedback-form");
const KEY = "feedback-form-state";

let formData = { email: "", message: "" };

const saved = localStorage.getItem(KEY);
if (saved) {
	try {
		const obj = JSON.parse(saved) || {};
		formData = { email: obj.email || "", message: obj.message || "" };
		form.elements.email.value = formData.email;
		form.elements.message.value = formData.message;
	} catch { }
}

form.addEventListener("input", (e) => {
	const name = e.target.name;
	if (name !== "email" && name !== "message") return;
	formData[name] = e.target.value.trim();
	localStorage.setItem(KEY, JSON.stringify(formData));
});

form.addEventListener("submit", (e) => {
	e.preventDefault();
	if (!formData.email || !formData.message) {
		window.alert("Fill please all fields");
		return;
	}
	console.log(formData);
	localStorage.removeItem(KEY);
	formData = { email: "", message: "" };
	form.reset();
});
