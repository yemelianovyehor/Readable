// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as deepl from "deepl-node";

const translator = new deepl.Translator(process.env.DEEPL_KEY!);

type Data =
	| {
			text: string;
			lang: string;
	  }
	| { error: string };

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const text: string = req.body;
	if (!text) {
		res.status(400).json({ error: "text is empty" });
		return;
	}
	const translated = await translator
		.translateText(text, null, "pl")
		.catch((e: Error) => {
			console.log(`Error: ${e.message}`);
			res.status(500).json({ error: "Internal error" });
		});
	if (translated) {
		res.status(200).json({ lang: translated.detectedSourceLang, text: translated.text });
	}
}
