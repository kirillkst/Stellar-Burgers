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
