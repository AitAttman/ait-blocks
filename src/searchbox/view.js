import "./view.scss";

document.addEventListener("DOMContentLoaded", () => {
	const sidepanels = document.querySelectorAll(
		'[data-element="ait_sidepanel"]',
	);
	/**
	 *
	 * @param {HTMLDivElement} sidpanel
	 */
	const createOvery = (sidpanel) => {
		const el = document.createElement("div");
		el.classList.add("ait-sidepanel-overly");
		el.addEventListener("click", () => {
			sidpanel.setAttribute("data-visible", "false");
		});
		sidpanel.insertAdjacentElement("afterend", el);
	};
	sidepanels.forEach((sidepanel) => {
		// triggers className
		const triggersSelector = sidepanel.dataset.triggers || "";
		const triggers = triggersSelector
			? document.getElementsByClassName(triggersSelector)
			: null;
		// closers className
		const closersSelector = sidepanel.dataset.closers || "";
		const closers = closersSelector
			? document.getElementsByClassName(closersSelector)
			: null;
		document.body.append(sidepanel);
		createOvery(sidepanel);
		if (triggers) {
			for (const el of triggers) {
				el.addEventListener("click", (ev) => {
					ev.preventDefault();
					sidepanel.setAttribute("data-visible", "true");
				});
			}
		}
		if (closers) {
			for (const el of closers) {
				el.addEventListener("click", (ev) => {
					ev.preventDefault();
					sidepanel.setAttribute("data-visible", "false");
				});
			}
		}
	});
});
