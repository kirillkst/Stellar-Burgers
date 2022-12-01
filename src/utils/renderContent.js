import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errors/ErrorMessage';

const renderContent = (process, Component, data) => {
	switch (process) {
		case 'waiting':
			return <Spinner />;
		case 'loading':
			return <Spinner />;
		case 'confirmed':
			return <Component {...data} />;
		case 'error':
			return <ErrorMessage />;
		default:
			throw new Error('Unexpected process state');
	}
};

export default renderContent;
