import React from "react";
import styles from '../../assets/styles/AdminStyles/AdminTableTitle.module.scss'

const AdminTableTitle = ({data=[]}) => {
    return(
        <tr className={styles.container}>
            {data.map((el,index)=>(
                <th style={(index === data.length-1) ? {textAlign:'center'} : {}}>{el}</th>
            ))}
        </tr>
    )
};
export default AdminTableTitle;