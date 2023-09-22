import { useContext, useState } from 'react';

import classes from './NewPlace.module.css';
import AuthContext from '../../context/auth-context';
import { useRouter } from 'next/router';
import ErrorModal from './UI/ErrorModal';
import LoadingSpinner from './UI/LoadingSpinner';
import ImageUpload from './UI/ImageUpload';
const NewPlace = () => {
	const [loading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);
	const [enteredTitle, setEnteredTitle] = useState('');
	const [titleIsValid, setIsTitleValid] = useState(true);

	const [enteredText, setEnteredText] = useState('');
	const [textIsValid, setIsTextValid] = useState(true);

	const [enteredAddress, setEnteredAddress] = useState('');
	const [addressIsValid, setIsAddressValid] = useState(true);

	const [image, setImage] = useState(null);

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

		setIsLoading(true);
		try {
			const formData = new FormData();
			formData.append('title', enteredTitle);
			formData.append('description', enteredText);
			formData.append('address', enteredAddress);
			formData.append('image', image);
			formData.append('creator', authCtx.userId);

			const res = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/places`,
				{
					method: 'POST',
					body: formData,
					headers: {
						Authorization: `Bearer ${authCtx.token}`,
					},
				}
			);

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
	const imageHandler = (id, image, isValid) => {
		isValid ? setImage(image) : null;
	};

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
						onChange={(e) => setEnteredTitle(e.target.value)}
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
						onChange={(e) => setEnteredText(e.target.value)}
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
						onChange={(e) => setEnteredAddress(e.target.value)}
					/>
					{!addressIsValid && <p>Text should have minimum 20 characters</p>}
				</div>
				{!isFormValid && <p>Please enter valid address</p>}
				<ImageUpload center onInput={imageHandler} />
				<button type="submit">Submit</button>{' '}
			</form>
			{error && <ErrorModal onClear={() => setError(null)} error={error} />}
			{loading && <LoadingSpinner />}
		</>
	);
};

export default NewPlace;
