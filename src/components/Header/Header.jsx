import React from 'react';
import Button from '@mui/material/Button';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from 'redux/user/slice';
import { SearchField, UserInfo } from 'components';
import { useAuth } from 'hooks/useAuth';

export const Header = () => {
	const dispatch = useDispatch();
	const { isLoggedIn, user } = useAuth();

	const handleClickLogout = () => {
		// eslint-disable-next-line no-restricted-globals
		if (confirm('Are you sure?')) {
			dispatch(logOut());
		}
	};

	return (
		<div className={styles.root}>
			<Container maxWidth="lg">
				<div className={styles.inner}>
					<Link className={styles.logo} to="/">
						<div>React-BLOG</div>
					</Link>
					<SearchField />
					<div className={styles.buttons}>
						{isLoggedIn ? (
							<>
								<UserInfo
									avatarUrl={user?.avatarUrl}
									fullName={user?.fullName}
								/>
								<Link to="/add-post">
									<Button variant="contained">Сreate Post</Button>
								</Link>
								<Button
									onClick={handleClickLogout}
									variant="contained"
									color="error"
								>
									Exit
								</Button>
							</>
						) : (
							<>
								<Link to="/login">
									<Button variant="outlined">Sign In</Button>
								</Link>
								<Link to="/register">
									<Button variant="contained">Sign Up</Button>
								</Link>
							</>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
};
