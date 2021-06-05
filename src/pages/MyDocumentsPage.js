import React, {useEffect, useState} from "react";
import PreviewDocument from "./admin/PreviewDocument";
import DocumentService from "../services/DocumentService";
import {DOCUMENT_PREVIEW_SUCCESS, DOCUMENT_TABLE_ERROR} from "../types/documentTypes";
import {useDispatch, useSelector} from "react-redux";
import styles from "../assets/styles/MyDocumentPage.module.scss";
import SupportIcon from "../assets/icons/supportIcon.svg";
import {getMeInfoAction} from "../redux/actions/getMeInfo";
import Faq from "../components/FaqComponents/Faq";




const MyDocumentsPage = () => {
    const dispatch = useDispatch();
    const {userData} = useSelector(state => state.AuthPage);
    const [isDocsEmpty,setDocsEmpty] = useState(null);

    useEffect(()=>{
        document.title = "ScaleUp | Мои документы";
        const response = new DocumentService().getUserFiles(userData.id);
        response.then(res=>{
            setDocsEmpty(false);
            dispatch({
                type: DOCUMENT_PREVIEW_SUCCESS,
                payload: res.data
            })
        }).catch(err=>{
            setDocsEmpty(true);
            dispatch({
                type: DOCUMENT_TABLE_ERROR
            })
        })

    },[]);

    return (
        <>
            {!isDocsEmpty ? (
                <PreviewDocument/>
            ):(
                <div className={styles.container}>
                    <div className={styles.payment_block_title}>
                        <div className={styles.payment_block_body_title}><h2>У вас нет готовых документов</h2></div>
                        <div className={styles.supportIcon}>
                            <img src={SupportIcon} alt="supportIcon"/>
                        </div>
                    </div>
                </div>
            )}
            <div style={{marginTop:'120px'}}>
                <Faq/>
            </div>
        </>
    )
};
export default MyDocumentsPage;