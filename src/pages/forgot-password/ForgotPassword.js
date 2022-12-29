import { Link, useHistory  } from 'react-router-dom';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import useForm from "../../hooks/useForm";
import { useFrogotPasswordMutation } from "../../services/userAPI";

import formStyles from '../../styles/form.module.scss';


const ForgotPassword = () => {    
    const form = useForm({ email: '' });   
    const history = useHistory(); 
    const [reset, { isLoading, isError }] = useFrogotPasswordMutation();

    const submitHandler = (e) => {
        e.preventDefault();
        reset(form.inputs)
            .unwrap()
            .then(res => {
                if (res.success)       
                    history.push('/reset-password');    
            })
    }

    return (
        <div className={formStyles.wrap}>
            <h1 className={formStyles.title}>Восстановление пароля</h1>
            <form className={formStyles.form} onSubmit={submitHandler}>
                <EmailInput
					placeholder="Укажите e-mail"
					value={form.inputs.email}
					name='email'
					size='default'
					onChange={form.onChange}
					extraClass="pb-6"
				/>
				<Button htmlType="submit" type="primary" size="medium" disabled={isLoading}>
                    Восстановить
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


export default ForgotPassword;
