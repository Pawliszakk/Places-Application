import classes from './LoadingSpinner.module.css';

const LoadingSpinner = ({ asOverlay }) => {
	const overlayClasses = asOverlay && classes.overlay;

	return (
		<div className={overlayClasses}>
			<div className={classes.ring}></div>
		</div>
	);
};

export default LoadingSpinner;
