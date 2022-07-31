import express from 'express';
import { toxicResponses } from './toxic-responses.json';

const app = express();
const port = 42069;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.json(toxicResponses);
});

app.post('/', (req, res) => {
	console.log(req.body);
	// respond to post saying ok
	res.json(req.body);
});

app.listen(port, () => {
	console.log(`Admin portal listening on port ${port}`);
});
