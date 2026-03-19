export default function Switcher({ id, value, icon, areaLabel }) {
	return (
		<label htmlfor={id} title="system theme">
			<input
				class="hidden"
				id={id}
				name="ait_theme_switcher"
				data-element="ait_theme_switcher"
				aria-label={areaLabel || ""}
				type="radio"
				value={value}
			/>
			<span
				className="icon-container"
				dangerouslySetInnerHTML={{ __html: icon }}
			/>
		</label>
	);
}
