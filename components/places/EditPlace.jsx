import { useContext, useEffect, useState } from 'react';
import classes from './EditPlace.module.css';
import AuthContext from '../../context/auth-context';
import LoadingSpinner from './UI/LoadingSpinner';
import ErrorModal from './UI/ErrorModal';
import { useRouter } from 'next/router';

const EditPlace = (props) => {
	const [title, setTitle] = useState(props.title);
	const [titleIsValid, setIsTitleValid] = useState(true);

	const [description, setDescription] = useState(props.description);
	const [descriptionIsValid, setIsDescriptionValid] = useState(true);
	const [isFormValid, setIsFormValid] = useState(true);
	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	const authCtx = useContext(AuthContext);
	const isLoggedIn = authCtx.isLoggedIn;

	useEffect(() => {
		if (!isLoggedIn) {
			console.log(router);
			router.replace('/auth');
		}
	}, [isLoggedIn, router]);

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

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!descriptionIsValid || !titleIsValid) {
			setIsFormValid(false);
		}

		const postData = { title, description, id: props.placeId };
		setIsLoading(true);
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/places/${props.placeId}`,
				{
					method: 'PATCH',
					body: JSON.stringify(postData),
					headers: {
						Authorization: `Bearer ${authCtx.token}`,
						'Content-Type': 'application/json',
					},
				}
			);
			if (!res.ok) {
				console.log(`something went wrong`);
				return;
			}
			const resData = await res.json();
			router.push(`/${authCtx.userId}/places`);
		} catch (err) {
			console.log(err.message);
			setError(err.message || 'something went wrong');
		}
		setIsLoading(false);
		setIsFormValid(true);
	};

	return (
		<div className={classes.edit}>
			<form onSubmit={handleSubmit}>
				<p>{isLoggedIn}</p>
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
			{error && <ErrorModal onClear={() => setError(null)} error={error} />}
			{isLoading && <LoadingSpinner />}
		</div>
	);
};

export default EditPlace;
