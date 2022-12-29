import * as React from "react";
import TranslateArea from "./TranslateArea";

interface MainProps {
	data: string;
}

const Main: React.FunctionComponent<MainProps> = (props) => {
	return (
		<main>
			<TranslateArea data={props.data} />
		</main>
	);
};

export default Main;
