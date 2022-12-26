import { useState } from 'react';

const useForm = (initialData) => {
    const [inputs, setInput] = useState(initialData);
	const [passwordVisible, setPasswordVisible] = useState(false);

	const onChange = (e) => {
		setInput({ ...inputs, [e.target.name]: e.target.value });
	};

    const onChangePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    return { inputs, onChange, passwordVisible, onChangePasswordVisibility };
};

export default useForm;
