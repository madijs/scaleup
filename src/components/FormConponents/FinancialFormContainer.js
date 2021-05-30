import React from "react";
import styles from "../../assets/styles/FormStyles/ApplicationFormPage.module.scss";
import FinancialForm from "./FInancialForm";

const FinancialFormContainer = () => {
    return(
        <div className={styles.applicationFormContainer}>
            <FinancialForm/>
        </div>
    )
};

export default FinancialFormContainer;