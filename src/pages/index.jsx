import UsersList from '../../components/users/UsersList';

const HomePage = ({ users }) => {
	return <UsersList users={users} />;
};

export default HomePage;

export const getServerSideProps = async () => {
	const res = await fetch('http://localhost:5000/api/users');
	if (!res.ok) {
		return {
			props: {
				users: [],
			},
		};
	}
	const resData = await res.json();

	const users = resData.users;

	return {
		props: {
			users,
		},
	};
};
