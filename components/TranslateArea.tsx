import getCursorXY from "lib/getCursorXY";
import * as React from "react";
import { Popover } from "react-tiny-popover";

function TranslateArea() {
	const [selected, setSelected] = React.useState<string>();
	const [visible, setVisible] = React.useState<boolean>(false);
	const inputEl: React.RefObject<HTMLTextAreaElement> = React.createRef();
	const [popupPos, setPopupPos] = React.useState({ x: 0, y: 0 });

	const showPopover = (
		e: React.MouseEvent<HTMLTextAreaElement, MouseEvent>
	) => {
		const el = e.currentTarget;
		const selText = el.value.substring(el.selectionStart, el.selectionEnd);

		if (selText) {
			const pos = getCursorXY(el, el.selectionStart);
			setPopupPos(pos);
			console.log(pos);
			setSelected(selText);
			setVisible(true);
		}
	};

	return (
		<div style={{ height: "90vh" }}>
			<Popover
				contentLocation={{ top: popupPos.y, left: popupPos.x }}
				isOpen={visible}
				content={
					<div style={{ backgroundColor: "red", zIndex: 10 }}>
						{selected}
					</div>
				}
			>
				<textarea
					onMouseUp={showPopover}
					onMouseDown={() => setVisible(false)}
					ref={inputEl}
					spellCheck="false"
					style={{
						width: "100%",
						height: "100%",
						fontFamily: "'Times New Roman', Times, serif;",
					}}
				/>
			</Popover>
		</div>
	);
}

export default TranslateArea;
