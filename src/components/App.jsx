//import { Box, LinearProgress } from '@mui/material';
//import { Layout } from 'components';
//import { Navigate, Route, Routes } from 'react-router-dom';
//import { useDispatch } from 'react-redux';
//import { useEffect } from 'react';
//import { fetchUser } from 'redux/user/operations';
//import { useAuth } from 'hooks/useAuth';
//import { privateRoutes, publicRoutes } from 'router';

//export const App = () => {
//	const dispatch = useDispatch();
//	const { isRefreshing, isLoggedIn } = useAuth();

//	useEffect(() => {
//		dispatch(fetchUser());
//	}, [dispatch]);

//	return (
//		<>
//			{isRefreshing ? (
//				<>
//					<Box sx={{ width: '100%' }}>
//						<LinearProgress />
//					</Box>
//				</>
//			) : isLoggedIn ? (
//				<Routes>
//					<Route path="/" element={<Layout />}>
//						{privateRoutes?.map((route, ind) => {
//							return (
//								<Route key={ind} path={route.path} element={route.component} />
//							);
//						})}
//					</Route>
//					<Route path="*" element={<Navigate to="/" replace />} />
//				</Routes>
//			) : (
//				<Routes>
//					<Route path="/" element={<Layout />}>
//						{publicRoutes?.map((route, ind) => {
//							return (
//								<Route key={ind} path={route.path} element={route.component} />
//							);
//						})}
//					</Route>
//					<Route path="*" element={<Navigate to="/login" replace />} />
//				</Routes>
//			)}
//		</>
//	);
//};

//import { Box, LinearProgress } from '@mui/material';
import { Layout } from 'components';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { lazy, useEffect, useState } from 'react';
import { fetchUser } from 'redux/user/operations';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import preLoader from 'images/preloader2.gif';

const RegisterPage = lazy(() => import('../pages/Registration/Registration'));
const LoginPage = lazy(() => import('../pages/Login/Login'));
const AddPostPage = lazy(() => import('../pages/AddPost/AddPost'));
const FullPostPage = lazy(() => import('../pages/FullPost'));
const HomePage = lazy(() => import('../pages/Home'));
const TagsPage = lazy(() => import('../pages/Tags/Tags'));

export const App = () => {
	const [isLoadingApp, setIsLoadingApp] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUser()).then(() => {
			setIsLoadingApp(false);
		});
	}, [dispatch]);

	return isLoadingApp ? (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
			}}
		>
			<img src={preLoader} alt="preloader" />
		</div>
	) : (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route
						path="posts/:id"
						element={
							<PrivateRoute redirectTo="/login" component={<FullPostPage />} />
						}
					/>

					<Route
						path="add-post"
						element={
							<PrivateRoute redirectTo="/login" component={<AddPostPage />} />
						}
					/>

					<Route
						path="posts/:id/edit"
						element={
							<PrivateRoute redirectTo="/login" component={<AddPostPage />} />
						}
					/>
					<Route path="tags/:name" element={<TagsPage />} />
					<Route
						path="login"
						element={<PublicRoute restricted component={<LoginPage />} />}
					/>

					<Route
						path="register"
						element={<PublicRoute restricted component={<RegisterPage />} />}
					/>
				</Route>
			</Routes>
		</>
	);
};
