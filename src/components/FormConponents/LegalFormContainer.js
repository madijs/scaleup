import React from "react";
import styles from "../../assets/styles/FormStyles/ApplicationFormPage.module.scss";
import LegalSectionForm from "./LegalSectionForm";

const LegalFormContainer = () => {
    return(
        <div className={styles.applicationFormContainer}>
            <LegalSectionForm/>
        </div>
        )
    };

export default LegalFormContainer