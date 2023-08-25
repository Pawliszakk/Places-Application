import { useRef, useState } from 'react';
import classes from './Auth.module.css';

const Auth = () => {
	const [isLogin, setIsLogin] = useState(true);

	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const [isEmailValid, setIsEmailValid] = useState(true);
	const [isPasswordValid, setIsPasswordValid] = useState(true);
	const isFormValid = isEmailValid && isPasswordValid;

	const submitHandler = (e) => {
		e.preventDefault();

		const email = emailInputRef.current.value;
		const password = passwordInputRef.current.value;
		p;
		const isEmailValid = email.includes('@');
		const isPasswordValid = assword.trim().length > 8;

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
			{!isFormValid && <p>Please insert valid credentials</p>}
			<button type="submit">Login</button>
			<button
				type="button"
				onClick={() => setIsLogin((prevState) => !prevState)}
			>
				Switch to {isLogin ? 'Signup': 'Login'}
			</button>
		</form>
	);
};

export default Auth;
