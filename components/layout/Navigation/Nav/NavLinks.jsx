import Link from 'next/link';
import classes from './NavLinks.module.css';
import { useRouter } from 'next/router';
const NavLinks = () => {
	const router = useRouter();
	const currentPath = router.asPath;

	const links = [
		{ name: 'All Users', href: '/' },
		{ name: 'My Places', href: '/u1/places' },
		{ name: 'Add Place', href: '/places/new' },
		{ name: 'Authenticate', href: '/auth' },
	];

	return (
		<ul className={classes.navLinks}>
			{links.map((link) => (
				<li key={link.name}>
					<Link
						className={currentPath === link.href ? classes.active : null}
						href={link.href}
					>
						{link.name}
					</Link>
				</li>
			))}
		</ul>
	);
};

export default NavLinks;
