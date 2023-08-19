import { createPortal } from 'react-dom';

import classes from './SideDrawer.module.css';

const SideDrawer = ({ children, show, onClick }) => {
	const content = (
		<aside onClick={onClick} className={classes.sideDrawer}>
			{children}
		</aside>
	);

	return createPortal(content, document.getElementById('drawer'));
};

export default SideDrawer;
