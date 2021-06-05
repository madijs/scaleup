import React, {useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import styles from "../assets/styles/FormStyles/ApplicationFormPage.module.scss";
import LegalSectionForm from "../components/FormConponents/LegalSectionForm";
import StrategyForm from "../components/FormConponents/StrategyForm";
import FinancialForm from "../components/FormConponents/FInancialForm";
import MarketingForm from "../components/FormConponents/MarketingForm";

const formTypes = {
    LEGAL_FORM: '/form/legal',
    STRATEGY_FORM:'/form/strategy',
    FINANCIAL_FORM: '/form/financial',
    MARKETING_FORM: '/form/marketing'
};

const ApplicationFormPage = () => {
    const history = useHistory();
    const [currentForm,setCurrentForm] = useState('');

    useEffect(()=>{
        setCurrentForm(history.location.pathname);
    },[]);


    return(
        <div className={styles.applicationFormContainer}>
            {currentForm === formTypes.LEGAL_FORM && (
                <LegalSectionForm/>
            )}
            {currentForm === formTypes.STRATEGY_FORM && (
                <StrategyForm/>
            )}
            {currentForm === formTypes.FINANCIAL_FORM && (
                <FinancialForm/>
            )}
            {currentForm === formTypes.MARKETING_FORM && (
                <MarketingForm/>
            )}
        </div>
    )
};

export default ApplicationFormPage;