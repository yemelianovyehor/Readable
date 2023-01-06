import * as React from "react";
import { Popover, ArrowContainer } from "react-tiny-popover";
import Translator from "./Translator";
import { useQueryClient } from "react-query";

interface TranslateAreaProps {
	data: string;
	outLang: string;
}

const TranslateArea: React.FunctionComponent<TranslateAreaProps> = (props) => {
	const [selected, setSelected] = React.useState<string>();
	const [visible, setVisible] = React.useState<boolean>(false);
	const [pos, setPos] = React.useState({ x: 0, y: 0 });

	const queryClient = useQueryClient();

	const showPopover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const sel = window.getSelection();
		const text = sel?.toString();

		if (text) {
			setPos({ x: e.clientX, y: e.clientY });
			setSelected(text);
			setVisible(true);
		}
	};

	const hide = () => {
		setVisible(false);
		queryClient.removeQueries("translation");
	};

	const display = props.data.split("\n").map((v, i) => (
		<span key={`line${i}`}>
			{v}
			<br />
		</span>
	));

	return (
		<div style={{ height: "90vh" }}>
			<>
				<Popover
					contentLocation={{ top: pos.y - 40, left: pos.x - 30 }}
					positions={["top", "bottom"]}
					align="center"
					isOpen={visible}
					content={
						<>
							<Translator text={selected!} outLang={props.outLang}/>
						</>
					}
				>
					<div
						style={{
							height: "100%",
							width: "100%",
							backgroundColor: "#222",
						}}
						onMouseUp={showPopover}
						onMouseDown={hide}
					>
						{display}
					</div>
				</Popover>
			</>
		</div>
	);
};

export default TranslateArea;
