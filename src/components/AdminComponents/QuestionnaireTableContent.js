import React from "react";
import styles from "../../assets/styles/AdminStyles/QuestionaireTableContent.module.scss";
import {useHistory} from 'react-router-dom';


const QuestionnaireTableContent = ({data}) => {
    const history = useHistory();

    const statusCheck = (item) => {
        if (item == 1){
            return(
                <td>
                    <div className={styles.status}>
                        <div className={`${styles.circle} ${styles.empty}`}>
                        </div>
                        <div>
                            Пустая
                        </div>
                    </div>
                </td>
            )
        }else if (item == 2){
            return(
                <td>
                    <div className={styles.status}>
                        <div className={`${styles.circle} ${styles.in_work}`}>
                        </div>
                        <div>
                            В работе
                        </div>
                    </div>
                </td>
            )
        }else if (item == 3){
            return (
                <td>
                    <div className={styles.status}>
                        <div className={`${styles.circle} ${styles.saved}`}>
                        </div>
                        <div>
                            Сохранена
                        </div>
                    </div>
                </td>
            )
        }
    };

    const questionnaireStatus = (strategy,financial,legal,marketing,sended) => {
        if (sended == 3){
            return (
                <td className={styles.dontpaid}>
                    <div className={styles.successPaid}>
                        Отправлено
                    </div>
                </td>
            )
        }
        else if (strategy == 1 && financial==1 && legal==1 && marketing ==1){
            return (
                <td className={styles.dontpaid}>
                    <div className={styles.is_empty}>
                        Пустая
                    </div>
                </td>
            )
        }else if (strategy == 3 && financial==3 && legal == 3 && marketing ==3){
            return (
                <td className={styles.dontpaid}>
                    <div className={styles.successPaid}>
                        Заполнено
                    </div>
                </td>
            )
        }else{
            return (
                <td className={styles.dontpaid}>
                    <div className={styles.in_work}>
                        В работе
                    </div>
                </td>
            )
        }
    };

    const redirect = (id) => {
        history.push(`/admin/pre-questionnaire/${id}`);
        localStorage.setItem('user_id',id)
    };

    return(
        <>
            {data.map((el,index)=>(
                <tr key={index} className={styles.content}>
                    <td onClick={redirect.bind(this,el.user.id)} className={styles.companyName}>{el.user.company}</td>

                    {statusCheck(el.strategy)}

                    {statusCheck(el.financial)}

                    {statusCheck(el.legal)}

                    {statusCheck(el.marketing)}

                    {questionnaireStatus(el.strategy,el.financial,el.legal,el.marketing,el.sended)}
                </tr>
            ))}
        </>
    )
};

export default QuestionnaireTableContent;