import Link from 'next/link';
import classes from './NavLinks.module.css';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import AuthContext from '../../../../context/auth-context';
const NavLinks = () => {
	const router = useRouter();
	const currentPath = router.asPath;

	const authCtx = useContext(AuthContext);
	const isLoggedIn = authCtx.isLoggedIn;

	const links = [
		{ name: 'All Users', href: '/', show: true },
		{ name: 'My Places', href: `/${authCtx.userId}/places`, show: isLoggedIn },
		{ name: 'Add Place', href: '/places/new', show: isLoggedIn },
		{ name: 'Authenticate', href: '/auth', show: !isLoggedIn },
	];

	return (
		<ul className={classes.navLinks}>
			{links.map((link) => {
				if (link.show) {
					return (
						<li key={link.name}>
							<Link
								className={currentPath === link.href ? classes.active : null}
								href={link.href}
							>
								{link.name}
							</Link>
						</li>
					);
				}
			})}
			{isLoggedIn && (
				<li>
					<button onClick={authCtx.logout}>Logout</button>
				</li>
			)}
		</ul>
	);
};

export default NavLinks;
