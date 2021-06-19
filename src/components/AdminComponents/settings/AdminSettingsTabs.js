import React from "react";
import styles from "../../../assets/styles/AdminStyles/AdminSettingsPage.module.scss"

const AdminSettingsTabs = ({active,setActive,history}) => {

    console.log(active);

    return(
        <div className={styles.tabs_container}>
            <div className={styles.tabs}>
                <div onClick={()=>{
                    setActive(1);
                    history.push('/admin/settings');
                }} className={ active === 1 ? `${styles.tab} ${styles.active}`: `${styles.tab}`}>
                    Системные пользователи
                </div>
                <div onClick={()=>{
                    setActive(2);
                    history.push('/admin/settings/rates');
                }} className={ active === 2 ? `${styles.tab} ${styles.active}`: `${styles.tab}`}>
                    Тарифы
                </div>
                <div onClick={()=>{
                    setActive(3);
                    history.push('/admin/settings/content');
                }} className={ active === 3 ? `${styles.tab} ${styles.active}`: `${styles.tab}`}>
                    Контент
                </div>
                <div onClick={()=>{
                    setActive(4);
                    history.push('/admin/settings/templates');
                }} className={ active === 4 ? `${styles.tab} ${styles.active}`: `${styles.tab}`}>
                    Шаблоны
                </div>
                <div onClick={()=>{
                    setActive(5);
                    history.push('/admin/settings/users');
                }} className={ active === 5 ? `${styles.tab} ${styles.active}`: `${styles.tab}`}>
                    Пользователи
                </div>
                <div
                    onClick={()=>{
                        setActive(6);
                        history.push('/admin/settings/requirement/docs')
                    }} className={ active === 6 ? `${styles.tab} ${styles.active}`: `${styles.tab}`}
                >
                    Документы
                </div>
            </div>
        </div>
    )
};
export default AdminSettingsTabs