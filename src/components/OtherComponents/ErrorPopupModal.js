import React from "react";
import styles from "../../assets/styles/ErrorPopupModal.module.scss"
import errorLep from "../../assets/icons/errorLep.svg"
import successLep from "../../assets/icons/success.svg"
import CircularIndeterminate from "../FormConponents/ProgressCircle";


const ErrorPopupModal = ({data, closePopupHandleChange}) => {
    return (
        <>
            {data && (
                <div className={styles.modal}>
                    <div onClick={closePopupHandleChange} className={styles.close}>
                    </div>
                    <div className={styles.modal_content}>
                        {data.type === "error" && (
                            <div className={styles.icon}>
                                <img src={errorLep} alt=""/>
                            </div>
                        )}
                        {data.type === "success" && (
                            <div className={styles.icon}>
                                <img src={successLep} alt=""/>
                            </div>
                        )}
                        {data.type === "pending" && (
                            <CircularIndeterminate/>
                        )}
                        <div className={styles.title}>
                            {data.title}
                        </div>
                        <div className={styles.text}>
                            {data.text}
                        </div>
                        <div onClick={()=>{
                            closePopupHandleChange();
                            if (data.action){
                                data.action();
                            }
                        }} className={styles.close_btn}>
                            Закрыть
                        </div>
                    </div>
                </div>
            )}
        </>
    )
};
export default ErrorPopupModal;