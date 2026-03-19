import Slider from "./slider";

document.addEventListener("DOMContentLoaded", () => {
	const containers = document.querySelectorAll(".slider");
	containers.forEach((el) => {
		Slider(el);
	});
});
