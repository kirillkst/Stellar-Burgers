import { Link, useHistory  } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import useForm from "../../hooks/useForm";
import { useResetPasswordMutation } from "../../services/userAPI";

import formStyles from '../../styles/form.module.scss';


const ResetPassword = () => {    
	const passReset = useSelector((store) => store.user.passReset);
    const form = useForm({ password: '', token: '' });
    const history = useHistory(); 
    const [reset, { isLoading, isError }] = useResetPasswordMutation();

    if ( ! passReset )
        history.push('/forgot-password'); 

    const submitHandler = (e) => {
        e.preventDefault();
        reset(form.inputs)
            .unwrap()
            .then(res => {
                if (res.success)       
                    history.push('/login');    
            })
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
