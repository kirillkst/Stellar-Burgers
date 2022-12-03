import React from 'react';
import ReactDOM from 'react-dom/client';

import ErrorBoundary from './components/errors/ErrorBoundary';
import App from './components/app/App';

import './styles/style.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
<React.StrictMode>
	<ErrorBoundary>
		<App />
	</ErrorBoundary>
</React.StrictMode>
);
