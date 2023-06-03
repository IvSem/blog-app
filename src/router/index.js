import { PrivateRoute } from 'components/PrivateRoute';
import { PublicRoute } from 'components/PublicRoute';
import { lazy } from 'react';

const RegisterPage = lazy(() => import('../pages/Registration/Registration'));
const LoginPage = lazy(() => import('../pages/Login/Login'));
const AddPostPage = lazy(() => import('../pages/AddPost/AddPost'));
const FullPostPage = lazy(() => import('../pages/FullPost'));
const HomePage = lazy(() => import('../pages/Home'));
const TagsPage = lazy(() => import('../pages/Tags/Tags'));
const MyArticlesPage = lazy(() => import('../pages/MyArticles/MyArticles'));

export const routes = [
	{ index: true, element: <HomePage /> },
	{
		path: 'posts/:id',
		element: <PrivateRoute redirectTo="/login" component={<FullPostPage />} />,
	},
	{
		path: 'add-post',
		element: <PrivateRoute redirectTo="/login" component={<AddPostPage />} />,
	},
	{
		path: 'posts/:id/edit',
		element: <PrivateRoute redirectTo="/login" component={<AddPostPage />} />,
	},
	{ path: 'tags/:name', element: <TagsPage /> },
	{
		path: 'login',
		element: <PublicRoute restricted component={<LoginPage />} />,
	},
	{
		path: 'register',
		element: <PublicRoute restricted component={<RegisterPage />} />,
	},
	{
		path: 'my-articles',
		element: <PublicRoute component={<MyArticlesPage />} />,
	},
];
