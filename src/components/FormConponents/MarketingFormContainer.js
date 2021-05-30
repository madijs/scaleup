import React from "react";
import styles from "../../assets/styles/FormStyles/ApplicationFormPage.module.scss";
import MarketingForm from "./MarketingForm";


const MarketingFormContainer = () => {
    return(
        <div className={styles.applicationFormContainer}>
            <MarketingForm/>
        </div>
        )
};
export default MarketingFormContainer;