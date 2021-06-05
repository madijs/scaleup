import {useHistory} from 'react-router-dom';
import styles from "../../../assets/styles/AdminStyles/QuestionaireTableContent.module.scss";
import React from "react";
import {useSelector} from "react-redux";


const ProductionTableContent = ({data}) => {
    const history = useHistory();
    const {userData} = useSelector(state => state.AuthPage);


    const statusCheck = (item) => {
        if (item == 0){
            return(
                <td>
                    <div className={styles.status}>
                        <div className={`${styles.circle} ${styles.empty}`}>
                        </div>
                        <div>
                            К проверке
                        </div>
                    </div>
                </td>
            )
        }else if (item == 1){
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
        }else if (item == 2){
            return (
                <td>
                    <div className={styles.status}>
                        <div className={`${styles.circle} ${styles.in_work}`}>
                        </div>
                        <div>
                            Требуется исправление
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
                            Готово
                        </div>
                    </div>
                </td>
            )
        }
    };

    const productionStatus = (strategy,financial,legal,marketing) => {
        if (strategy == 0 && financial==0 && legal==0 && marketing ==0){
            return (
                <td className={styles.dontpaid}>
                    <div className={styles.is_empty}>
                        К проверке
                    </div>
                </td>
            )
        }else if (strategy == 3 && financial==3 && legal == 3 && marketing ==3){
            return (
                <td className={styles.dontpaid}>
                    <div className={styles.successPaid}>
                        Готово
                    </div>
                </td>
            )
        }else{
            return (
                <td className={styles.dontpaid}>
                    <div className={styles.in_work}>
                        Проверяю
                    </div>
                </td>
            )
        }
    };

    const redirect = (id) => {
        history.push(`/admin/questionnaire/${id}`);
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

                        <>
                            {productionStatus(el.strategy,el.financial,el.legal,el.marketing)}
                        </>
                </tr>
            ))}
        </>
    )
};
export default ProductionTableContent;