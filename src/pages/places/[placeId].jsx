import { useRouter } from 'next/router';
import EditPlace from '../../../components/places/EditPlace';

const PlaceEditPage = () => {
	const router = useRouter();
	const placeId = router.query.placeId;

	return (
		<>
			<h1>The edit page of {placeId} place, make sure you save edits!</h1>
			<EditPlace />
		</>
	);
};

export default PlaceEditPage;
