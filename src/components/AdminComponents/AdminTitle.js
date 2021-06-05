import React from "react";
import styles from '../../assets/styles/AdminStyles/AdminStyles.module.scss'

const AdminTitle = ({title="",description="",count=""}) => {
    return(
        <div className={styles.container}>
            <div className={styles.head}>
                <div className={styles.title}>{title}</div>
                <div className={styles.description}>
                    {description} <span className={styles.count}>{count}</span>
                </div>
            </div>
        </div>
    )
};
export default AdminTitle;