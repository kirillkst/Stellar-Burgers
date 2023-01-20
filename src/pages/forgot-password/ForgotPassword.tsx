import { Link, useHistory  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import useForm from "../../hooks/useForm";
import { frogotPasswordRequest } from "../../store/userSlice";

import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import formStyles from '../../styles/form.module.scss';
import { PROCESS_STATE } from "../../utils/constants";
import { useAppDispatch, useAppSelector } from "../../store";


const ForgotPassword = () => { 
    const dispatch = useAppDispatch();	   
    const process = useAppSelector<typeof PROCESS_STATE[keyof typeof PROCESS_STATE]>(store => store.user.process);
    const form = useForm({ email: '' });   
    const history = useHistory(); 
    const isError = process === PROCESS_STATE.ERROR;
    const isLoading = process === PROCESS_STATE.LOADING;

    const submitHandler = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(frogotPasswordRequest(form.inputs))
            .unwrap()
            .then(res => {
                if (res.success) {                
                    history.push('/reset-password'); 
                } 
            } )
            .catch(() => {});
    }

    return (
        <div className={formStyles.wrap}>
            <h1 className={formStyles.title}>Восстановление пароля</h1>
            <form className={formStyles.form} onSubmit={submitHandler}>
                <EmailInput
					placeholder="Укажите e-mail"
					value={form.inputs.email}
					name='email'
					size='default'
					onChange={form.onChange}
					extraClass="pb-6"
				/>
				<Button htmlType="submit" type="primary" size="medium" disabled={isLoading}>
                    Восстановить
                </Button>
                {isError && (
                    <div className="text text_type_main-default text_color_error mt-5">Ошибка</div>
                )}
			</form>
            
            <p className="text text_type_main-default text_color_inactive">
                Уже зарегистрированы?
                <Link to="/login" className={formStyles.link}>Войти</Link>
            </p>
        </div>
    );
};


export default ForgotPassword;
