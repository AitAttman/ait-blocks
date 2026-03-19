/**
 * Slider from:
 * https://github.com/AitAttman/Slider
 */
type SliderConfig = {
	navDots?: boolean;
	interval?: number;
	autoplay?: boolean;
	navButtons?: boolean;
	[key: string]: any;
};
export default function Slider(
	container: HTMLDivElement | string = ".slider",
	config: SliderConfig = {},
) {
	const slider: HTMLDivElement | null =
		typeof container === "string"
			? document.querySelector(container)
			: container;
	if (!slider) {
		console.error("slider container does not exist");
		return;
	}

	const slidesContainer: HTMLDivElement | null =
		slider.querySelector(".slides");
	let slides = slider.querySelectorAll(".slide");
	let prevBtn: HTMLButtonElement | null = null;
	let nextBtn: HTMLButtonElement | null = null;
	let dots: HTMLDivElement | null = null;
	let currentIndex = 0;
	let totalSlides = slides.length;
	let touchStartX = 0;
	let touchEndX = 0;
	let autoplayInterval: number | null;
	let isMovingByTouch = false;
	const currentConfig: SliderConfig = {
		navDots: true,
		interval: 3000,
		autoplay: false,
		navButtons: true,
	};
	// load configuration from slider dataset
	for (const [k, v] of Object.entries(slider.dataset)) {
		if (k === "navDots") currentConfig.navDots = v !== "false";
		if (k === "autoplay") currentConfig.autoplay = v === "true";
		if (k === "navButtons") currentConfig.navButtons = v !== "false";
		if (k === "interval") currentConfig.interval = Number(v || 3000);
	}
	const direction =
		slider.getAttribute("dir") || getComputedStyle(slider).direction;
	const rtlFactor = direction === "rtl" ? -1 : 1;
	// if config parameter is not empty, override currentConfing
	if (Object.keys(config).length > 0) {
		for (const [k, v] of Object.entries(config)) {
			currentConfig[k] = v;
		}
	}
	const updateDotState = (index: number) => {
		if (!currentConfig.navDots) return;
		dots?.querySelector(".current")?.classList.remove("current");
		dots?.querySelector(`[data-index="${index}"]`)?.classList.add("current");
	};
	const moveSlider = (index: number, transition: boolean = true) => {
		if (!slidesContainer) return;
		if (transition) isMovingByTouch = true;
		if (index < 0) index = 0;
		else if (index > totalSlides - 1) index = totalSlides - 1;
		slidesContainer.style.transition = transition ? "" : "none";
		currentIndex = index;
		updateDotState(index);
		if (transition)
			setTimeout(() => {
				isMovingByTouch = false;
			}, 500);
		slidesContainer.style.transform = `translateX(${
			-currentIndex * rtlFactor * 100
		}%)`;
	};
	const createDots = () => {
		if (!currentConfig.navDots) return;
		const old = slider?.querySelector(".dots");
		if (old) old.remove();
		let c = document.createElement("div");
		c.classList.add("dots");
		for (let i = 1; i <= totalSlides; i++) {
			let dot = document.createElement("span");
			// i === 1 not 0 because 1 is the index of real first slide not cloned one
			if (i === 1) dot.classList.add("current");
			dot.setAttribute("data-index", i.toString());
			c.appendChild(dot);
		}
		slider.appendChild(c);
		dots = c;
		if (totalSlides >= 2)
			dots.addEventListener("click", (ev) => {
				let target: HTMLElement | null = ev.target as HTMLElement;
				if (!target || target.tagName.toLowerCase() !== "span") return;
				let index = Number(target.dataset.index);
				// currentIndex = index
				if (currentIndex !== index) {
					updateDotState(index);
					moveSlider(index, true);
				}
			});
	};
	const createNavBtns = () => {
		if (!currentConfig.navButtons || totalSlides < 2) return;
		const createBtn = (className: string) => {
			let btn = document.createElement("button");
			btn.classList.add(className);
			slider.appendChild(btn);
			return btn;
		};
		if (!(prevBtn = slider.querySelector(".prev"))) prevBtn = createBtn("prev");
		if (!(nextBtn = slider.querySelector(".next"))) nextBtn = createBtn("next");
		prevBtn?.addEventListener("click", () => {
			moveSlider(currentIndex - 1);
		});
		nextBtn?.addEventListener("click", () => {
			moveSlider(currentIndex + 1);
		});
	};
	const startAutoPlay = () => {
		if (autoplayInterval) return;
		autoplayInterval = setInterval(() => {
			let index = currentIndex + 1;
			if (index > totalSlides) index = 1;
			moveSlider(index);
		}, currentConfig.interval);
	};
	const stopAutoPlay = () => {
		if (autoplayInterval) clearInterval(autoplayInterval);
		autoplayInterval = null;
	};
	const onTransitionend = () => {
		let index = -1;
		if (currentIndex <= 0) index = totalSlides - 2;
		else if (currentIndex >= totalSlides - 1) index = 1;
		if (index !== -1) {
			moveSlider(index, false);
		}
	};
	const onTouchstart = (ev: TouchEvent) => {
		touchStartX = ev.touches[0].clientX;
		touchEndX = touchStartX;
	};
	const onTouchmove = (ev: TouchEvent) => {
		if (isMovingByTouch) return;
		touchEndX = ev.touches[0].clientX;
		if (!slidesContainer || totalSlides < 2) return;
		const swipDistance = touchStartX - touchEndX;
		const percentage = (swipDistance / slider.offsetWidth) * 100;
		const move = -currentIndex * 100 - percentage;
		slidesContainer.style.transition = `none`;
		slidesContainer.style.transform = `translateX(${move}%)`;
	};
	const onTouchend = () => {
		if (isMovingByTouch) return;
		const swipDistance = touchStartX - touchEndX;
		if (Math.abs(swipDistance) < 50) {
			moveSlider(currentIndex);
		} else {
			moveSlider(currentIndex + (swipDistance > 0 ? 1 : -1));
		}
	};
	const removeImageLazyProps = (image: HTMLImageElement | null) => {
		if (!image || !image.dataset.src) return;
		image.classList.remove("lazy");
		image.src = image.dataset.src;
		image.removeAttribute("data-src");
	};
	createDots();
	createNavBtns();
	if (totalSlides > 1) {
		const firstElement: HTMLDivElement = slides[0].cloneNode(
			true,
		) as HTMLDivElement;
		const firstImage: HTMLImageElement | null =
			firstElement.querySelector("img.lazy");
		removeImageLazyProps(firstImage);
		slidesContainer?.appendChild(firstElement);
		// last element
		const lastElement: HTMLDivElement = slides[totalSlides - 1].cloneNode(
			true,
		) as HTMLDivElement;
		const lastImage: HTMLImageElement | null =
			lastElement.querySelector("img.lazy");
		removeImageLazyProps(lastImage);
		slidesContainer?.prepend(lastElement);
		slides = slider.querySelectorAll(".slide");
		totalSlides = slides.length;
		moveSlider(1, false);

		slidesContainer?.addEventListener("transitionend", onTransitionend);
		slidesContainer?.addEventListener("touchstart", onTouchstart);
		slidesContainer?.addEventListener("touchmove", onTouchmove);
		slidesContainer?.addEventListener("touchend", onTouchend);
	}
	if (currentConfig.autoplay && totalSlides > 1) {
		startAutoPlay();
		slider.addEventListener("touchstart", stopAutoPlay);
		slider.addEventListener("mouseenter", stopAutoPlay);
		slider.addEventListener("touchend", startAutoPlay);
		slider.addEventListener("mouseleave", startAutoPlay);
	}

	const destroy = () => {
		if (nextBtn) nextBtn.remove();
		if (prevBtn) prevBtn.remove();
		if (dots) dots.remove();
		if (currentConfig.autoplay && totalSlides > 1) {
			stopAutoPlay();
			slider.removeEventListener("touchstart", stopAutoPlay);
			slider.removeEventListener("mouseenter", stopAutoPlay);
			slider.removeEventListener("touchend", startAutoPlay);
			slider.removeEventListener("mouseleave", startAutoPlay);
		}
		slidesContainer?.removeEventListener("transitionend", onTransitionend);
		slidesContainer?.removeEventListener("touchstart", onTouchstart);
		slidesContainer?.removeEventListener("touchmove", onTouchmove);
		slidesContainer?.removeEventListener("touchend", onTouchend);
		// remove cloned
		if (totalSlides > 1) {
			slides[0]?.remove();
			slides[slides.length - 1]?.remove();
		}
		// remove dots
		let prevDots = slider.querySelector(".dots");
		if (prevDots) prevDots.remove();
	};
	return {
		destroy: destroy,
	};
}
