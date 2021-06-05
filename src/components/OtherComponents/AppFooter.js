import React from "react";
import styles from '../../assets/styles/OtherStyles/AppFooter.module.scss';
import Logo from '../../assets/icons/logoforblack.svg'


const AppFooter = () => {
    return(
        <div className={styles.footer_container}>
            <div className={styles.footer}>
                <div className={styles.logo_container}>
                    <img src={Logo} alt=""/>
                </div>
                <div className={styles.footer_items}>
                    <h3 className={styles.footer_items_title}>ПОЧТА:</h3>
                    <div className={styles.footer_items_value}>hello@scaleup.plus</div>
                </div>
                <div className={styles.footer_items}>
                    <h3 className={styles.footer_items_title}>АДРЕС:</h3>
                    <div className={styles.footer_items_value}>РК, г. Алматы, БЦ "КенДала" Ожидается открытие в РФ, Индии и ОАЭ</div>
                </div>
                <div className={styles.footer_items}>
                    <h3 className={styles.footer_items_title}>ТЕЛЕФОН:</h3>
                    <div className={styles.footer_items_value}>+7 727 339-11-19</div>
                    <div className={styles.footer_items_value}>+7 702 321 66 55</div>
                </div>
            </div>
        </div>
    )
};

export default AppFooter;