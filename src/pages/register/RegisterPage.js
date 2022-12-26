import { Link } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import useForm from "../../hooks/useForm";

import formStyles from '../../styles/form.module.scss';


const RegisterPage = () => {    
    const form = useForm({ name: '', email: '', password: '' });

    return (
        <div className={formStyles.wrap}>
            <h1 className={formStyles.title}>Регистрация</h1>
            <form className={formStyles.form}>
                <Input
					type="text"
					placeholder="Имя"
					onChange={form.onChange}
					value={form.inputs.name}
					name='name'
					size='default'
					extraClass="pb-6"
				/>

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
                    value={form.password}
                    name='password'
                    onIconClick={form.onChangePasswordVisibility}
                    size='default'
                    extraClass="pb-6"
                />
				<Button htmlType="button" type="primary" size="medium">
                    Зарегистрироваться
                </Button>
			</form>
            
            <p className="text text_type_main-default text_color_inactive">
                Уже зарегистрированы?
                <Link to="/login" className={formStyles.link}>Войти</Link>
            </p>
        </div>
    );
};

export default RegisterPage;
