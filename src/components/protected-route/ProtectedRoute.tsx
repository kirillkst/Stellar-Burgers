import { Route, Redirect, useLocation, RouteProps  } from 'react-router-dom';
import { TLocation, TProtectedRoute } from '../../utils/types';
import { useSelector } from '../../store';

const ProtectedRoute = ({ onlyForAuth, children, ...rest } : TProtectedRoute & RouteProps) => {
	const isAuth = useSelector((store) => store.user.auth);
	const location = useLocation<TLocation>();

	if (!onlyForAuth && isAuth) {
		const { from } = location.state || { from: { pathname: '/' } };
		return (
			<Route {...rest}>
				<Redirect to={from} />
			</Route>
		);
	}

	if (onlyForAuth && !isAuth) {
		return (
			<Route {...rest}>
				<Redirect to={{ pathname: '/login', state: { from: location } }} />
			</Route>
		);
	}

	return <Route {...rest}>{children}</Route>;
};

export default ProtectedRoute;
