import { createPortal } from 'react-dom';

 import classes from './Backdrop.module.css';

const Backdrop = ({ onClick }) => {
	return createPortal(
		<div className={classes.backdrop} onClick={onClick}></div>,
		document.getElementById('backdrop-hook')
	);
};

export default Backdrop;
