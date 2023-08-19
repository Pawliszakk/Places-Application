import { useRouter } from 'next/router';

const UserPlaces = () => {
	const router = useRouter();
	const userId = router.query.userId;
    
	return <h1>Places of {userId}</h1>;
};

export default UserPlaces;
