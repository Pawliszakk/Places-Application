import { useRouter } from 'next/router';
import Card from '../../../UI/Card';
import classes from './PlaceItem.module.css';

const PlaceItem = ({
	id,
	image,
	title,
	description,
	address,

}) => {
	const router = useRouter();

	return (
		<li className={classes.placeItem}>
			<Card className={classes.content}>
				<div className={classes.image}>
					<img src={image} alt={title} />
				</div>
				<div className={classes.info}>
					<h2>{title}</h2>
					<h3>{address}</h3>
					<p>{description}</p>
				</div>
				<div className={classes.actions}>
					<button>VIEV ON MAP</button>
					<button onClick={() => router.push(`/places/${id}`)}>EDIT</button>
					<button>DELETE</button>
				</div>
			</Card>
		</li>
	);
};

export default PlaceItem;
