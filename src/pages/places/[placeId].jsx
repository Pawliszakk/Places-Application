import { useRouter } from 'next/router';
import EditPlace from '../../../components/places/EditPlace';

const PlaceEditPage = ({ place }) => {
	return (
		<EditPlace
			placeId={place.id}
			title={place.title}
			description={place.description}
		/>
	);
};

export default PlaceEditPage;

export async function getServerSideProps({ params }) {
	const placeId = params.placeId;
	let resData;
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/places/${placeId}`
		);
		resData = await res.json();
	} catch (err) {
		return {
			props: { place: null },
		};
	}

	return {
		props: {
			place: resData.place,
		},
	};
}
