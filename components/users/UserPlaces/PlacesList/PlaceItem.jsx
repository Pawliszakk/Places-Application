import { useRouter } from 'next/router';
import Card from '../../../UI/Card';
import classes from './PlaceItem.module.css';
import { useContext, useState } from 'react';
import Modal from '../../../UI/Modal';
import AuthContext from '../../../../context/auth-context';
import LoadingSpinner from '../../../UI/LoadingSpinner';
import ErrorModal from '../../../UI/ErrorModal';

const PlaceItem = ({ id, image, title, description, address, creatorId }) => {
	const [isMap, setIsMap] = useState(false);
	const [isDelete, setIsDelete] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);

	const authCtx = useContext(AuthContext);
	const router = useRouter();

	const showMapHandler = () => setIsMap(true);
	const hideMapHandler = () => setIsMap(false);

	const showDeleteHandler = () => setIsDelete(true);
	const hideDeleteHandler = () => setIsDelete(false);

	const deleteItemHandler = async (id) => {
		setIsLoading(true);

		try {
			const res = await fetch(`http://localhost:5000/api/places/${id}`, {
				method: 'DELETE',
			});
			if (!res.ok) {
				setError('Cant delete place');
				return;
			}
			const resData = await res.json();
			setError(resData.message);
			router.push(`/${authCtx.userId}/places`);
		} catch (err) {
			setError(err.message || 'Something went wrong');
		}

		setIsDelete(false);
		setIsLoading(false);
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
						{authCtx.isLoggedIn && authCtx.userId === creatorId && (
							<>
								<button onClick={() => router.push(`/places/${id}`)}>
									Edit
								</button>
								<button onClick={showDeleteHandler}>Delete</button>
							</>
						)}
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
			{error && <ErrorModal onClear={() => setError(false)} error={error} />}
			{isLoading && <LoadingSpinner />}
		</>
	);
};

export default PlaceItem;
