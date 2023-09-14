import classes from './UserPlaceList.module.css';
import PlaceItem from './PlaceItem';
import Card from '../../../places/UI/Card';
import Link from 'next/link';

const UserPlaceList = ({ places }) => {
	if (!places || places.length === 0) {
		return (
			<div className={classes.placeList}>
				<Card>
					<h2>No places found. Maybe create one?</h2>
					<Link href="/places/new">Share new place!</Link>
				</Card>
			</div>
		);
	}

	return (
		<ul className={classes.placeList}>
			{places.map((place) => (
				<PlaceItem
					key={place.id}
					id={place.id}
					image={place.image}
					title={place.title}
					description={place.description}
					address={place.address}
					creatorId={place.creator}
					coordinates={place.location}
				/>
			))}
		</ul>
	);
};

export default UserPlaceList;
