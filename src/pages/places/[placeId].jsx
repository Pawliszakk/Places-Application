import { useRouter } from 'next/router';

const PlaceEditPage = () => {
	const router = useRouter();
	const placeId = router.query.placeId;

	return <h1>Edit page of {placeId} place</h1>;
};

export default PlaceEditPage;
