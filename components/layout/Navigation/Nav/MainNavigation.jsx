import { useState } from 'react';
import Link from 'next/link';

import MainHeader from '../MainHeader';
import classes from './MainNavigation.module.css';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../../../places/UI/Backdrop';

const MainNavigation = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const handleDrawer = () => setIsDrawerOpen((prevState) => !prevState);

	return (
		<>
			{isDrawerOpen ? (
				<>
					<SideDrawer show={isDrawerOpen} onClick={handleDrawer}>
						<nav className={classes.drawerNav}>
							<NavLinks />
						</nav>
					</SideDrawer>

					<Backdrop onClick={handleDrawer} />
				</>
			) : null}

			<MainHeader>
				<button onClick={handleDrawer} className={classes.menuBtn}>
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
		</>
	);
};

export default MainNavigation;
