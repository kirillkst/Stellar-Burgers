import { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from '../index';
import { TwsActionTypes } from '../../utils/types';


export const socketMiddleware =	(wsActions: TwsActionTypes): Middleware =>
	(store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;
		let isConnected = false;
		let reconnectTimer = 0;
		let url = '';

		return (next) => (action) => {
			const { dispatch } = store;

      const { connection, disconnection, onOpen, onClose, onError, onMessage } = wsActions;

			if (connection.match(action)) {
				url = action.payload.url;
				socket = new WebSocket(url);
				isConnected = true;			
			}

			if (socket) {
				socket.onopen = () => {
					dispatch(onOpen());
				};

				socket.onerror = (err) => {
				};

				socket.onmessage = (event) => {
					const { data } = event;
					dispatch(onMessage( JSON.parse(data) ));
				};

				socket.onclose = (event) => {
					dispatch(onClose());

					if (isConnected) {
						reconnectTimer = window.setTimeout(() => {
							dispatch(connection(url));
						}, 3000);
					}
				};

				// if (wsSendMessage && wsSendMessage.match(action)) {
				// 	console.log('send');
				// 	socket.send(JSON.stringify(action.payload));
				// }

				if (disconnection.match(action)) {
					clearTimeout(reconnectTimer);
					isConnected = false;
					reconnectTimer = 0;

          if (socket.readyState === 1) {
            socket.close();
          }					
				}
			}

			next(action);
		};
	};
