import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ingredientsRequest } from '../../store/ingredientsSlice';

import { renderContent } from '../../utils/burger-utils';

import AppMain from '../../components/app-main/AppMain';

const HomePage = () => {
    const process = useSelector(store => store.ingredients.process);
    const dispatch = useDispatch();	

	useEffect(() => {
        dispatch(ingredientsRequest());      
    }, []);
	
	const content = renderContent(process, AppMain);

    return content;
};


export default HomePage;
