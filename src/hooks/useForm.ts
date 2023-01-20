import { useState } from 'react';

const useForm = (initialData: {[name: string]: string}) => {
	const [inputs, setInput] = useState(initialData);
	const [passwordVisible, setPasswordVisible] = useState(false);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput({ ...inputs, [e.target.name]: e.target.value });
	};

	const changePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible);
	};

	return { inputs, onChange, setInput, passwordVisible, changePasswordVisibility };
};

export default useForm;
