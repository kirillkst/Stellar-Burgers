import styles from './spinner.module.scss';

const Spinner = () => {
	return (
		<div className={styles.body}>
			<div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
		</div>
	);
};

export default Spinner;
