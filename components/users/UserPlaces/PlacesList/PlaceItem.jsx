import { useRouter } from 'next/router';
import Card from '../../../UI/Card';
import classes from './PlaceItem.module.css';
import { useState } from 'react';
import Modal from '../../../UI/Modal';
const PlaceItem = ({
	id,
	image,
	title,
	description,
	address,
	creatorId,
	coordinates,
}) => {
	const [isMap, setIsMap] = useState(false);
	const router = useRouter();
	const showMapHandler = () => setIsMap(true);
	const hideMapHandler = () => setIsMap(false);
	return (
		<>
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
						<button onClick={showMapHandler}>View on map</button>
						<button onClick={() => router.push(`/places/${id}`)}>Edit</button>
						<button>Delete</button>
					</div>
				</Card>
			</li>
			{isMap && (
				<Modal
					show={isMap}
					onCancel={hideMapHandler}
					header={classes.address}
					contentClass={classes.modalContent}
					footerClass={classes.modalActions}
					footer={<button onClick={hideMapHandler}>CLOSE</button>}
				>
					<div className={classes.mapContainer}>The Map!</div>
				</Modal>
			)}
		</>
	);
};

export default PlaceItem;
