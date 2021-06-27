import React from "react";
import PreviewDocument from "../../../pages/admin/PreviewDocument";
import styles from "../../../assets/styles/AdminStyles/AdminSettingsContentBlock.module.scss"
import {useHistory} from "react-router-dom";

const AdminSettingsTemplate = () => {
    const history = useHistory();

    const gotoTarif = (tarif) => {
        history.push(`/admin/settings/templates/${tarif}`)
    };

    return(
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.item}>
                    <div className={styles.item_title}>
                        Тариф: StartUp
                    </div>
                    <div onClick={()=>gotoTarif('startup')} className={styles.btn2}>Перейти</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.item_title}>Тариф: ScaleFORCE</div>
                    <div onClick={()=>gotoTarif('scaleforce')} className={styles.btn2}>Перейти</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.item_title}>Тариф: ScaleUp</div>
                    <div onClick={()=>gotoTarif('scaleup')} className={styles.btn2}>Перейти</div>
                </div>
            </div>
        </div>
    )
};

export default AdminSettingsTemplate;