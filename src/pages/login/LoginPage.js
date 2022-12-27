import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import useForm from "../../hooks/useForm";
import { useAuthUserMutation } from "../../services/userAPI";
import { setUser } from "../../store/userSlice";
import { saveToken } from '../../services/token';

import { EmailInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import formStyles from '../../styles/form.module.scss';


const LoginPage = () => {
    const dispatch = useDispatch();	
	const isAuth = useSelector(store => store.user.auth);
    const form = useForm({ email: '', password: '' });
    const [auth, { isLoading, isError }] = useAuthUserMutation();

    const loginHandler = (e) => {
        e.preventDefault();
        auth({ type: 'login', payload: form.inputs })
            .unwrap()
            .then(res => {
                dispatch(setUser(res.user));
                saveToken(res);
            })
    }

    if ( isAuth )
        return <Redirect to='/' />

	return (
		<div className={formStyles.wrap}>
			<h1 className={formStyles.title}>Вход</h1>
			<form className={formStyles.form} onSubmit={loginHandler}>
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
				<Button htmlType="submit" type="primary" size="medium" disabled={isLoading}>
                    {isLoading ? 'Вход...' : 'Войти'}
                </Button>
                {isError && (
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
