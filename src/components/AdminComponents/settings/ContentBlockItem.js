import React from "react";
import styles from "../../../assets/styles/AdminStyles/AdminSettingsContentBlock.module.scss";
import {useHistory} from "react-router-dom";

const ContentBlockItem = ({title,description,path}) => {
    const history = useHistory();


    return(
        <div className={styles.item}>
            <div className={styles.item_title}>
                {title}
            </div>
            <div className={styles.item_description}>
                {description}
            </div>
            <div  onClick={()=>history.push(path)}  className={styles.btn}>
                Перейти
            </div>
        </div>
    )
};
export default ContentBlockItem