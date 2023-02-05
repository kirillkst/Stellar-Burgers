import { Link, useHistory } from 'react-router-dom';

import { registerRequest } from "../../store/userSlice";
import useForm from "../../hooks/useForm";
import { saveToken } from '../../services/token';

import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import formStyles from '../../styles/form.module.scss';
import { PROCESS_STATE } from "../../utils/constants";
import { useDispatch, useSelector } from '../../store';
import { TUserReg } from '../../utils/types';


const RegisterPage = () => {    
    const dispatch = useDispatch();	
    const process = useSelector<typeof PROCESS_STATE[keyof typeof PROCESS_STATE]>(store => store.user.process);
    const history = useHistory(); 
    const form = useForm({ name: '', email: '', password: '' });
    const isError = process === PROCESS_STATE.ERROR;
    const isLoading = process === PROCESS_STATE.LOADING;

    const registerHandler = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(registerRequest(form.inputs as TUserReg))
            .unwrap()
            .then(res => {
                saveToken(res);                
                history.push('/');
            } )
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
                    placeholder='Пароль'
                    icon={form.passwordVisible ? 'HideIcon' : 'ShowIcon'}
                    value={form.inputs.password}
                    name='password'
                    size='default'
                    onChange={form.onChange}
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
