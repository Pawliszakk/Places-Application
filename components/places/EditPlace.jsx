import { useEffect, useState } from 'react';
import classes from './EditPlace.module.css';
const places = [
	{
		id: 1,
		image:
			'https://cdn.pixabay.com/photo/2023/07/10/06/52/trail-8117575_1280.jpg',
		title: 'Tytuł miejsca 1',
		description: 'Opis miejsca 1',
		address: 'Adres miejsca 1',
		creator: 'janesmith456',
		coordinates: { lat: 123.456, lng: 789.012 },
	},
	{
		id: 2,
		image:
			'https://cdn.pixabay.com/photo/2023/08/12/04/24/mabry-mill-8184715_1280.jpg',
		title: 'Tytuł miejsca 2',
		description: 'Opis miejsca 2',
		address: 'Adres miejsca 2',
		creator: 'janesmith456',
		coordinates: { lat: 456.789, lng: 123.456 },
	},
	{
		id: 3,
		image:
			'https://cdn.pixabay.com/photo/2023/07/05/18/13/mountains-8108961_1280.jpg',
		title: 'Tytuł miejsca 3',
		description: 'Opis miejsca 3',
		address: 'Adres miejsca 3',
		creator: 'michaeljohnson789',
		coordinates: { lat: 789.012, lng: 456.789 },
	},
	{
		id: 4,
		image:
			'https://cdn.pixabay.com/photo/2023/08/08/21/25/france-8178164_1280.jpg',
		title: 'Tytuł miejsca 4',
		description: 'Opis miejsca 4',
		address: 'Adres miejsca 4',
		creator: 'michaeljohnson789',
		coordinates: { lat: 345.678, lng: 901.234 },
	},
	{
		id: 5,
		image:
			'https://cdn.pixabay.com/photo/2023/05/01/14/14/mountains-7963159_1280.jpg',
		title: 'Tytuł miejsca 5',
		description: 'Opis miejsca 5',
		address: 'Adres miejsca 5',
		creator: 'michaeljohnson789',
		coordinates: { lat: 567.89, lng: 123.567 },
	},
];
const EditPlace = ({ placeId }) => {
	const currentPlace = places.find((p) => p.id === +placeId);

	const [title, setTitle] = useState('');
	const [titleIsValid, setIsTitleValid] = useState(true);

	const [description, setDescription] = useState('');
	const [descriptionIsValid, setIsDescriptionValid] = useState(true);
	const [isFormValid, setIsFormValid] = useState(true);

	const handleTitleChange = (e) => {
		setTitle(e.target.value);
		title.length < 3 ? setIsTitleValid(false) : setIsTitleValid(true);
	};
	const handleDescriptionChange = (e) => {
		setDescription(e.target.value);
		description.length < 20
			? setIsDescriptionValid(false)
			: setIsDescriptionValid(true);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!descriptionIsValid || !titleIsValid) {
			setIsFormValid(false);
		}

		const postData = { title, description, id: placeId };
		console.log(postData);
		//SEND TO API
		setIsFormValid(true);
	};
	useEffect(() => {
		if (currentPlace) {
			setTitle(currentPlace.title);
			setDescription(currentPlace.description);
		}
	}, [currentPlace]);
	return (
		<div className={classes.edit}>
			<form onSubmit={handleSubmit}>
				<div className={classes.input}>
					<label htmlFor="title">Title</label>
					<input
						type="text"
						id="title"
						value={title}
						onChange={handleTitleChange}
					/>
					{!titleIsValid && <p>Title should have minimum 3 characters</p>}
				</div>
				<div className={classes.input}>
					<label htmlFor="text">Text</label>
					<input
						type="text"
						id="text"
						value={description}
						onChange={handleDescriptionChange}
					/>
					{!descriptionIsValid && <p>Text should have minimum 20 characters</p>}
				</div>
				{!isFormValid && <p>Please input valid data</p>}
				<button type="submit">Edit Place</button>
			</form>
		</div>
	);
};

export default EditPlace;
