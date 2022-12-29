import * as React from "react";
import { Popover, ArrowContainer } from "react-tiny-popover";
import Translator from "./Translator";
import LanguageDetect from "languagedetect";

interface TranslateAreaProps {
	data: string;
}

const TranslateArea: React.FunctionComponent<TranslateAreaProps> = (props) => {
	const [selected, setSelected] = React.useState<string>();
	const [visible, setVisible] = React.useState<boolean>(false);
	const [pos, setPos] = React.useState({ x: 0, y: 0 });
	const [languages, setLanguages] = React.useState<string[]>();

	React.useEffect(() => {
		const langDetect = new LanguageDetect();
		setLanguages(langDetect.detect(props.data, 2).map((e) => e[0]));
		console.log(languages);
	}, [props.data]);

	const showPopover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const sel = window.getSelection();
		const text = sel?.toString();

		if (text) {
			setPos({ x: e.clientX, y: e.clientY });
			setSelected(text);
			setVisible(true);
		}
	};

	return (
		<div style={{ height: "90vh" }}>
			<Popover
				contentLocation={{ top: pos.y - 40, left: pos.x - 30 }}
				positions={["top", "bottom"]}
				align="center"
				reposition
				isOpen={visible}
				content={({ position, childRect, popoverRect }) => (
					<ArrowContainer
						position={position}
						popoverRect={popoverRect}
						childRect={childRect}
						arrowSize={10}
						arrowColor={"red"}
					>
						<Translator text={selected!} languages={languages!} />
					</ArrowContainer>
				)}
			>
				<div
					style={{
						height: "100%",
						width: "100%",
						backgroundColor: "#222",
					}}
					onMouseUp={showPopover}
					onMouseDown={() => setVisible(false)}
				>
					{props.data}
				</div>
			</Popover>
		</div>
	);
};

export default TranslateArea;
