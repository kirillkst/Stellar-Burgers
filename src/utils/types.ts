import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';

export enum PROCESS_STATE {
    WAITING = 'waiting',
    LOADING = 'loading',
    CONFIRMED = 'confirmed',
    ERROR = 'error'
  }

export type TIngredient = {
	calories: number;
	carbohydrates: number;
	fat: number;
	image: string;
	image_large: string;
	image_mobile: string;
	name: string;
	price: number;
	proteins: number;
	type: string;
	__v: string;
	_id: string;
	id: string;
	counter?:any;
	count?:number;
};

export type TIngredientId = Pick<TIngredient, '_id'>;

export type TBurgerConstructor = {
	bun: TIngredient;
	ingredients: Array<TIngredient>;
	total: number;
};

export type TBurgerIngredients = {
	ingredients: Array<TIngredient>;
};

export type TConstructorItem = {
	id:string;
	name:string;
	price:number;
	thumbnail: string;
	index:number;
	moveCard: (dragIndex:number, hoverIndex:number) => void
}

export type TIngredientCategory = {
	typeRefs: HTMLElement | any;
	componentsRef: HTMLElement | any;
	category: { key: string; name: string };
	ingredients: Array<TIngredient>;
	setActiveTab: (key: string | null) => void
}

export type TModal = {
	children: JSX.Element
	title?: string;
	onCloseAction: () => void; 
}

export type TProtectedRoute = {
	onlyForAuth: boolean;	
}

export type TLocation = {
	background?: Location;
	from?: any;
}

export type TRequest = {
	url?:string | RequestInfo | URL;
	method?:string;
	body?:string | null;
	headers?: any;
	additional?:any;
}

export enum WebsocketStatus {
    CONNECTING = 'CONNECTING...',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}

export type TwsActionTypes = {
	connection: ActionCreatorWithPayload<any>;
	disconnection: ActionCreatorWithoutPayload;
	onOpen: ActionCreatorWithoutPayload;
	onClose: ActionCreatorWithoutPayload;
	onError: ActionCreatorWithPayload<string>;
	onMessage: ActionCreatorWithPayload<any>;
};


export type TOrder = {
	_id: string;
	number: number;
	name: string;
	ingredients: Array<string>;
	status: string;
	createdAt: string;
}


export type TUserEmail = {
	email: string;
}

export type TUserToken = {
	token: string;
}

export type TUserLogin = {
	email: string;
    password: string
}

export type TUserReg = TUserLogin & {
	name: string;
}

export type TUserResetPassword = {
	password: string;
	token: string;
}


export type TThunkAPI = { 
    rejectValue: {
        message: string
    } 
}

export type TSuccessLogin = {
    accessToken: string;
    refreshToken: string;
    success: boolean;
    user: {        
        email: string;
        name: string;
    }
}

export type TSuccessReset = {
    success: boolean;
    message: string;
}

export type TSuccessIngredients = {	
    success: boolean;
	data: Array<any>
}
