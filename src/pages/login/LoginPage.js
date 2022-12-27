import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import useForm from "../../hooks/useForm";
import { loginRequest } from "../../store/userSlice";
import { saveToken } from '../../services/token';
import { PROCESS_STATE } from '../../utils/constants';

import { EmailInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import formStyles from '../../styles/form.module.scss';


const LoginPage = () => {
    const dispatch = useDispatch();	
	const process = useSelector(store => store.user.process);
	const auth = useSelector(store => store.user.auth);
    const form = useForm({ email: '', password: '' });

    console.log(auth);

    const login = (e) => {
        e.preventDefault();
        dispatch(loginRequest(form.inputs))
            .unwrap()
            .then(res => saveToken(res))
            .catch(() => {});
    }


    // if ( auth )
    //     return <Redirect to='/' />

	return (
		<div className={formStyles.wrap}>
			<h1 className={formStyles.title}>Вход</h1>
			<form className={formStyles.form} onSubmit={login}>
                <EmailInput
					placeholder="E-mail"
					value={form.inputs.email}
					name='email'
					size='default'
					onChange={form.onChange}
					extraClass="pb-6"
				/>

                <Input
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
                    {process === PROCESS_STATE.LOADING ? 'Вход...' : 'Войти'}
                </Button>
                {process === PROCESS_STATE.ERROR && (
                    <div className="text text_type_main-default text_color_error mt-5">Ошибка</div>
                )}
			</form>
            <p className="text text_type_main-default text_color_inactive">
                Вы — новый пользователь? 
                <Link to="/register" className={formStyles.link}>Зарегистрироваться</Link>
            </p>
            <p className="text text_type_main-default text_color_inactive mt-4">
                Забыли пароль?
                <Link to="/forgot-password" className={formStyles.link}>Восстановить пароль</Link>
            </p>
		</div>
	);
};

export default LoginPage;
