import React from "react";
import styles from "../../assets/styles/FormStyles/FormProgress.module.scss";
import Runner from "../../assets/icons/runer.svg";
import ProgressLine from "./ProgressLine";
import {BigPlayButton, Player} from "video-react";

const FormProgress = ({completed}) => {

    return(
        <div className={styles.progressContainer}>
            <div className={styles.progressPadding}>
                <div className={styles.container}>
                    <div className={styles.title}>
                        <h3>Заполнено {completed}%</h3>
                    </div>
                    <div className={styles.progressLine}>
                        <ProgressLine completed={completed}/>
                    </div>
                    <div className={styles.body}>
                        <div className={styles.body_video}>
                            <iframe width="230" height="100"
                                    src={"https://www.youtube.com/embed/XgUbj72GaLA"}>
                            </iframe>
                        </div>
                        <div className={styles.body_description}>
                            Learn from a growing library of 1,982 websites and 3,829 component examples. Easily filterable to find the inspiration you need, quickly.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default FormProgress;