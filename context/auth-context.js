import { createContext, useCallback, useState } from 'react';

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

	const loginHandler = useCallback((id, token) => {
		setToken(token);
		setUserId(id);
	}, []);
	const logoutHandler = useCallback(() => {
		setToken(null);
		setUserId(null);
	}, []);

	const context = {
		userId,
		isLoggedIn: !!token,
		token,
		login: loginHandler,
		logout: logoutHandler,
	};

	return (
		<AuthContext.Provider value={context}>{children}</AuthContext.Provider>
	);
};

export default AuthContext;
