import React from "react";
import styles from "../../../assets/styles/AdminStyles/AdminSettingsTableContent.module.scss"
import cashFormat from "../../../tools/cashFormat";
import editIcon from "../../../assets/icons/editTableIcon.svg"
import trashIcon from "../../../assets/icons/trashIcon.svg"

const AdminSettingsTableContent = ({data=[],active,setSelectedUserForm,openModal,openDeleteModal,openServiceModal}) => {
    return(
        <>
            {data.map((el,index)=>(
                <>
                    {active === 1 && (
                        <tr key={index}>
                            <td>
                                {el.fio}
                            </td>
                            <td>
                                {el.email}
                            </td>
                            <td>
                                {el.roles[0].name}
                            </td>
                            <td style={{cursor:'pointer'}}>
                                <div className={styles.action}>
                                    <img onClick={()=>{
                                        setSelectedUserForm(el);
                                        openModal()
                                    }} src={editIcon} alt="edit"/>
                                    <img onClick={()=>{
                                        setSelectedUserForm(el);
                                        openDeleteModal()
                                    }} src={trashIcon} alt=""/>
                                </div>
                            </td>
                        </tr>
                    )}
                    {active === 2 && (
                        <tr key={index}>
                            <td>
                                {el.name}
                            </td>
                            <td>
                                {cashFormat(el.price)}
                            </td>
                            <td>
                                {el.work}
                            </td>
                            <td
                                onClick={()=>{
                                setSelectedUserForm(el);
                                openServiceModal()
                            }}
                                style={{cursor:'pointer'}}>
                                <img src={editIcon} alt="edit"/>
                            </td>
                        </tr>
                    )}
                    {active === 5 && (
                        <tr key={index}>
                            <td>{el.fio}</td>
                            <td>{el.company}</td>
                            <td>{el.email}</td>
                            <td>{el.phone}</td>
                            <td onClick={()=>{
                                setSelectedUserForm(el);
                                openModal('client');
                            }} style={{cursor:'pointer'}}>
                                <img src={editIcon} alt="edit"/>
                            </td>
                        </tr>
                    )}
                </>
            ))}
        </>
    )
};
export default AdminSettingsTableContent;