/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 *
 * @param {String} text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 *
 * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 */
function getTextWidth(text: string, el?: HTMLElement) {
	const canvas = document.createElement("canvas");
	const context = canvas.getContext("2d");
	context!.font = el ? getCanvasFont(el) : getCanvasFont();
	const metrics = context!.measureText(text);
	return metrics.width;
}

function getCssStyle(element: Element, prop: string) {
	return window.getComputedStyle(element, null).getPropertyValue(prop);
}

function getCanvasFont(el = document.body) {
	const fontWeight = getCssStyle(el, "font-weight") || "normal";
	const fontSize = getCssStyle(el, "font-size") || "16px";
	const fontFamily = getCssStyle(el, "font-family") || "Times New Roman";

	return `${fontWeight} ${fontSize} ${fontFamily}`;
}

export default getTextWidth;
