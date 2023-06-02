import { Container } from '@mui/system';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header/Header';

export const Layout = () => {
	return (
		<>
			<Header />
			<Suspense fallback={null}>
				<Container maxWidth="lg">
					<Outlet />
				</Container>
			</Suspense>
		</>
	);
};
