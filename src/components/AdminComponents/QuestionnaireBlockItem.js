import React from "react";
import styles from "../../assets/styles/AdminStyles/QuestionnaireBlockItem.module.scss"
import ProgressLine from "../FormConponents/ProgressLine";
import AnketaService from "../../services/AnketaService";
import { useHistory } from "react-router-dom";
import {useSelector} from "react-redux";

const QuestionnaireBlockItem = ({user_id,id,icon,count,status,percent,name}) => {
    const history = useHistory();
    const {currentItemData} = useSelector(state => state.QuestionnairePage);
    console.log(currentItemData);

    const statusStyle = (status) => {
        console.log(status.toLowerCase());
        switch (status.toLowerCase()) {
            case "готов":
                return(
                    <div className={styles.status1}>
                        <div className={`${styles.circle} ${styles.saved}`}>
                        </div>
                        <div>
                            Готово
                        </div>
                    </div>
                );
            case "требуется исправление":
                return (
                    <div className={styles.status1}>
                        <div className={`${styles.circle} ${styles.in_work}`}>
                        </div>
                        <div>
                            Требуется исправление
                        </div>
                    </div>
                )
            case "проверяю":
                return (
                    <div className={styles.status1}>
                        <div className={`${styles.circle} ${styles.in_work}`}>
                        </div>
                        <div>
                            Проверяю
                        </div>
                    </div>
                )
            case "к проверке":
                return (
                    <div className={styles.status1}>
                        <div className={`${styles.circle} ${styles.empty}`}>
                        </div>
                        <div>
                            К проверке
                        </div>
                    </div>
                )
            default:
                return status
        }
    };


    const redirect = () => {
        localStorage.setItem('prod_id',currentItemData[0].worksheet.id);
         if (id===1){
                history.push(`/admin/questionnaire/strategy/${user_id}`);
                const response = new AnketaService().changeProductionAPI(currentItemData[0].worksheet.id,'strategy');
                response.then(res=>{
                    console.log(res);
                })
            }
            else if (id===2){
                history.push(`/admin/questionnaire/financial/${user_id}`);
                const response = new AnketaService().changeProductionAPI(currentItemData[0].worksheet.id,'financial');
                response.then(res=>{
                    console.log(res);
                })
            }
            else if (id===3){
                history.push(`/admin/questionnaire/legal/${user_id}`);
                const response = new AnketaService().changeProductionAPI(currentItemData[0].worksheet.id,'legal');
                response.then(res=>{
                    console.log(res);
                })
            }else{
                history.push(`/admin/questionnaire/marketing/${user_id}`);
                const response = new AnketaService().changeProductionAPI(currentItemData[0].worksheet.id,'marketing');
                response.then(res=>{
                    console.log(res);
                })
            }
    };

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.icon}>
                    <img src={icon} alt=""/>
                </div>
                <div className={styles.info}>
                    <div className={styles.title}>{name}</div>
                    <div className={styles.subtitle}>
                        <div className={styles.subtitle_title}>{count} вопросов</div>
                        <div className={styles.status}>
                            <div className={styles.circle}></div>
                            <div className={styles.status_text}>{statusStyle(status)}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.progressText}>
                Заполнено {percent}%
            </div>
            <ProgressLine completed={percent}/>
            <div onClick={redirect} className={styles.block_btn}>
                Посмотреть анкету
            </div>
        </div>
    )
};
export default QuestionnaireBlockItem;