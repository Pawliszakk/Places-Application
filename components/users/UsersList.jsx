import UserItem from './UserItem';
import classes from './UsersList.module.css';

const UsersList = ({ users }) => {
	if (!users || users.length === 0) {
		return <h2>No users Found...</h2>;
	}
	return (
		<ul className={classes.usersList}>
			{users.map((user) => (
				<UserItem
					key={user.id}
					name={user.name}
					id={user.id}
					image={user.image}
					placeCount={user.places}
				/>
			))}
		</ul>
	);
};

export default UsersList;
