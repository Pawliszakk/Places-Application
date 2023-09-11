import { useContext, useState } from 'react';

import classes from './NewPlace.module.css';
import AuthContext from '../../context/auth-context';
import { useRouter } from 'next/router';
import ErrorModal from '../UI/ErrorModal';
import LoadingSpinner from '../UI/LoadingSpinner';
const NewPlace = () => {
	const [loading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);
	const [enteredTitle, setEnteredTitle] = useState('');
	const [titleIsValid, setIsTitleValid] = useState(true);

	const [enteredText, setEnteredText] = useState('');
	const [textIsValid, setIsTextValid] = useState(true);

	const [enteredAddress, setEnteredAddress] = useState('');
	const [addressIsValid, setIsAddressValid] = useState(true);

	const [isFormValid, setIsFormValid] = useState(true);

	const router = useRouter();
	const authCtx = useContext(AuthContext);

	const isLoggedIn = authCtx.isLoggedIn;
	if (!isLoggedIn) {
		typeof window !== 'undefined' && router.push('/auth');
	}

	const submitHandler = async (e) => {
		e.preventDefault();

		const isTitleValid = enteredTitle.length > 3;
		const isTextValid = enteredText.length > 20;
		const isAddressValid = enteredAddress > 5;

		setIsTitleValid(isTitleValid);
		setIsTextValid(isTextValid);
		setIsAddressValid(isAddressValid);

		if (!isTitleValid || !isTextValid || !isAddressValid) {
			setIsFormValid(false);
			return;
		}
		const placeData = {
			title: enteredTitle,
			description: enteredText,
			address: enteredAddress,
			creator: authCtx.userId,
		};
		setIsLoading(true);
		try {
			const res = await fetch('http://localhost:5000/api/places', {
				method: 'POST',
				body: JSON.stringify(placeData),
				headers: { 'Content-Type': 'application/json' },
			});

			const resData = await res.json();

			if (!res.ok) {
				setError('Failed');
			}

			router.push('/');
		} catch (err) {
			setError(err.message || 'Something Went Wrong');
		}
		setIsLoading(false);
		setIsFormValid(true);
	};

	const handleTitleChange = (e) => setEnteredTitle(e.target.value);
	const handleTextChange = (e) => setEnteredText(e.target.value);
	const handleAddressChange = (e) => setEnteredAddress(e.target.value);

	return (
		<>
			<form onSubmit={submitHandler} className={classes.placeForm}>
				<div
					className={`${classes.formControl} ${
						!titleIsValid && classes.invalid
					}`}
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
					className={`${classes.formControl} ${
						!textIsValid && classes.invalid
					}`}
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
				<button type="submit">Submit</button>{' '}
			</form>
			{error && <ErrorModal onClear={() => setError(null)} error={error} />}
			{loading && <LoadingSpinner />}
		</>
	);
};

export default NewPlace;
