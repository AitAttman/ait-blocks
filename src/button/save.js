/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";
import { createElement } from "react";

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
	const { icon, text, tag, url, hasIcon, isColumn, isReverse } = attributes;
	const extraClasses = [];
	if (isColumn) extraClasses.push("is-col");
	if (isReverse) extraClasses.push(isColumn ? "reverse-col" : "reverse-row");
	const blockProps = useBlockProps.save({
		className: extraClasses.join(" "),
	});
	const Content = () => {
		return (
			<>
				{text !== "" && <span dangerouslySetInnerHTML={{ __html: text }} />}
				{hasIcon && icon && <span dangerouslySetInnerHTML={{ __html: icon }} />}
			</>
		);
	};
	return createElement(
		tag,
		{
			...blockProps,
			"data-ait-element": "button",
			href: tag === "a" ? url || "#" : null,
		},
		<Content />,
	);
}
