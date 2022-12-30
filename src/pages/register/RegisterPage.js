import { Link, Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useAuthUserMutation } from "../../services/userAPI";
import { setUser } from "../../store/userSlice";
import useForm from "../../hooks/useForm";
import { saveToken } from '../../services/token';

import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import formStyles from '../../styles/form.module.scss';


const RegisterPage = () => {    
    const dispatch = useDispatch();	
    const history = useHistory(); 
    const form = useForm({ name: '', email: '', password: '' });
    const [auth, { isLoading, isError }] = useAuthUserMutation();

    const registerHandler = (e) => {
        e.preventDefault();
        auth({ type: 'register', payload: form.inputs })
            .unwrap()
            .then(res => {
                dispatch(setUser(res.user));
                saveToken(res);                
                history.push('/');  
            })
            .catch(() => {});
    }
    

    return (
        <div className={formStyles.wrap}>
            <h1 className={formStyles.title}>Регистрация</h1>
            <form className={formStyles.form} onSubmit={registerHandler}>
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
				<Button htmlType="submit" type="primary" size="medium" disabled={isLoading}>
                    {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
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

export default RegisterPage;
