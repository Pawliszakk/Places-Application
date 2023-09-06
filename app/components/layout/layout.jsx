import MainNavigation from './Navigation/Nav/MainNavigation';

const Layout = ({ children }) => {
	return (
		<>
			<MainNavigation />
			<main>{children}</main>
		</>
	);
};

export default Layout;
