import { createContext, useCallback, useState } from 'react';

const AuthContext = createContext({
	isLoggedIn: false,
	login: () => {},
	logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const loginHandler = useCallback(() => {
		setIsLoggedIn(true);
	}, []);
	const logoutHandler = useCallback(() => {
		setIsLoggedIn(false);
	}, []);

	const context = { isLoggedIn, login: loginHandler, logout: logoutHandler };

	return (
		<AuthContext.Provider value={context}>{children}</AuthContext.Provider>
	);
};

export default AuthContext;
