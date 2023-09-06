const express = require('express');

const placesRoutes = require('./routes/places-routes');
const HttpError = require('./models/http-error');
const port = 5000;
const app = express();

app.use(express.json());

app.use('/api/places', placesRoutes);

app.use((req, res, next) => {
	const error = HttpError('Could not find this route', 404);
	throw error;
});

app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	}
	res.status(error.code || 500);
	res.json({ message: error.message || 'An unknown error occured!' });
});
app.listen(port);