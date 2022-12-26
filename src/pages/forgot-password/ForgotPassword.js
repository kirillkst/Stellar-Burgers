import { Link } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import useForm from "../../hooks/useForm";

import formStyles from '../../styles/form.module.scss';


const ForgotPassword = () => {    
    const form = useForm({ email: '' });

    return (
        <div className={formStyles.wrap}>
            <h1 className={formStyles.title}>Восстановление пароля</h1>
            <form className={formStyles.form}>
				<Input
					type="email"
					placeholder="Укажите e-mail"
					onChange={form.onChange}
					value={form.inputs.email}
					name='email'
					size='default'
					extraClass="pb-6"
				/>
				<Button htmlType="button" type="primary" size="medium">
                    Восстановить
                </Button>
			</form>
            
            <p className="text text_type_main-default text_color_inactive">
                Уже зарегистрированы?
                <Link to="/login" className={formStyles.link}>Войти</Link>
            </p>
        </div>
    );
};


export default ForgotPassword;
