import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
	base: "/IS-32_LAB7_KYRYCHENKO-NAZAR/",
	define: {
		global: "globalThis",
	},
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
				timer: resolve(__dirname, "1-timer.html"),
				form: resolve(__dirname, "2-form.html"),
				snackbar: resolve(__dirname, "2-snackbar.html"),
				search: resolve(__dirname, "3-search.html"),
			},
		},
	},
});
