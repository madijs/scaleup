import React, {useEffect, useState} from "react";
import styles from "../../assets/styles/Personal.module.css"
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import GoBack from "../../components/OtherComponents/GoBack";
import MoreDocumentItem from "../../components/OtherComponents/MoreDocumentItem";
import {useLocation,useHistory} from "react-router-dom";
import Modal from "react-modal";
import DocsView from "../../components/FormConponents/DocsView";
import SaveBtn from "../../components/OtherComponents/SaveBtn";
import {
    DOCUMENT_PREVIEW_SUCCESS,
    DOCUMENT_TABLE_ERROR,
    DOCUMENT_TABLE_PENDING,
    DOCUMENT_TABLE_SUCCESS
} from "../../types/documentTypes";
import axios from "../../plugins/axios";
import DocumentService from "../../services/DocumentService";
import AddModalFile from "../../components/FormConponents/AddFileModal";


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

const PreviewDocumentDetail = ({folderName,setFolderName}) => {
    const {userData} = useSelector(state => state.AuthPage);
    const search = new URLSearchParams(useLocation().search);
    const token = search.get('token');
    const [isOpenAddModal,setOpenFileModal] = useState(false);
    const openAddFileModal = () => {
        setOpenFileModal(true);
    };
    const closeAddFileModal = () => {
        setOpenFileModal(false);
    };

    const {id} = useParams();
    const dispatch = useDispatch();
    const [document,setDocument] = useState(null);
    const [isOpen,setOpen] = useState(false);

    const location = useLocation();
    const history = useHistory();
    const {docsData} = useSelector(state => state.DocumentPage);
    const {name} = useParams();
    const hiddenFileInput = React.useRef(null);

    const handleClick = (key) => {
        openAddFileModal();
        // hiddenFileInput.current.click()
    };

    const handleChange = (event) => {
        const formData = new FormData();
        formData.append('link',name.split("&")[0]+'/'+name.split("&")[1]);
        formData.append('file',event.target.files[0]);
        axios.post(`/docs/upload-file/${id}`,formData).then(res=>{
            console.log(res);
            dispatch({
                type: DOCUMENT_PREVIEW_SUCCESS,
                payload: res.data
            })

        })
    };

    const setDocs = (data) => {
        dispatch({
            type: DOCUMENT_PREVIEW_SUCCESS,
            payload: data
        })
    };

    useEffect(()=>{
        dispatch({
            type: DOCUMENT_TABLE_PENDING
        });
        if (userData && userData.roles[0].name !=='client'){
            const response = new DocumentService().getUserFiles(id);
            response.then(res=>{
                dispatch({
                    type: DOCUMENT_PREVIEW_SUCCESS,
                    payload: res.data
                })
            }).catch(err=>{
                dispatch({
                    type: DOCUMENT_TABLE_ERROR
                })
            })
        }else{
            if (userData){
                const response = new DocumentService().getUserFiles(userData.id);
                response.then(res=>{
                    dispatch({
                        type: DOCUMENT_PREVIEW_SUCCESS,
                        payload: res.data
                    })
                }).catch(err=>{
                    dispatch({
                        type: DOCUMENT_TABLE_ERROR
                    })
                })
            }else{
                const response = new DocumentService().getUnauthorizedSharedDocs(token);
                response.then(res=>{
                    console.log(res);
                    dispatch({
                        type: DOCUMENT_PREVIEW_SUCCESS,
                        payload: res.data
                    })
                })
            }
        }
    },[]);


    return(
        <>
            <Modal
                isOpen={isOpenAddModal}
                onRequestClose={closeAddFileModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <AddModalFile id={id} pathLink={name.split("&")[0]+'/'+name.split("&")[1]} closeAddFileModal={closeAddFileModal}/>
            </Modal>
            <Modal
                isOpen={isOpen}
                onRequestClose={()=>setOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <DocsView document={document} />
            </Modal>
        <div className={styles.fake_container}>
            <div className={styles.head}>
                <GoBack
                    title={name ? name.split("&")[1] : "Документы"}
                    subtitle={"Предпросмотр"}
                />
                {!location.pathname.includes('/shared') && userData.roles[0].name!=='client' && (
                    <SaveBtn
                        title={"Добавить файл"}
                        save={handleClick}
                    />
                )}
                <input
                    type="file"
                    accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                    ref={hiddenFileInput}
                    onChange={(e)=>handleChange(e)}
                    style={{display: 'none'}}/>
            </div>
            <div className={styles.fake_wrappers}>
                {docsData && (
                    <div className={styles.inner_dorectory}>
                        <MoreDocumentItem
                            folderName={folderName}
                            setFolderName={setFolderName}
                            id={id}
                            userData={userData}
                            setDocs={setDocs}
                            setOpen={setOpen}
                            setDocument={setDocument}
                            history={history}
                            location={location}
                            docsData={docsData}
                            name={name}/>
                    </div>
                )}
            </div>
        </div>
        </>
    )
};

export default PreviewDocumentDetail;