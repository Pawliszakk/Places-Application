import classes from './SideDrawer.module.css';

const SideDrawer = ({ children }) => {
	return <aside className={classes.sideDrawer}>{children}</aside>;
};

export default SideDrawer;
