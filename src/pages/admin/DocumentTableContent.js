import {useHistory} from 'react-router-dom';
import styles from "../../assets/styles/AdminStyles/QuestionaireTableContent.module.scss";
import React from "react";
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";


const DocumentTableContent = ({data}) => {
    const history = useHistory();
    const {userData} = useSelector(state => state.AuthPage);
    const location = useLocation();




    const statusCheck = (item) => {
        if (item == 0){
            return(
                <td>
                    <div className={styles.status}>
                        <div className={`${styles.circle} ${styles.in_work}`}>
                        </div>
                        <div>
                            Проверяю
                        </div>
                    </div>
                </td>
            )
        }else if (item == 1){
            return(
                <td>
                    <div className={styles.status}>
                        <div className={`${styles.circle} ${styles.saved}`}>
                        </div>
                        <div>
                            Готово
                        </div>
                    </div>
                </td>
            )
        }
    };

    const productionStatus = (status) => {
        if (status == 0){
            return (
                <td className={styles.dontpaid}>
                    <div className={styles.in_work}>
                        Ожидает проверку
                    </div>
                </td>
            )
        }else if (status == 1){
            return (
                <td className={styles.dontpaid}>
                    <div className={styles.successPaid}>
                        Готово
                    </div>
                </td>
            )
        }
    };

    const redirect = (id,doc_id) => {
        if (location.pathname.includes('/admin/documents')){
            history.push(`/success-document/${id}`);
        }else{
            history.push(`/finish-document/${id}`);
            localStorage.setItem('doc_id',doc_id)
        }
    };

    return(
        <>
            {data && data.map((el,index)=>(
                <tr key={index} className={styles.content}>
                    <td onClick={redirect.bind(this,el.user.id,el.id)} className={styles.companyName}>{el.user.company}</td>

                    {(userData.roles[0].name === 'moderator' || userData.roles[0].name === 'admin') ? (
                        <>
                            {statusCheck( (el.strategy =='1' && (el.strategy === el.r_strategy)) ? 1 : 0  )}
                        </>
                    ):(
                        <>
                            {statusCheck(userData.roles[0].name !=="editor" ? el.strategy : el.r_strategy)}
                        </>
                    )}

                    {(userData.roles[0].name === 'moderator' || userData.roles[0].name === 'admin') ? (
                        <>
                            {statusCheck( (el.financial =='1' && (el.financial === el.r_financial)) ? 1 : 0  )}
                        </>
                    ):(
                        <>
                            {statusCheck(userData.roles[0].name !=="editor" ? el.financial :el.r_financial)}                        </>
                    )}

                    {(userData.roles[0].name === 'moderator' || userData.roles[0].name === 'admin') ? (
                        <>
                            {statusCheck( (el.legal == '1' && (el.legal === el.r_legal)) ? 1 : 0  )}
                        </>
                    ):(
                        <>
                        {statusCheck(userData.roles[0].name !=="editor" ? el.legal : el.r_legal)}
                        </>
                    )}
                    {(userData.roles[0].name === 'moderator' || userData.roles[0].name === 'admin') ? (
                        <>
                            {statusCheck( (el.marketing =='1' && (el.marketing === el.r_marketing)) ? 1 : 0  )}
                        </>
                    ):(
                        <>
                            {statusCheck(userData.roles[0].name !=="editor" ? el.marketing : el.r_marketing)}
                        </>
                    )}

                    {productionStatus(el.status)}
                </tr>
            ))}
        </>
    )
};
export default DocumentTableContent;