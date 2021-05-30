import React from "react";
import styles from "../../assets/styles/FormStyles/ApplicationFormPage.module.scss";
import StrategyForm from "./StrategyForm";


const StrategyFormContainer = () => {
    return(
        <div className={styles.applicationFormContainer}>
            <StrategyForm/>
        </div>
    )
};

export default StrategyFormContainer