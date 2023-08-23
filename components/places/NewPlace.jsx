import { useState } from 'react';

import classes from './NewPlace.module.css';
const NewPlace = () => {
	const [enteredTitle, setEnteredTitle] = useState('');
	const [titleIsValid, setIsTitleValid] = useState(true);

	const [enteredText, setEnteredText] = useState('');
	const [textIsValid, setIsTextValid] = useState(true);

	const [enteredAddress, setEnteredAddress] = useState('');
	const [addressIsValid, setIsAddressValid] = useState(true);

	const [isFormValid, setIsFormValid] = useState(true);
	const submitHandler = (e) => {
		e.preventDefault();

		enteredTitle.length < 3 ? setIsTitleValid(false) : setIsTitleValid(true);
		enteredText.length < 20 ? setIsTextValid(false) : setIsTextValid(true);
		enteredAddress.length < 5
			? setIsAddressValid(false)
			: setIsAddressValid(true);
		if (!textIsValid || !titleIsValid || !addressIsValid) {
			setIsFormValid(false);
		}
		const placeData = {
			title: enteredTitle,
			description: enteredText,
			address: enteredAddress,
		};
		console.log(placeData);
		//SENDING TO API
		setIsFormValid(true);
	};

	const handleTitleChange = (e) => setEnteredTitle(e.target.value);
	const handleTextChange = (e) => setEnteredText(e.target.value);
	const handleAddressChange = (e) => setEnteredAddress(e.target.value);

	return (
		<form onSubmit={submitHandler} className={classes.placeForm}>
			<div
				className={`${classes.formControl} ${!titleIsValid && classes.invalid}`}
			>
				<label htmlFor="title">Title</label>
				<input
					type="text"
					id="title"
					value={enteredTitle}
					placeholder="Enter a title of new place"
					onChange={handleTitleChange}
				/>
				{!titleIsValid && <p>Title should have minimum 3 characters</p>}
			</div>
			<div
				className={`${classes.formControl} ${!textIsValid && classes.invalid}`}
			>
				<label htmlFor="title">Description</label>
				<textarea
					type="text"
					id="text"
					value={enteredText}
					placeholder="Enter a description of new place"
					onChange={handleTextChange}
				/>
				{!textIsValid && <p>Text should have minimum 20 characters</p>}
			</div>
			<div
				className={`${classes.formControl} ${
					!addressIsValid && classes.invalid
				}`}
			>
				<label htmlFor="address">Address</label>
				<input
					type="text"
					id="address"
					value={enteredAddress}
					placeholder="Enter an address of new place"
					onChange={handleAddressChange}
				/>
				{!addressIsValid && <p>Text should have minimum 20 characters</p>}
			</div>
			{!isFormValid && <p>Please enter valid address</p>}
			<button type="submit">Submit</button>
		</form>
	);
};

export default NewPlace;
