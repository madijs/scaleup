import React from "react";
import styles from '../../../assets/styles/AdminStyles/AdminTableTitle.module.scss'

const AdminSettingsTableTitle = ({data=[]}) => {
    return(
        <tr className={styles.container}>
            {data.map((el,index)=>(
                <th>{el}</th>
            ))}
            <th>
            </th>
        </tr>
    )
};
export default AdminSettingsTableTitle;