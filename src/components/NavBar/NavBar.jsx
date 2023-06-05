import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { Link, NavLink } from 'react-router-dom';
import { SearchField, UserMenu } from 'components';
import logoSvg from 'images/logo.svg';
import styles from './NavBar.module.scss';
import { useAuth } from 'hooks/useAuth';

const pages = [{ path: '/my-articles', name: 'My articles' }];

export const NavBar = () => {
	const { user } = useAuth();

	return (
		<AppBar
			position="sticky"
			color="secondary"
			sx={{
				color: 'text.primary',
				mb: 1,
			}}
		>
			<Container maxWidth="lg">
				<Toolbar disableGutters>
					<Box
						sx={{
							display: { xs: 'none', md: 'flex' },
							backgroundColor: '#afb977',
							p: 1,
							borderRadius: '5px',
						}}
					>
						<Link to="/" className={styles.link}>
							BLOG
						</Link>
					</Box>
					<Box
						sx={{
							flexGrow: { xs: 1, sm: 0 },
							display: { xs: 'flex', md: 'none' },
						}}
					>
						<Box className={styles.ibg}>
							<Link to="/">
								<img src={logoSvg} alt="logo" />
							</Link>
						</Box>
					</Box>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
						{pages.map(page => {
							return (
								<Box
									key={page}
									sx={{
										my: 2,
										color: 'white',
										display: { xs: 'none', csb: 'block' },
									}}
								>
									<NavLink
										className={`${styles.link} ${styles.linkRoute}`}
										style={({ isActive, isPending }) => {
											return {
												color: isActive && '#fdea81',
											};
										}}
										to={page.path}
									>
										{page.name}
									</NavLink>
								</Box>
							);
						})}
					</Box>

					<Box
						sx={{
							mr: { xs: '0', sm: '10px' },
							pl: 1,
							display: { xs: 'none', sm: 'block' },
						}}
					>
						<SearchField />
					</Box>
					<UserMenu user={user} />
				</Toolbar>
			</Container>
		</AppBar>
	);
};
