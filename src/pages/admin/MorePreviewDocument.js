import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styles from "../../assets/styles/Personal.module.css";
import GoBack from "../../components/OtherComponents/GoBack";
import MoreDocumentItem from "../../components/OtherComponents/MoreDocumentItem";
import {ReactComponent as WordIcon} from "../../assets/icons/word.svg";
import {ReactComponent as PdfIcon} from "../../assets/icons/pdf.svg";
import {ReactComponent as XlsIcon} from "../../assets/icons/xls.svg";
import {ReactComponent as PptxIcon} from "../../assets/icons/pptx.svg";
import {ReactComponent as FolderIcon} from "../../assets/icons/folder.svg";
import {useParams} from "react-router-dom";
import axios from "../../plugins/axios";
import {DOCUMENT_PREVIEW_SUCCESS, DOCUMENT_TABLE_SUCCESS} from "../../types/documentTypes";
import SaveBtn from "../../components/OtherComponents/SaveBtn";
import {ReactComponent as TrashIcon} from "../../assets/icons/trashIcon.svg";
import _ from "lodash";
import {useLocation,useHistory} from "react-router-dom";
import DocsView from "../../components/FormConponents/DocsView";
import Modal from "react-modal";
import ThirdLevelDocItem from "../../components/OtherComponents/ThirdLevelDocItem";
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


const MorePreviewDocument = () => {
    const [isOpen,setOpen] = useState(false);
    const [document,setDocument] = useState(null);
    const {userData} = useSelector(state => state.AuthPage);
    const {docsData} = useSelector(state => state.DocumentPage);
    const {id,name,name2} = useParams();
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const [isOpenAddModal,setOpenFileModal] = useState(false);
    const openAddFileModal = () => {
        setOpenFileModal(true);
    };
    const closeAddFileModal = () => {
        setOpenFileModal(false);
    };


    const hiddenFileInput = React.useRef(null);

    const handleClick = (key) => {
        openAddFileModal();

        // hiddenFileInput.current.click()
    };

    const handleChange = (event) => {
        const formData = new FormData();
        formData.append('link',name.split("&")[0]+'/'+name.split("&")[1]+'/'+name2);
        formData.append('file',event.target.files[0]);
        axios.post(`/docs/upload-file/${id}`,formData).then(res=>{
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

    return(
        <>
            <Modal
                isOpen={isOpenAddModal}
                onRequestClose={closeAddFileModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <AddModalFile id={id} pathLink={name.split("&")[0]+'/'+name.split("&")[1]+'/'+name2} closeAddFileModal={closeAddFileModal}/>
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
                    title={"Мои документы"}
                    subtitle={"Предпросмотр"}
                />
                {!location.pathname.includes('/shared') && (
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
                       <ThirdLevelDocItem
                           userData={userData}
                           id={id}
                           setDocs={setDocs}
                           setOpen={setOpen}
                           setDocument={setDocument}
                           history={history}
                           location={location}
                           docsData={docsData}
                           name={name}
                           name2={name2}
                       />
                    </div>
                )}
            </div>
        </div>
            </>
    )
};

export default MorePreviewDocument;