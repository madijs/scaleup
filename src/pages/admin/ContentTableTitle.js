import React from "react";
import styles from "../../assets/styles/AdminStyles/Content.module.scss";

const ContentTableTitle = ({data=[]}) => {
    return(
        <tr className={styles.container}>
            {data.map((el,index)=>(
                <th key={index}>{el}</th>
            ))}
            <th>
            </th>
        </tr>
    )
};

export default ContentTableTitle