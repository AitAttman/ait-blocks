/**
 * set theme from local storage
 */
export default function setupTheme() {
	const currentTheme = localStorage.getItem("ait_theme") || "system";
	const switchers: NodeListOf<HTMLInputElement> = document.querySelectorAll(
		'[data-element="ait_theme_switcher"]',
	);
	const setTheme = (value: string) => {
		document.documentElement.setAttribute("data-theme", value);
	};
	if (
		"dark" === currentTheme ||
		"light" === currentTheme ||
		"system" === currentTheme
	) {
		setTheme(currentTheme);
	}
	switchers.forEach((input) => {
		if (currentTheme === input.value) {
			input.checked = true;
		}
		input.addEventListener("change", (ev: Event) => {
			const t = ev.target as HTMLInputElement;
			if (t.checked && ["system", "dark", "light"].includes(t.value)) {
				setTheme(t.value);
				localStorage.setItem("ait_theme", t.value);
			}
		});
	});
}
