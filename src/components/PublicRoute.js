import { useAuth } from 'hooks/useAuth';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({
	component,
	restricted = false,
	redirectTo = '/',
}) => {
	const { isLoggedIn } = useAuth();
	const shouldRedirect = isLoggedIn && restricted;

	return shouldRedirect ? <Navigate to={redirectTo} /> : component;
};
