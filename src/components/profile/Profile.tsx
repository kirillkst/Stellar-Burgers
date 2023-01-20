import { useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { getCookie } from "../../services/cookie";
import useForm from "../../hooks/useForm";
import { setUser } from "../../store/userSlice";
import { useUserUpdateMutation, useUserUpdateTokenMutation } from "../../services/userAPI";

import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import formStyles from '../../styles/form.module.scss';

import styles from './profile.module.scss';
import { saveToken } from "../../services/token";
import { useAppDispatch, useAppSelector } from "../../store";


const Profile = () => {    
    const dispatch = useAppDispatch();	
	const name = useAppSelector(store => store.user.name);
	const email = useAppSelector(store => store.user.email);
    const form = useForm({ name, email, password: '' });
    const [update, { isLoading, isError }] = useUserUpdateMutation();
    const token = getCookie('token');
	const refreshToken = getCookie('refreshToken');
    const [userUpdateToken] = useUserUpdateTokenMutation();
    const formRef = useRef<HTMLFormElement | null>(null);

    const cancel = () => {
        form.setInput({ name, email, password: '' })
    }

    const onSubmitHandler = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        update({ token: token, payload: form.inputs })
            .unwrap()
            .then(res => {
                //Обновление в App по тегу из userAPI
            })
            .catch(res => {
                if (res.data.message === 'jwt expired' && refreshToken) {
                    userUpdateToken({ token: refreshToken })
                        .unwrap()
                        .then((res) => {
                            saveToken(res);
                        })
                        .then(() => {
                            formRef.current?.submit();
                        })
                        .catch(() => {});
                }
            });
    }

    return (
        <div className={styles.wrap}>
            <form className={formStyles.form} onSubmit={onSubmitHandler} ref={formRef}>
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
				/>

                <PasswordInput
                    placeholder='Новый пароль'
                    value={form.inputs.password}
                    name='password'
                    size='default'
                    onChange={form.onChange}
                    icon='EditIcon'
                    extraClass="pb-6"
                />
                {(form.inputs.name !== name || form.inputs.email !== email || form.inputs.password !== '') && (
                    <div className={styles.actions}>
                        <Button htmlType="button" type="secondary" size="medium" onClick={cancel}>
                            Отмена
                        </Button>
                        <Button htmlType="submit" type="primary" size="medium" disabled={isLoading}>
                            {isLoading ? 'Сохранение...' : 'Сохранить'}
                        </Button>
                    </div>
                )}
                
                {isError && (
                    <div className="text text_type_main-default text_color_error mt-5">Ошибка</div>
                )}
			</form>
        </div>
    );
};

export default Profile;
