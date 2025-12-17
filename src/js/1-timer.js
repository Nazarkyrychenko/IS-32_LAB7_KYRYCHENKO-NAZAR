import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.getElementById("datetime-picker");
const startBtn = document.querySelector("[data-start]");

const refs = {
	days: document.querySelector("[data-days]"),
	hours: document.querySelector("[data-hours]"),
	minutes: document.querySelector("[data-minutes]"),
	seconds: document.querySelector("[data-seconds]"),
};

let userSelectedDate = null;
let timerId = null;

startBtn.disabled = true;

flatpickr(input, {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	onClose(selectedDates) {
		const picked = selectedDates[0];
		if (!picked || picked.getTime() <= Date.now()) {
			userSelectedDate = null;
			startBtn.disabled = true;
			iziToast.error({ message: "Please choose a date in the future", position: "topRight" });
			return;
		}
		userSelectedDate = picked;
		startBtn.disabled = false;
	},
});

startBtn.addEventListener("click", () => {
	if (!userSelectedDate) return;

	startBtn.disabled = true;
	input.disabled = true;

	timerId = setInterval(() => {
		const diff = userSelectedDate.getTime() - Date.now();
		if (diff <= 0) {
			clearInterval(timerId);
			timerId = null;
			updateUI({ days: 0, hours: 0, minutes: 0, seconds: 0 });
			input.disabled = false;
			return;
		}
		updateUI(convertMs(diff));
	}, 1000);
});

function z(v) {
	return String(v).padStart(2, "0");
}

function updateUI({ days, hours, minutes, seconds }) {
	refs.days.textContent = String(days);
	refs.hours.textContent = z(hours);
	refs.minutes.textContent = z(minutes);
	refs.seconds.textContent = z(seconds);
}

function convertMs(ms) {
	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;

	const days = Math.floor(ms / day);
	const hours = Math.floor((ms % day) / hour);
	const minutes = Math.floor(((ms % day) % hour) / minute);
	const seconds = Math.floor((((ms % day) % hour) % minute) / second);

	return { days, hours, minutes, seconds };
}
