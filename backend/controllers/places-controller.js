const HttpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();
const DUMMY_PLACES = [
	{
		id: '1',
		title: 'Pierwszy obiekt',
		description: 'To jest opis pierwszego obiektu',
		location: { lat: 52.52, lng: 13.405 },
		address: 'Berlin, Niemcy',
		creator: 'userA',
	},
	{
		id: '2',
		title: 'Drugi obiekt',
		description: 'To jest opis drugiego obiektu',
		location: { lat: 40.7128, lng: -74.006 },
		address: 'Nowy Jork, USA',
		creator: 'userB',
	},
	{
		id: '3',
		title: 'Trzeci obiekt',
		description: 'To jest opis trzeciego obiektu',
		location: { lat: 48.8566, lng: 2.3522 },
		address: 'Paryż, Francja',
		creator: 'userC',
	},
	{
		id: '4',
		title: 'Czwarty obiekt',
		description: 'To jest opis czwartego obiektu',
		location: { lat: 35.6895, lng: 139.6917 },
		address: 'Tokio, Japonia',
		creator: 'userD',
	},
	{
		id: '5',
		title: 'Piąty obiekt',
		description: 'To jest opis piątego obiektu',
		location: { lat: 41.9028, lng: 12.4964 },
		address: 'Rzym, Włochy',
		creator: 'userE',
	},
];

const getPlaceById = (req, res, next) => {
	const placeId = req.params.pid;
	const place = DUMMY_PLACES.find((place) => place.id === placeId);
	if (!place) {
		return next(
			HttpError('Could not find a place for the provided Place Id', 404)
		);
	}
	res.json({
		message: `Udało się znaleźć szukane miejsce`,
		place,
	});
};
const getUserPlacesByUserId = (req, res, next) => {
	const userId = req.params.uid;
	const userPlace = DUMMY_PLACES.find((place) => place.creator === userId);
	if (!userPlace) {
		return next(
			HttpError('Could not find a place for the provided user Id', 404)
		);
	}
	res.json({ message: 'Success!', userPlace });
};
const createPlace = (req, res, next) => {
	const { title, description, location, address, creator } = req.body;
	const newPlace = {
		id: uuid,
		title,
		description,
		location,
		address,
		creator,
	};
	DUMMY_PLACES.push(newPlace);
	res.status(201).json({
		message: 'New Place created successfully',
		newPlace,
		DUMMY_PLACES,
	});
};

const patchPlaceById = (req, res, next) => {
	const placeId = req.params.pid;
	res.json({ message: `${placeId} to jest id` });
};
const deletePlaceById = (req, res, next) => {
	const placeId = req.params.pid;
	res.json({ message: `${placeId} to jest id do usuniecia` });
};
exports.getPlaceById = getPlaceById;
exports.getUserPlacesByUserId = getUserPlacesByUserId;
exports.createPlace = createPlace;
exports.patchPlaceById = patchPlaceById;
exports.deletePlaceById = deletePlaceById;
