import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { getCookie } from "../../services/cookie";
import useForm from "../../hooks/useForm";
import { setUser } from "../../store/userSlice";
import { useUserUpdateMutation } from "../../services/userAPI";

import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import formStyles from '../../styles/form.module.scss';

import styles from './profile.module.scss';


const Profile = () => {    
    const dispatch = useDispatch();	
	const name = useSelector(store => store.user.name);
	const email = useSelector(store => store.user.email);
    const form = useForm({ name, email, password: '' });
    const [update, { isLoading, isError }] = useUserUpdateMutation();

    const cancel = () => {
        form.setInput({ name, email, password: '' })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        update({ token: getCookie('token'), payload: form.inputs })
            .unwrap()
            .then(res => {
                if (res.success)
                    dispatch(setUser(res.user));
            })
    }

    return (
        <div>
            <form className={formStyles.form} onSubmit={onSubmitHandler}>
                <Input
					type="text"
					placeholder="Имя"
					value={form.inputs.name}
					name='name'
					size='default'
					onChange={form.onChange}
					extraClass="pb-6"
                    icon='EditIcon'
				/>

				<EmailInput
					placeholder="E-mail"
					value={form.inputs.email}
					name='email'
					size='default'
					onChange={form.onChange}
					extraClass="pb-6"
                    icon='EditIcon'
				/>

                <PasswordInput
                    type='password'
                    placeholder='Новый пароль'
                    value={form.inputs.password}
                    name='password'
                    size='default'
                    onChange={form.onChange}
                    icon='EditIcon'
                    extraClass="pb-6"
                />
                <Button htmlType="button" type="secondary" size="medium" onClick={cancel}>
                    Отмена
                </Button>
				<Button htmlType="submit" type="primary" size="medium" disabled={isLoading}>
                    {isLoading ? 'Сохранение...' : 'Сохранить'}
                </Button>
                {isError && (
                    <div className="text text_type_main-default text_color_error mt-5">Ошибка</div>
                )}
			</form>
        </div>
    );
};

export default Profile;
