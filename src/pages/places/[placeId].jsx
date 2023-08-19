import { useRouter } from 'next/router';

const PlaceEditPage = () => {
	const router = useRouter();
	const placeId = router.query.placeId;

	return <h1>The edit page of {placeId} place, make sure you save edits!</h1>;
};

export default PlaceEditPage;
