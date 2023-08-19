import UsersList from '../../components/users/UsersList';

const HomePage = () => {
	const DUMMY_USERS = [
		{
			name: 'John Doe',
			id: 'johndoe123',
			image:
				'https://cdn.pixabay.com/photo/2023/08/12/04/24/mabry-mill-8184715_1280.jpg',
			places: 5,
		},
		{
			name: 'Jane Smith',
			id: 'janesmith456',
			image:
				'https://cdn.pixabay.com/photo/2021/01/11/19/14/windmill-5909414_1280.jpg',
			places: 8,
		},
		{
			name: 'Michael Johnson',
			id: 'michaeljohnson789',
			image:
				'https://cdn.pixabay.com/photo/2019/06/23/01/56/cityscape-4292702_1280.jpg',
			places: 3,
		},
	];
	return <UsersList users={DUMMY_USERS} />;
};

export default HomePage;
