import { Link } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import useForm from "../../hooks/useForm";

import formStyles from '../../styles/form.module.scss';


const LoginPage = () => {
    const form = useForm({ email: '', password: '' });

	return (
		<div className={formStyles.wrap}>
			<h1 className={formStyles.title}>Вход</h1>
			<form className={formStyles.form}>
				<Input
					type="email"
					placeholder="E-mail"
					onChange={form.onChange}
					value={form.inputs.email}
					name='email'
					size='default'
					extraClass="pb-6"
				/>

                <Input
                    type={form.passwordVisible ? 'text' : 'password'}
                    placeholder='Пароль'
                    onChange={form.onChange}
                    icon={form.passwordVisible ? 'HideIcon' : 'ShowIcon'}
                    value={form.inputs.password}
                    name='password'
                    onIconClick={form.onChangePasswordVisibility}
                    size='default'
                    extraClass="pb-6"
                />
				<Button htmlType="button" type="primary" size="medium">
                    Войти
                </Button>
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
