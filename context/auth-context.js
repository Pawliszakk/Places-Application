import { createContext, useCallback, useEffect, useState } from 'react';

const AuthContext = createContext({
	isLoggedIn: false,
	userId: null,
	token: null,
	login: () => {},
	logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
	const [token, setToken] = useState(null);
	const [userId, setUserId] = useState(null);

	const loginHandler = useCallback((id, token, expirationDate) => {
		setToken(token);
		setUserId(id);
		// const tokenExpirationDate =
		// expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

		localStorage.setItem(
			'userData',
			JSON.stringify({
				userId: id,
				token: token,
				// expiration: tokenExpirationDate.toISOString(),
			})
		);
	}, []);
	const logoutHandler = useCallback(() => {
		setToken(null);
		setUserId(null);
		localStorage.removeItem('userData');
	}, []);

	const context = {
		userId,
		isLoggedIn: !!token,
		token,
		login: loginHandler,
		logout: logoutHandler,
	};
	// useEffect(() => {
	// 	const storedData = JSON.parse(localStorage.getItem('userData'));
	// 	if (
	// 		storedData &&
	// 		storedData.token &&
	// 		new Date(storedData.expiration) > new Date()
	// 	) {
	// 		loginHandler(storedData.userId, storedData.token, storedData.expiration);
	// 	}
	// }, [loginHandler]);

	// useEffect(() => {
	// if (token && tokenExpirationDate) {
	// const remainingDate = tokenExpirationDate.getTime() - new Date();
	// setTimeout(() => logoutHandler());
	// }
	// }, [token, logoutHandler]);
	return (
		<AuthContext.Provider value={context}>{children}</AuthContext.Provider>
	);
};

export default AuthContext;
