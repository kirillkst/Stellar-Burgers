import styles from './spinner.module.scss';

const Spinner = () => {
    return (
        <div className={styles.body}>
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
    );
}

export default Spinner;
