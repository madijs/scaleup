import React from "react";
import styles from "../../../assets/styles/AdminStyles/DeleteModal.module.scss";
import SettingsService from "../../../services/SettingsService";
import {getWorkersAction} from "../../../redux/actions/settings/getWorkersAction";
import {useDispatch} from "react-redux";

const DeleteModal = ({id,title,text,closeDeleteModal}) => {
    const dispatch = useDispatch();

    const deleteSystemUser = () => {
        const response = new SettingsService().deleteSystemUserAPI(id);
        response.then(res=>{
            dispatch(getWorkersAction());
            closeDeleteModal();
        })
    };

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.header_content}>
                    <div className={styles.header_content_title}>{title}</div>
                    <div onClick={closeDeleteModal} className={styles.close}></div>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.text}>{text}</div>
            </div>
            <div className={styles.footer}>
                <div onClick={deleteSystemUser} className={styles.add_btn}>Да</div>
                <div onClick={closeDeleteModal} className={styles.cancel_btn}>нет</div>
            </div>
        </div>
        )
    };

export default DeleteModal;