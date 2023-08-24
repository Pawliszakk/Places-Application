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
	const [isDelete, setIsDelete] = useState(false);

	const router = useRouter();
	const showMapHandler = () => setIsMap(true);
	const hideMapHandler = () => setIsMap(false);

	const showDeleteHandler = () => setIsDelete(true);
	const hideDeleteHandler = () => setIsDelete(false);
	const deleteItemHandler = (id) => {
		//Fetch api to deleting item
		console.log(`zara bede usuwała item o id ${id}!`);
		setIsDelete(false);
	};
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
						<button onClick={showDeleteHandler}>Delete</button>
					</div>
				</Card>
			</li>
			{isMap && (
				<Modal
					show={isDelete}
					onCancel={hideMapHandler}
					header={classes.address}
					contentClass={classes.modalContent}
					footerClass={classes.modalActions}
					footer={<button onClick={hideMapHandler}>CLOSE</button>}
				>
					<div className={classes.mapContainer}>The Map!</div>
				</Modal>
			)}
			{isDelete && (
				<Modal
					show={isMap}
					onCancel={hideDeleteHandler}
					header={classes.address}
					contentClass={classes.modalContent}
					footerClass={classes.modalActions}
					footer={
						<>
							<button onClick={hideDeleteHandler}>Cancel</button>
							<button onClick={() => deleteItemHandler(id)}>Delete</button>
						</>
					}
				>
					<div className={classes.mapContainer}>
						Do you want to proceed and delete this place? Please note that it
						can't be undone thereafter!
					</div>
				</Modal>
			)}
		</>
	);
};

export default PlaceItem;
