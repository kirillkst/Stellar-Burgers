import { Link } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import useForm from "../../hooks/useForm";

import formStyles from '../../styles/form.module.scss';


const ResetPassword = () => {    
    const form = useForm({ password: '', code: '' });

    return (
        <div className={formStyles.wrap}>
            <h1 className={formStyles.title}>Восстановление пароля</h1>
            <form className={formStyles.form}>
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
					value={form.inputs.code}
					name='code'
					size='default'
					extraClass="pb-6"
				/>
				<Button htmlType="button" type="primary" size="medium">
                    Сохранить
                </Button>
			</form>
            
            <p className="text text_type_main-default text_color_inactive">
                Уже зарегистрированы?
                <Link to="/login" className={formStyles.link}>Войти</Link>
            </p>
        </div>
    );
};


export default ResetPassword;
