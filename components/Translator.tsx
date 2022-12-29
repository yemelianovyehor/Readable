import * as React from "react";
import translatePopup from "@styles/translatePopup.module.css";
import Reverso from "reverso-api";

interface TranslatorProps {
	text: string;
	languages: string[];
}

const Translator: React.FunctionComponent<TranslatorProps> = (props) => {
	return (
		<div className={translatePopup["translate-popup"]}>{props.text}</div>
	);
};

export default Translator;
