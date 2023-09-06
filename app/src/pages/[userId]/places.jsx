import { useRouter } from 'next/router';
import UserPlaceList from '../../../components/users/UserPlaces/PlacesList/UserPlaceList';
const places = [
	{
		id: 1,
		image:
			'https://cdn.pixabay.com/photo/2023/07/10/06/52/trail-8117575_1280.jpg',
		title: 'Tytuł miejsca 1',
		description: 'Opis miejsca 1',
		address: 'Adres miejsca 1',
		creator: 'janesmith456',
		coordinates: { lat: 123.456, lng: 789.012 },
	},
	{
		id: 2,
		image:
			'https://cdn.pixabay.com/photo/2023/08/12/04/24/mabry-mill-8184715_1280.jpg',
		title: 'Tytuł miejsca 2',
		description: 'Opis miejsca 2',
		address: 'Adres miejsca 2',
		creator: 'janesmith456',
		coordinates: { lat: 456.789, lng: 123.456 },
	},
	{
		id: 3,
		image:
			'https://cdn.pixabay.com/photo/2023/07/05/18/13/mountains-8108961_1280.jpg',
		title: 'Tytuł miejsca 3',
		description: 'Opis miejsca 3',
		address: 'Adres miejsca 3',
		creator: 'michaeljohnson789',
		coordinates: { lat: 789.012, lng: 456.789 },
	},
	{
		id: 4,
		image:
			'https://cdn.pixabay.com/photo/2023/08/08/21/25/france-8178164_1280.jpg',
		title: 'Tytuł miejsca 4',
		description: 'Opis miejsca 4',
		address: 'Adres miejsca 4',
		creator: 'michaeljohnson789',
		coordinates: { lat: 345.678, lng: 901.234 },
	},
	{
		id: 5,
		image:
			'https://cdn.pixabay.com/photo/2023/05/01/14/14/mountains-7963159_1280.jpg',
		title: 'Tytuł miejsca 5',
		description: 'Opis miejsca 5',
		address: 'Adres miejsca 5',
		creator: 'michaeljohnson789',
		coordinates: { lat: 567.89, lng: 123.567 },
	},
];
const UserPlacesPage = () => {
	const router = useRouter();
	const userId = router.query.userId;

	const filteredPlaces = places.filter((place) => place.creator === userId);

	return <UserPlaceList places={filteredPlaces} />;
};

export default UserPlacesPage;
