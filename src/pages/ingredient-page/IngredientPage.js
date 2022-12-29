import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

import { ingredientsRequest } from "../../store/ingredientsSlice";

import IngredientDetails from "../../components/ingredient-details/IngredientDetails";
import { renderContent } from "../../utils/burger-utils";


const IngredientPage = () => {    
    const { id } = useParams();
    const process = useSelector(store => store.ingredients.process);
    const dispatch = useDispatch();	

	useEffect(() => {
        dispatch(ingredientsRequest());      
    }, []);
	
	const content = renderContent(process, IngredientDetails, { _id: id });

    return (<>{content}</>);

};

export default IngredientPage;
