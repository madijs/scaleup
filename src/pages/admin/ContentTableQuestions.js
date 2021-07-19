import React from "react";
import styles from "../../assets/styles/AdminStyles/AdminSettingsTableContent.module.scss";
import editIcon from "../../assets/icons/editTableIcon.svg";
import trashIcon from "../../assets/icons/trashIcon.svg";


const ContentTableQuestions = ({data=[],setForm,open,setType}) => {

    const updateQuestion = (question,type) => {
        setType(type);
        setForm(question);
        open();
    };

    return(
        <>
            {data && data.questions && data.questions.map((el,index)=>(
                <>
                    <tr onClick={()=>updateQuestion(el,'title')}>
                        <td style={{border:'1px solid grey',backgroundColor:'#ccc'}} colSpan={2}>{el.description}</td>
                        <td style={{border:'1px solid grey',backgroundColor:'#ccc'}} colSpan={2}>{el.example}</td>
                        <td style={{cursor:'pointer'}}>
                            <div className={styles.action}>
                                <img onClick={()=>{
                                    // setSelectedUserForm(el);
                                    // openModal()
                                }} src={editIcon} alt="edit"/>
                            </div>
                        </td>
                    </tr>
                <>
                    {el.forms.map((e,index2)=>(
                        <tr onClick={()=>updateQuestion(e,'question')} key={e.id}>
                            <td>
                                {e.id}
                            </td>
                            <td>
                                {"${"+e.key+"}"}
                            </td>
                            <td>
                                {e.title}
                            </td>
                            <td>
                                {e.type == '1' && (
                                    <>
                                        input
                                    </>
                                )}
                                {e.type == '2' && (
                                    <>
                                        radio
                                    </>
                                )}
                                {e.type == '3' && (
                                    <>
                                        file
                                    </>
                                )}
                                {e.type == '4' && (
                                    <>
                                        checkbox
                                    </>
                                )}
                            </td>
                            <td style={{cursor:'pointer'}}>
                                <div className={styles.action}>
                                    <img onClick={()=>{
                                        // setSelectedUserForm(el);
                                        // openModal()
                                    }} src={editIcon} alt="edit"/>
                                </div>
                            </td>
                        </tr>
                    ))}
                </>
                    </>
            ))}
        </>
    )
};

export default ContentTableQuestions