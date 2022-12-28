import * as React from "react";

const getCursorXY = (input: HTMLTextAreaElement, selectionPoint: number) => {
	const { offsetTop: inputY, offsetLeft: inputX } = input;
	const div = document.createElement("div");
	div.style.cssText = getComputedStyle(input).cssText; //buggy on firefox. Testing.

	const swap = ".";
	const inputValue =
		input.tagName === "INPUT"
			? input.value.replace(/ /g, swap)
			: input.value.replace(/\n/g, "<br/>");
			//   input.value;
	// set the div content to that of the textarea up until selection
	const textContent = inputValue.substring(0, selectionPoint);
	// set the text content of the dummy element div
	div.innerHTML = textContent;
	if (input.tagName === "TEXTAREA") div.style.height = "auto";
	// if a single line input then the div needs to be single line and not break out like a text area
	if (input.tagName === "INPUT") div.style.width = "auto";

	div.style.top = "38px";
	div.style.position = "absolute";

	const span = document.createElement("span");
	span.innerHTML = inputValue.substring(selectionPoint) || ".";

	div.appendChild(span);
	document.body.appendChild(div);

	const { offsetLeft: spanX, offsetTop: spanY } = span;
	document.body.removeChild(div);
	return {
		x: inputX + spanX,
		y: inputY + spanY,
	};
};

export default getCursorXY;
