import { createPortal } from 'react-dom';

import classes from './SideDrawer.module.css';

const SideDrawer = ({ children }) => {
	const content = <aside className={classes.sideDrawer}>{children}</aside>;

	return createPortal(content, document.getElementById('drawer'));
};

export default SideDrawer;
