import { useEffect } from 'react';
import { Link, useHistory  } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import useForm from "../../hooks/useForm";

import formStyles from '../../styles/form.module.scss';
import { PROCESS_STATE } from "../../utils/constants";
import { resetPasswordRequest } from "../../store/userSlice";
import { useDispatch, useSelector } from '../../store';
import { TUserResetPassword } from '../../utils/types';


const ResetPassword = () => {    
    const dispatch = useDispatch();	   
    const process = useSelector<typeof PROCESS_STATE[keyof typeof PROCESS_STATE]>(store => store.user.process);
	const passReset = useSelector((store) => store.user.passReset);
    const form = useForm({ password: '', token: '' });
    const history = useHistory(); 
    const isError = process === PROCESS_STATE.ERROR;
    const isLoading = process === PROCESS_STATE.LOADING;

    useEffect(() => {
        if ( ! passReset )
            history.push('/forgot-password'); 
    }, [history, passReset]);   

    const submitHandler = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(resetPasswordRequest(form.inputs as TUserResetPassword))
            .unwrap()
            .then(res => {
                if (res.success) {
                    history.push('/login');    
                } 
            } )
            .catch(() => {});
    }

    return (
        <div className={formStyles.wrap}>
            <h1 className={formStyles.title}>Восстановление пароля</h1>
            <form className={formStyles.form} onSubmit={submitHandler}>
                <Input
                    type={form.passwordVisible ? 'text' : 'password'}
                    placeholder='Введите новый пароль'
                    onChange={form.onChange}
                    icon={form.passwordVisible ? 'HideIcon' : 'ShowIcon'}
                    value={form.inputs.password}
                    name='password'
                    onIconClick={form.changePasswordVisibility}
                    size='default'
                    extraClass="pb-6"
                />
				<Input
					type="text"
					placeholder="Введите код из письма"
                    onChange={form.onChange}
					value={form.inputs.token}
					name='token'
					size='default'
					extraClass="pb-6"
				/>
				<Button htmlType="submit" type="primary" size="medium" disabled={isLoading}>
                    Сохранить
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


export default ResetPassword;
