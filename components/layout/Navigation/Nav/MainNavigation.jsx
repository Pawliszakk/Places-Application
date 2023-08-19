import Link from 'next/link';
import MainHeader from '../MainHeader';
import classes from './MainNavigation.module.css';
import NavLinks from './NavLinks';

const MainNavigation = () => {
	return (
		<MainHeader>
			<button className={classes.menuBtn}>
				<span></span>
				<span></span>
				<span></span>
			</button>
			<h1 className={classes.title}>
				<Link href="/"> YourPlaces</Link>
			</h1>
			<nav className={classes.headerNav}>
				<NavLinks />
			</nav>
		</MainHeader>
	);
};

export default MainNavigation;
