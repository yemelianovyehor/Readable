import * as React from "react";
import Languages from "@lib/DeepLLangs";

interface LangSelectProps {
	name: string;
	onChange: React.ChangeEventHandler<HTMLSelectElement>;
	value: any;
}

const LangSelect: React.FunctionComponent<LangSelectProps> = (props) => {
	const options = Languages.map((item) => (
		<option key={`lang-${item[1]}`} value={item[1]}>
			{item[0]}
		</option>
	));
	return (
		<select
			name={props.name}
			id={props.name}
			onChange={props.onChange}
			value={props.value}
		>
			{options}
		</select>
	);
};

export default LangSelect;
