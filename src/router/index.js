import { lazy } from 'react';

const RegisterPage = lazy(() => import('../pages/Registration/Registration'));
const LoginPage = lazy(() => import('../pages/Login/Login'));
const AddPostPage = lazy(() => import('../pages/AddPost/AddPost'));
const FullPostPage = lazy(() => import('../pages/FullPost'));
const HomePage = lazy(() => import('../pages/Home'));
const TagsPage = lazy(() => import('../pages/Tags/Tags'));

export const publicRoutes = [
	{ path: '/', component: <HomePage /> },
	{ path: 'tags/:name', component: <TagsPage /> },
	{ path: 'login', component: <LoginPage /> },
	{ path: 'register', component: <RegisterPage /> },
];

export const privateRoutes = [
	{ path: '/', component: <HomePage /> },
	{ path: 'add-post', component: <AddPostPage /> },
	{ path: 'posts/:id/edit', component: <AddPostPage /> },
	{ path: 'tags/:name', component: <TagsPage /> },
	{ path: 'posts/:id', component: <FullPostPage /> },
];
