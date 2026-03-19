/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";
import Switcher from "./switcher";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
	const blockProps = useBlockProps.save();
	const { iconDark, iconLight, iconSystem } = attributes;
	return (
		<div {...blockProps} data-element="ait_theme_controllers">
			{iconLight && (
				<Switcher
					id="ait-theme-light"
					value="light"
					icon={iconLight}
					areaLabel="Switch to light theme"
				/>
			)}
			{iconDark && (
				<Switcher
					id="ait-theme-dark"
					value="dark"
					icon={iconDark}
					areaLabel="Switch to dark theme"
				/>
			)}
			{iconSystem && (
				<Switcher
					id="ait-theme-system"
					value="system"
					icon={iconSystem}
					areaLabel="Switch to system theme"
				/>
			)}
		</div>
	);
}
