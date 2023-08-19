import Link from 'next/link';
import Avatar from '../UI/Avatar';
import classes from './UserItem.module.css';
import Card from '../UI/Card';

const UserItem = ({ id, name, image, placeCount }) => {
	return (
		<li className={classes.userItem}>
			<Card className={classes.content}>
				<Link href={`/${id}/places`}>
					<div className={classes.image}>
						<Avatar image={image} alt={`${name} Place photo`} />
					</div>
					<div className={classes.info}>
						<h2>{name}</h2>
						<h3>
							{placeCount} {placeCount === 1 ? 'Place' : 'Places'}
						</h3>
					</div>
				</Link>
			</Card>
		</li>
	);
};

export default UserItem;
