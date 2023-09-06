import { createPortal } from 'react-dom';
import classes from './Modal.module.css';
import Backdrop from './Backdrop';

const ModalOverlay = ({
	className,
	style,
	headerClass,
	header,
	contentClass,
	children,
	footer,
	onSubmit,
	footerClass,
}) => {
	const content = (
		<div className={`${classes.modal} ${className}`} style={style}>
			<header className={`${classes.header} ${headerClass}`}>
				<h2>{header}</h2>
			</header>
			<form onSubmit={onSubmit ? onSubmit : (e) => e.preventDefault()}>
				<div className={`${classes.content} ${contentClass}`}>{children}</div>
				<footer className={`${classes.footer} ${footerClass}`}>{footer}</footer>
			</form>
		</div>
	);
	return createPortal(content, document.getElementById('modal-hook'));
};

const Modal = (props) => {
	return (
		<>
			{props.show && <Backdrop onClick={props.onCancel} />}
			<ModalOverlay {...props} />
		</>
	);
};

export default Modal;
