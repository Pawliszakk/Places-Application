import UserPlaceList from '../../../components/users/UserPlaces/PlacesList/UserPlaceList';

const UserPlacesPage = ({ places }) => {
	return <UserPlaceList places={places} />;
};

export default UserPlacesPage;

export const getServerSideProps = async ({ params }) => {
	const userId = params.userId;
	let res;
	try {
		res = await fetch(`http://localhost:5000/api/places/user/${userId}`);
	} catch (err) {
		return { props: { places: [] } };
	}
	if (!res.ok) {
		return { props: { places: [] } };
	}
	const resData = await res.json();

	return {
		props: {
			places: resData.places,
		},
	};
};
