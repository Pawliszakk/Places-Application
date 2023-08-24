import { useRef, useState } from 'react';
import classes from './Auth.module.css';

const Auth = () => {
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const [isEmailValid, setIsEmailValid] = useState(true);
	const [isPasswordValid, setIsPasswordValid] = useState(true);

	const submitHandler = (e) => {
		e.preventDefault();

		const email = emailInputRef.current.value;
		const password = passwordInputRef.current.value;

		const isEmailValid = email.includes('@');
		const isPasswordValid = password.trim().length > 8;

		isEmailValid ? setIsEmailValid(true) : setIsEmailValid(false);
		isPasswordValid > 8 ? setIsPasswordValid(true) : setIsPasswordValid(false);

		if (!isEmailValid || !isPasswordValid) {
			return;
		}

		const loginData = { email, password };
		console.log(loginData);

		//SEND TO API
	};
	return (
		<form onSubmit={submitHandler} className={classes.authForm}>
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

			<button type="submit">Login</button>
		</form>
	);
};

export default Auth;
