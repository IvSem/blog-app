import {
	Avatar,
	Box,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Tooltip,
	Typography,
} from '@mui/material';

import React from 'react';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { logOut } from 'redux/user/slice';
import { stringAvatar } from 'utils/avatar';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from 'hooks/useAuth';

const pages = [
	//{ path: '/my-articles', name: 'My articles' },
	{
		path: '/add-post',
		name: 'Create Post',
	},
];
const settings = ['Account'];

export const UserMenu = ({ user }) => {
	const { isLoggedIn } = useAuth();
	const dispatch = useDispatch();

	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const [anchorElNav, setAnchorElNav] = React.useState(null);

	const handleOpenNavMenu = event => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleOpenUserMenu = event => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleClickLogout = () => {
		// eslint-disable-next-line no-restricted-globals
		if (confirm('Are you sure?')) {
			dispatch(logOut());
		}
	};

	return (
		<>
			{isLoggedIn ? (
				<>
					<Box>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar {...stringAvatar(user?.fullName)} />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{settings.map(setting => (
								<MenuItem key={setting} onClick={handleCloseUserMenu}>
									<Typography textAlign="center">{setting}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
						<Link to="/add-post">
							<Button
								variant="contained"
								startIcon={<AddIcon />}
								sx={{ ml: '10px' }}
							>
								Сreate Post
							</Button>
						</Link>
						<Button
							onClick={handleClickLogout}
							variant="contained"
							color="error"
							sx={{ ml: '10px' }}
						>
							Exit
						</Button>
					</Box>
				</>
			) : (
				<>
					<Link to="/login">
						<Button sx={{ mr: 1 }} variant="contained" color="success">
							Sign In
						</Button>
					</Link>
					<Link to="/register">
						<Button variant="contained" color="info">
							Sign Up
						</Button>
					</Link>
				</>
			)}
			{isLoggedIn && (
				<Box sx={{ flexGrow: 0, display: { xs: 'flex', sm: 'none' } }}>
					<IconButton
						size="large"
						aria-label="account of current user"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						onClick={handleOpenNavMenu}
						color="inherit"
					>
						<MenuIcon />
					</IconButton>
					<Menu
						id="menu-appbar"
						anchorEl={anchorElNav}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'left',
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'left',
						}}
						open={Boolean(anchorElNav)}
						onClose={handleCloseNavMenu}
						sx={{
							display: { xs: 'block', md: 'none' },
						}}
					>
						{pages.map(page => {
							return (
								<MenuItem key={page.name} onClick={handleCloseNavMenu}>
									<Link
										to={page.path}
										style={{
											color: 'inherit',
											fontWeight: 700,
											textDecoration: 'none',
											fontSize: '20px',
										}}
									>
										{page.name}
									</Link>
								</MenuItem>
							);
						})}
					</Menu>
				</Box>
			)}
		</>
	);
};
