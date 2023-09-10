import { useContext, useRef, useState } from 'react';
import classes from './Auth.module.css';
import AuthContext from '../../../context/auth-context';
import { useRouter } from 'next/router';
import ErrorModal from '../../UI/ErrorModal';
import LoadingSpinner from '../../UI/LoadingSpinner';

const Auth = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const authCtx = useContext(AuthContext);
	const router = useRouter();

	const emailInputRef = useRef();
	const passwordInputRef = useRef();
	const nameInputRef = useRef();

	const [isEmailValid, setIsEmailValid] = useState(true);
	const [isPasswordValid, setIsPasswordValid] = useState(true);
	const [isNameValid, setIsNameValid] = useState(true);

	const isFormValid =
		isEmailValid && isPasswordValid && isLogin ? true : isNameValid;

	const submitHandler = async (e) => {
		e.preventDefault();

		const email = emailInputRef.current.value;
		const password = passwordInputRef.current.value;

		const emailValidity = email.includes('@');
		const passwordValidity = password.trim().length > 8;

		emailValidity ? setIsEmailValid(true) : setIsEmailValid(false);
		passwordValidity ? setIsPasswordValid(true) : setIsPasswordValid(false);

		if (!isLogin) {
			const name = nameInputRef.current.value;
			const nameValidity = name.trim().length > 5;
			nameValidity ? setIsNameValid(true) : setIsNameValid(false);

			if (!emailValidity || !passwordValidity || !nameValidity) {
				console.log('error');
				return;
			}
			const loginData = { email, password, name };
			try {
				setIsLoading(true);
				const res = await fetch('http://localhost:5000/api/users/signup', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(loginData),
				});
				const resData = await res.json();
				if (!res.ok) {
					throw new Error(resData.message);
				}

				// authCtx.login();
				// router.replace('/');
			} catch (error) {
				setError(error.message || 'Something Went Wrong');
			}
			setIsLoading(false);
			return;
		}

		if (!emailValidity || !isPasswordValid) {
			console.log('error');
			return;
		}
		const loginData = { email, password };
		try {
			setIsLoading(true);
			const res = await fetch('http://localhost:5000/api/users/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(loginData),
			});
			const resData = await res.json();
			if (!res.ok) {
				throw new Error(resData.message);
			}

			authCtx.login();
			router.replace('/');
		} catch (error) {
			setError(error.message || 'Something Went Wrong');
		}
		setIsLoading(false);
	};
	return (
		<form onSubmit={submitHandler} className={classes.authForm}>
			{!isLogin && (
				<div className={classes.action}>
					<label htmlFor="name">Name</label>
					<input
						ref={nameInputRef}
						type="text"
						id="name"
						placeholder="Please enter your name..."
					/>
					{!isNameValid && <p>Please insert a valid Name</p>}
				</div>
			)}
			<div className={classes.action}>
				<label htmlFor="email">E:Mail</label>
				<input
					ref={emailInputRef}
					type="mail"
					id="email"
					placeholder="Please enter your e-mail..."
				/>
				{!isEmailValid && <p>Please insert a valid email address</p>}
			</div>
			<div className={classes.action}>
				<label htmlFor="password">Password</label>
				<input
					ref={passwordInputRef}
					type="password"
					id="password"
					placeholder="Please enter your password..."
				/>
				{!isPasswordValid && <p>Please insert a valid password</p>}
			</div>
			{!isFormValid && <p>Please insert valid credentials</p>}

			<div className={classes.buttons}>
				<button type="submit">Login</button>
				<button
					type="button"
					onClick={() => setIsLogin((prevState) => !prevState)}
				>
					Switch to {isLogin ? 'Signup' : 'Login'}
				</button>
			</div>
			{isLoading && <LoadingSpinner asOverlay />}
			{error && <ErrorModal onClear={() => setError(null)} error={error} />}
		</form>
	);
};

export default Auth;
