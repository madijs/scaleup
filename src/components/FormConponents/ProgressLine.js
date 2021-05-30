import React from "react";
import styles from "../../assets/styles/FormStyles/ProgressLine.module.scss";
import Runner from "../../assets/icons/runer.svg";

const ProgressLine = ({completed=0}) => {
    console.log(completed);
    const containerStyles = {
        height: 20,
        width: '100%',
        backgroundColor: "#e0e0de",
        borderRadius: 50,
    };

    const fillerStyles = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: "green",
        borderRadius: 'inherit',
        textAlign: 'right'
    };

    const icon = {
        width: `${completed}%`,
    };

    const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
    };
    return(
        <div style={containerStyles} className={styles.progressContainer}>
            <div style={fillerStyles} className={styles.progressBar}>
                <div className={styles.progressIcon}>
                    <img src={Runner} alt=""/>
                </div>
            </div>

        </div>
    )
};

export default ProgressLine;