import classes from './Card.module.css';

const Card = ({ className, style, children }) => {
	return (
		<div className={`${classes.card} ${className}`} style={style}>
			{children}
		</div>
	);
};

export default Card;
