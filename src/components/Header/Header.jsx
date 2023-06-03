//import React from 'react';
//import styles from './Header.module.scss';
//import Container from '@mui/material/Container';
//import { Link } from 'react-router-dom';
//import { AuthMenu, SearchField, UserMenu } from 'components';
//import { useAuth } from 'hooks/useAuth';

//export const Header = () => {
//	const { isLoggedIn, user } = useAuth();

//	return (
//		<div className={styles.root}>
//			<Container maxWidth="lg">
//				<div className={styles.inner}>
//					<Link className={styles.logo} to="/">
//						<div>React-BLOG</div>
//					</Link>
//					<SearchField />
//					<div className={styles.buttons}>
//						{isLoggedIn ? <UserMenu user={user} /> : <AuthMenu />}
//					</div>
//				</div>
//			</Container>
//		</div>
//	);
//};
