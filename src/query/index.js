/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from "@wordpress/blocks";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./style.scss";
/**
 * Internal dependencies
 */
import metadata from "./block.json";
import Edit from "./edit";

const BlockIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-layout-list-icon lucide-layout-list"
		>
			<rect width="7" height="7" x="3" y="3" rx="1" />
			<rect width="7" height="7" x="3" y="14" rx="1" />
			<path d="M14 4h7" />
			<path d="M14 9h7" />
			<path d="M14 15h7" />
			<path d="M14 20h7" />
		</svg>
	);
};
/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
	edit: Edit,
	icon: <BlockIcon />,
});
