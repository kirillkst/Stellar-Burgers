import { createSlice } from '@reduxjs/toolkit';
import { WebsocketStatus } from '../utils/types';



const initialState: {
	status: WebsocketStatus,
    connectionError: string,
	ordersInfo: {
		orders: Array<any>,
		totalOrders: number | null,
		totalToday: number | null
	}
} = {
    status: WebsocketStatus.OFFLINE,
    connectionError: '',
	ordersInfo: {
		orders: [],
		totalOrders: null,
		totalToday: null
	}
};

const socketSlice = createSlice({
	name: 'websocket',
	initialState,
	reducers: {
		wsConnection(state, action) {},
		wsDisconnection(state, action) {},
		wsOpen: (state) => {
			state.status = WebsocketStatus.ONLINE;
			state.connectionError = '';
		},
		wsClose: (state) => {
			state.status = WebsocketStatus.OFFLINE;
		},
		wsMessage: (state, action) => {
			const { orders, total, totalToday } = action.payload;
			state.ordersInfo.orders = orders;
			state.ordersInfo.totalOrders = total;
			state.ordersInfo.totalToday = totalToday;
		},
		wsError: (state, action) => {
			state.status = WebsocketStatus.ONLINE;
			state.connectionError = action.payload;
		},
	},
});

const { actions, reducer } = socketSlice;

export const { wsConnection, wsDisconnection, wsOpen, wsClose, wsMessage, wsError } = actions;

export default reducer;
