import UserPlaceList from '../../../components/users/UserPlaces/PlacesList/UserPlaceList';

const UserPlacesPage = ({ places }) => {
	return <UserPlaceList places={places} />;
};

export default UserPlacesPage;

export const getServerSideProps = async ({ params }) => {
	const userId = params.userId;
	let resData;
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/places/user/${userId}`
		);
		if (!res.ok) {
			return { props: { places: [] } };
		}
		resData = await res.json();
	} catch (err) {
		return { props: { places: [] } };
	}

	return {
		props: {
			places: resData.places,
		},
	};
};
