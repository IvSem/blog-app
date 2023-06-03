import { Layout, Loader } from 'components';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchUser } from 'redux/user/operations';

import { routes } from 'router';

export const App = () => {
	const [isLoadingApp, setIsLoadingApp] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUser()).then(() => {
			setIsLoadingApp(false);
		});
	}, [dispatch]);

	return isLoadingApp ? (
		<Loader />
	) : (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					{routes.map((route, index) => (
						<Route
							key={index}
							path={route.path}
							element={route.element}
							{...(route.index === true ? { index: true } : {})}
						/>
					))}
				</Route>
			</Routes>
		</>
	);
};
