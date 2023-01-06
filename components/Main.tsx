import * as React from "react";
import TranslateArea from "./TranslateArea";

interface MainProps {
	data: string;
	outLang: string;
}

const Main: React.FunctionComponent<MainProps> = (props) => {
	return (
		<main>
			<TranslateArea data={props.data} outLang={props.outLang}/>
		</main>
	);
};

export default Main;
