import classes from './MainHeader.module.css';

const MainHeader = ({ children }) => {
	return <header className={classes.mainHeader}>{children}</header>;
};

export default MainHeader;
