import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import useForm from "../../hooks/useForm";
import { registerRequest } from "../../store/userSlice";
import { saveToken } from '../../services/token';
import { PROCESS_STATE } from '../../utils/constants';

import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';


import formStyles from '../../styles/form.module.scss';


const RegisterPage = () => {    
    const dispatch = useDispatch();	
	const auth = useSelector(store => store.user.auth);
	const process = useSelector(store => store.user.process);
    const form = useForm({ name: '', email: '', password: '' });

    const register = (e) => {
        e.preventDefault();
        dispatch(registerRequest(form.inputs))
            .unwrap()
            .then(res => saveToken(res))
            .catch(() => {});
    }
    
    if ( auth )
        return <Redirect to='/' />

    return (
        <div className={formStyles.wrap}>
            <h1 className={formStyles.title}>Регистрация</h1>
            <form className={formStyles.form} onSubmit={register}>
                <Input
					type="text"
					placeholder="Имя"
					value={form.inputs.name}
					name='name'
					size='default'
					onChange={form.onChange}
					extraClass="pb-6"
				/>

				<EmailInput
					placeholder="E-mail"
					value={form.inputs.email}
					name='email'
					size='default'
					onChange={form.onChange}
					extraClass="pb-6"
				/>

                <PasswordInput
                    type={form.passwordVisible ? 'text' : 'password'}
                    placeholder='Пароль'
                    icon={form.passwordVisible ? 'HideIcon' : 'ShowIcon'}
                    value={form.inputs.password}
                    name='password'
                    size='default'
                    onChange={form.onChange}
                    onIconClick={form.changePasswordVisibility}
                    extraClass="pb-6"
                />
				<Button htmlType="submit" type="primary" size="medium" disabled={process === PROCESS_STATE.LOADING}>
                    {process === PROCESS_STATE.LOADING ? 'Регистрация...' : 'Зарегистрироваться'}
                </Button>
                {process === PROCESS_STATE.ERROR && (
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

export default RegisterPage;
