import React from "react";
import styles from "../../assets/styles/MainStyles/AfterPaymentMainPage.module.scss";
import { useHistory } from "react-router-dom";
import ProgressLine from "../FormConponents/ProgressLine";
import AnketaService from "../../services/AnketaService";

const MainItem = ({icon,title,subtitle,id,description,link,sectionTitle,forms_count,answers_count,status}) => {
    const history = useHistory();

    const redirect = () => {
        if (id===1){
            history.push('/form/strategy')
        }
        else if (id===2){
            history.push('/form/financial')
        }
        else if (id===3){
            history.push('/form/legal')
        }else{
            history.push('/form/marketing')
        }
        const response = new AnketaService().worksheetsAPI(sectionTitle);
        response.then(res=>{
            console.log(res);
        })
    };

    const statusStyle = (status) => {
        console.log(status.toLowerCase());
        switch (status.toLowerCase()) {
            case "готов":
                return(
                    <div className={styles.status1}>
                        <div className={`${styles.circle} ${styles.saved}`}>
                        </div>
                        <div>
                            Сохранено
                        </div>
                    </div>
                );
            case "требуется исправление":
                return (
                    <div className={styles.status1}>
                        <div className={`${styles.circle} ${styles.in_work}`}>
                        </div>
                        <div className={`${styles.error}`}>
                            Требуется исправление
                        </div>
                    </div>
                );
            case "проверяю":
                return (
                    <div className={styles.status1}>
                        <div className={`${styles.circle} ${styles.in_work}`}>
                        </div>
                        <div>
                            В работе
                        </div>
                    </div>
                );
            case "к проверке":
                return (
                    <div className={styles.status1}>
                        <div className={`${styles.circle} ${styles.empty}`}>
                        </div>
                        <div>
                            Пустая
                        </div>
                    </div>
                );
            default:
                return status
        }
    };

    return(
        <div className={styles.main_block}>
            <div className={styles.main_block_2}>
            <div className={styles.block_title}>
                <div className={styles.block_title_icon}>
                    <img src={icon} alt=""/>
                </div>
                <div className={styles.block_title_text}>
                    <div className={styles.block_title_text_title}>
                        {title}
                    </div>
                    <div className={styles.block_title_text_description}>
                        {subtitle} {status && statusStyle(status)}
                    </div>
                </div>
            </div>
            <div className={styles.progressText}>
                Заполнено {Math.ceil(answers_count*100/forms_count)}%
            </div>
           <ProgressLine completed={Math.ceil(answers_count*100/forms_count)}/>
            <div className={styles.block_description}>
                {description}
            </div>
            <div className={styles.block_video}>
                <iframe className={styles.iframe} width="492" height="240"
                        src={link}>
                </iframe>
            </div>
            <div onClick={redirect} className={styles.block_btn}>
                Заполнить анкету
            </div>
            </div>
        </div>
    )
};

export default MainItem;