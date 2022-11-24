import PropTypes from 'prop-types';

import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';

import styles from './app.module.scss'; 


App.propTypes = {
  
};

function App(props) {
  return (
    <div className={styles.wrapper}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
