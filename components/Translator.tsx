import * as React from "react";
import style from "@styles/translatePopup.module.css";
import { useQuery } from "react-query";

interface TranslatorProps {
	text: string;
	outLang: string;
}

const fetchTranslation = async (text: string, outLang: string) => {
	if (text === "") {
		throw new Error("returned text is empty");
	}
	return await fetch("/api/translate", {
		method: "POST",
		body: JSON.stringify({ text: text, outputLanguage: outLang }),
	})
		.then(async (res) => {
			if (res.status >= 400) {
				throw new Error(
					`Error ${res.status}: ${(await res.json()).message}`
				);
			}
			return (await res.json()) as { lang: string; text: string };
		})
		.catch((e: Error) => {
			throw new Error(e.message);
		});
};

const Translator: React.FunctionComponent<TranslatorProps> = (props) => {
	const { isSuccess, isError, data, error } = useQuery(
		"translation",
		async () => await fetchTranslation(props.text, props.outLang)
	);

	return (
		<div className={style["translate-popup"]}>
			{isError ? (
				"Error"
			) : isSuccess ? (
				`(${data.lang}) ${data.text}`
			) : (
				<div className={style["loader"]}></div>
			)}
		</div>
	);
};

export default Translator;
