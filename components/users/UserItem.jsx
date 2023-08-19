import classes from './UserItem.module.css';

const UserItem = ({ id, name, image, placeCount }) => {
	return (
		<li className={classes.userItem}>
			<div className={classes.content}>
				<div className={classes.image}>
					<img src={image} alt={`${name} Place photo`} />
				</div>
				<div className={classes.info}>
					<h2>{name}</h2>
					<h3>
						{placeCount} {placeCount === 1 ? 'Place' : 'Places'}
					</h3>
				</div>
			</div>
		</li>
	);
};

export default UserItem;
