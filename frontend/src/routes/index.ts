import type { RequestHandler } from '@sveltejs/kit';
import answers from '../lib/data/answers.json';
import { toxicResponses as toxicResponseData } from '../../static/api/toxic-responses.json';
import * as fs from 'fs';

let toxicResponses = toxicResponseData;

export const GET: RequestHandler = () => {
	return {
		body: {
			answers,
			toxicResponses,
		},
	};
};

export const POST: RequestHandler = async ({ request }) => {
	const newResponses = (await request.json()) as string[];
	const newFile = { toxicResponses: newResponses };
	const filePath = './static/api/toxic-responses.json';

	if (typeof newResponses?.at(0) === 'string') {
		// all good :)
	} else {
		return {
			status: 500,
			body: {
				error: 'FUCK YOU!!@!!!!',
			},
		};
	}

	// newResponses must match the values in toxicResponses
	let oneMatch = false;
	newResponses?.forEach((response: string | unknown) => {
		if (typeof response === 'string') {
			if (!toxicResponses.includes(response)) {
				if (oneMatch) {
					throw new Error(
						'More than one response does not match toxicResponses'
					);
				}
				oneMatch = true;
			}
		}
	});

	try {
		fs.writeFileSync(filePath, JSON.stringify(newFile));
		toxicResponses = newResponses;
		return {
			status: 200,
		};
	} catch (err) {
		console.error(err);
		return {
			status: 500,
		};
	}
};
