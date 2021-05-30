import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {getSelectedAnketaContentAction} from "../../redux/actions/settings/getSelectedAnketaContentAction";
import AdminSettingsTableTitle from "../../components/AdminComponents/settings/AdminSettingsTableTitle";
import styles from "../../assets/styles/AdminStyles/AdminSettingsTable.module.scss";
import ContentTableTitle from "./ContentTableTitle";
import ContentTableQuestions from "./ContentTableQuestions";
import Modal from "react-modal";
import ContentInfoEditModal from "./ContentInfoEditModal";
import ContentFormUpdateModal from "./ContentFormUpdateModal";

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        borderRadius          : '32px',
        padding               : 0
    }
};

const ContentAnketa = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {selected_anketa} = useSelector(state => state.SettingsPage);
    const [isOpen,setOpen] = useState(false);
    const [formOpen,setFormOpen] = useState(false);

    const [tableTitle] = useState(["id",'key','Вопрос','Тип вопроса']);

    const reget = () => {
        dispatch(getSelectedAnketaContentAction(id))
    };

    useEffect(()=>{
        dispatch(getSelectedAnketaContentAction(id))
    },[]);

    const openInfoEditor = () => {
        setOpen(true)
    };

    const closeInfoEditor = () => {
        setOpen(false)
    };

    const openFormEditor = () => {
        setFormOpen(true);
    };

    const closeFormEditor = () => {
        setFormOpen(false)
    };

    const [form,setForm] = useState(null);
    const [type,setType] = useState(null);

    return(
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeInfoEditor}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <ContentInfoEditModal closeInfoEditor={closeInfoEditor} data={selected_anketa}/>
            </Modal>
            <Modal
                isOpen={formOpen}
                onRequestClose={closeFormEditor}
                style={customStyles}
            >
                <ContentFormUpdateModal type={type} reget={reget} setForm={setForm} form={form} close={closeFormEditor}/>
            </Modal>
        <div className={styles.container}>
            {selected_anketa && (
                <div className={styles.title}>
                    <div className={styles.video}>
                        <iframe className={styles.iframe} width="100%" height="100%"
                                src={selected_anketa.link ? selected_anketa.link : ''}>
                        </iframe>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.info}>
                            <div className={styles.name}>
                                {selected_anketa.name}
                            </div>
                            <div className={styles.description}>
                                {selected_anketa.description}
                            </div>
                        </div>
                        <div className={styles.action}>
                            <button onClick={openInfoEditor} className={styles.btn}>
                                Редактировать
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className={styles.table}>
                <div style={{height:'500px',overflowY:'scroll',overflowX:'hidden'}} className={styles.admin_table_title}>
                    <table rules="none">
                        {/*<thead>*/}
                            <ContentTableTitle data={tableTitle}/>
                        {/*</thead>*/}
                        {/*<tbody style={{height:'500px',overflowY:'scroll',overflowX:'hidden'}}>*/}
                            <ContentTableQuestions setType={setType} open={openFormEditor} setForm={setForm} data={selected_anketa}/>
                        {/*</tbody>*/}
                    </table>
                </div>
            </div>
        </div>
        </>
    )
};

export default ContentAnketa