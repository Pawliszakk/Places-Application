import { createContext, useCallback, useState } from 'react';

const AuthContext = createContext({
	isLoggedIn: false,
	userId: null,
	login: () => {},
	logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userId, setUserId] = useState(null);

	const loginHandler = useCallback((id) => {
		setIsLoggedIn(true);
		setUserId(id);
	}, []);
	const logoutHandler = useCallback(() => {
		setIsLoggedIn(false);
		setUserId(null);
	}, []);

	const context = {
		userId,
		isLoggedIn,
		login: loginHandler,
		logout: logoutHandler,
	};

	return (
		<AuthContext.Provider value={context}>{children}</AuthContext.Provider>
	);
};

export default AuthContext;
