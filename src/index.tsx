import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './store';

import ErrorBoundary from './components/errors/ErrorBoundary';
import App from './components/app/App';

import './styles/style.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
<React.StrictMode>
	<Provider store={store}>
		<ErrorBoundary>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ErrorBoundary>
	</Provider>
</React.StrictMode>
);
