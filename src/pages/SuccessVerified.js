import React, {useEffect} from "react";
import Success from "../assets/icons/success.svg"
import styles from "../assets/styles/SuccessVerified.module.scss"
import {useHistory,useParams,useLocation} from "react-router-dom"
import AuthService from "../services/AuthService";

const SuccessVerified = () => {
    const history = useHistory();
    const {id} = useParams();
    const search = new URLSearchParams(useLocation().search);


    useEffect(()=>{
        const hash = search.get('hash');
        const signature = search.get('signature');
        const expires = search.get('expires');
        const response = new AuthService().accessVerifyRegistration(id,expires,hash,signature);
        response.then(res=>{
        })
    },[]);

    return(
        <div className={styles.container}>
            <img src={Success} alt="success"/>
            <h1>Отлично!</h1>
            <p className={styles.text}>
                Ваш e-mail подтвержден. Пройдите на страницу<span onClick={()=>history.push('/')}>-авторизации</span>
            </p>
        </div>
    )
};
export default SuccessVerified