/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

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
	return (
		<>
			<div
				{...blockProps}
				data-visible="false"
				data-element="ait_sidepanel"
				data-position={attributes.position || "start"}
				data-id={attributes.panelId || "ait_sidepanel"}
				data-triggers={attributes.triggers || "ait-sidepanel-trigger"}
				data-closers={attributes.closers || "ait-sidepanel-closer"}
			>
				<InnerBlocks.Content />
			</div>
		</>
	);
}
