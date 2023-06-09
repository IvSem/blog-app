import { Container } from '@mui/system';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Loader } from './Loader/Loader';
import { NavBar } from './NavBar/NavBar';

export const Layout = () => {
	return (
		<>
			<NavBar />
			<Suspense fallback={<Loader />}>
				<Container
					maxWidth="lg"
					sx={{
						backgroundColor: 'background.default',
						color: 'text.primary',
						minHeight: '100vh',
					}}
				>
					<Outlet />
				</Container>
			</Suspense>
		</>
	);
};
