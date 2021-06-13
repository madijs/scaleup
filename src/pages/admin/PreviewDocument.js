import React, {useEffect, useState} from "react";
import styles from "../../assets/styles/Personal.module.css"
import {ReactComponent as StrategyIcon} from "../../assets/icons/mainIcon1.svg";
import {ReactComponent as FinanceIcon} from "../../assets/icons/mainIcon2.svg";
import {ReactComponent as LegalIcon} from "../../assets/icons/mainIcon3.svg";
import {ReactComponent as MarketingIcon} from "../../assets/icons/mainIcon4.svg";
import {ReactComponent as AddDocIcon} from "../../assets/icons/plusDocs.svg";
import GoBack from "../../components/OtherComponents/GoBack";
import {useParams,useHistory,useLocation} from "react-router-dom";
import DocumentService from "../../services/DocumentService";
import DocumentItem from "../../components/OtherComponents/DocumentItem";
import {useDispatch, useSelector} from "react-redux";
import {
    DOCUMENT_PREVIEW_SUCCESS,
    DOCUMENT_TABLE_ERROR,
    DOCUMENT_TABLE_PENDING,
} from "../../types/documentTypes";
import Modal from "react-modal";
import DocsView from "../../components/FormConponents/DocsView";
import axios from "../../plugins/axios"
import SaveBtn from "../../components/OtherComponents/SaveBtn";
import ErrorPopupModal from "../../components/OtherComponents/ErrorPopupModal";
import ShareDocsModal from "../../components/OtherComponents/ShareDocsModal";
import AdminService from "../../services/AdminService";
import CompanyInfoModal from "../../components/AdminComponents/CompanyInfoModal";
import {returnDateFormat} from "../../tools/returnDateFormat";
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

const PreviewDocument = ({setFolderName,folderName}) => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [modalIsOpen,setOpen3] = useState(false);
    const {docsData,companyData} = useSelector(state => state.DocumentPage);
    console.log(companyData)
    console.log(docsData);
    const {userData} = useSelector(state => state.AuthPage);

    const [isOpen,setOpen] = useState(false);
    const [shareOpen,setShareOpen] = useState(false);
    const [document,setDocument] = useState(null);



    const [pathLink,setPathLink] = useState('');
    const [userInfo,setUserInfo] = useState(null);


    const [isOpenAddModal,setOpenFileModal] = useState(false);


    const openAddFileModal = () => {
        setOpenFileModal(true);
    };

    const closeAddFileModal = () => {
        setOpenFileModal(false);
    };

    const handleClick = (key) => {
        openAddFileModal();
        // console.log(key);
        setPathLink(key);
        // hiddenFileInput.current.click()
    };


    const handleOpen = () => {
        setOpen3(true)
    };

    const closeModal = () => {
        setOpen3(false);
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
        }
        if (location.pathname.includes('/finish-document') || location.pathname.includes('/success-document')){
            const response = new AdminService().getUserInfo(id);
            response.then(res=>{
                setUserInfo(res.data)
            })
        }
        if (location.pathname.includes('/admin/settings')){
            const response = new DocumentService().getTemplates();
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
        }
    },[]);


    const setDocs = (data) => {
        dispatch({
            type: DOCUMENT_PREVIEW_SUCCESS,
            payload: data
        })
    };

    const [isOpen2,setOpen2] = useState(false);
    const [message,setMessage] = useState({});

    const sendOrSave = () => {
        axios.post(`/documents/${localStorage.getItem('doc_id')}`).then(res=>{
            setMessage({
                type: "success",
                title: "Успешно",
                text: "Документы успешно отправлены клиенту!"
            });
            setOpen2(true)
        }).catch(err=>{
            setMessage({
                type: "error",
                title: "Ошибка",
                text: err.response.data.message
            });
            setOpen2(true)
        })
    };

    return(
        <>
            {userInfo && (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <CompanyInfoModal
                        companyName={userInfo.company}
                        address={null}
                        branch={null}
                        fio={userInfo.fio}
                        phone={userInfo.phone}
                        email={userInfo.email}
                        tarif={userInfo.payment.service.name}
                        registration_date={returnDateFormat(userInfo.payment.created_at)}
                        status={userInfo.payment.payment_status_id}
                        payment_type={userInfo.payment.payment_type_id}
                        closeModal={closeModal}
                    />
                </Modal>
            )}
            <Modal
                isOpen={isOpen}
                onRequestClose={()=>setOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <DocsView document={document} />
            </Modal>
            <Modal
                isOpen={isOpenAddModal}
                onRequestClose={closeAddFileModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <AddModalFile id={id} pathLink={pathLink} closeAddFileModal={closeAddFileModal}/>
            </Modal>
            <Modal  isOpen={isOpen2}
                    onRequestClose={()=>setOpen2(false)}
                    style={customStyles}
                    contentLabel="Example Modal">
                <ErrorPopupModal closePopupHandleChange={()=>setOpen2(false)} data={message}/>
            </Modal>
            <Modal
                isOpen={shareOpen}
                onRequestClose={()=>setShareOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <ShareDocsModal closePopupHandleChange={()=>setShareOpen(false)} userData={userData}/>
            </Modal>
            {/*<div className={styles.right_section}>*/}
            {/*    <div>Job Description.docx</div>*/}
            {/*    <div>1324 kb</div>*/}
            {/*    <div className={styles.download_btn}>Скачать документ</div>*/}
            {/*    <div className={styles.close}>Закрыть</div>*/}
            {/*</div>*/}
        <div className={styles.fake_container}>
            <div className={styles.head}>
                {companyData && (
                    <GoBack
                        unauthorized={true}
                        title={companyData.company}
                    />
                )}
                {(userData && userData.roles[0].name !== 'client' && !location.pathname.includes('/admin/settings')) && (
                    <GoBack
                        title={userInfo && userInfo.company}
                    />
                )}
                {userData && userData.roles[0].name === 'client' && (
                    <GoBack
                        title={"Мои документы"}
                        subtitle={"Ваши документы готовы"}
                    />
                )}
                {(location.pathname.includes('/finish-document') || location.pathname.includes('/success-document'))&& (
                    <>
                        {(userData.roles[0].name === 'moderator'|| userData.roles[0].name === 'admin') ? (
                            <SaveBtn
                                title={"Инфо о компании"}
                                color={"#171717"}
                                backgroundColor={"rgba(143, 146, 161, 0.1)"}
                                save={handleOpen}
                            />
                        ):(
                            <div className={styles.save_btns}>
                            <SaveBtn
                                title={"Готово"}
                                save={sendOrSave}
                            />
                                <SaveBtn
                                    title={"Инфо о компании"}
                                    color={"#171717"}
                                    backgroundColor={"rgba(143, 146, 161, 0.1)"}
                                />
                            </div>
                        )}
                    </>
                )}
                {location.pathname.includes('/my-documents') && userData.roles[0].name === "client" && (
                    <div className={styles.save_btns}>
                        <SaveBtn
                            title={"Поделиться"}
                            backgroundColor="rgba(143, 146, 161, 0.1)"
                            color="#000"
                            save={()=>setShareOpen(true)}
                        />
                        <SaveBtn
                            title={"Скачать все документы"}
                        />
                    </div>
                )}
            </div>
            <div className={styles.fake_wrappers}>
                {(location.pathname.includes('/finish-document/') && (userData && (userData.roles[0].name === "moderator" || userData.roles[0].name === "admin"))) && (
                    <div className={styles.status_block}>
                        <div className={styles.changeStatus_txt}>
                            Чтобы отправить документы клиенту, нажмите на кнопку "Отправить документы"
                        </div>
                        <div onClick={()=>{
                            sendOrSave();
                        }} className={styles.changeStatus_btn}>
                            Отправить документы
                        </div>
                    </div>
                )}
                {docsData && Object.keys(docsData).map((key,index) => (
                    <div key={key} className={styles.four_containers}>
                        <div className={styles.doc_heading}>
                            <div className={styles.svg_leftside}>
                                {/*<div className={styles.pinky}></div>*/}
                                {key === "finance" && (<FinanceIcon/>)}
                                {key === "strategy" && (<StrategyIcon/>)}
                                {key === "marketing" && (<MarketingIcon/>)}
                                {key === "law" && (<LegalIcon/>)}
                            </div>
                            <div className={styles.svg_rightside}>
                                <div className={styles.heading_name}>
                                    {key === "finance" && "Финансовый раздел"}
                                    {key === "strategy" && "Стратегический раздел"}
                                    {key === "marketing" && "Маркетинговый раздел"}
                                    {key === "law" && "Юридический раздел"}
                                </div>
                                <div className={styles.count}>
                                    {docsData[key].count+" файлов"}
                                </div>
                            </div>
                            {userData && userData.roles[0].name !=="client" && (
                                <div onClick={(e)=>handleClick(key)} className={styles.addFileIcon}>
                                    <AddDocIcon/>
                                </div>
                            )}
                        </div>
                        <div className={styles.main_docs}>
                            <DocumentItem folderName={folderName} setFolderName={setFolderName} userData={userData ? userData: null} setDocs={setDocs} setOpen={setOpen} setDocument={setDocument} id={id} location={location} history={history} docsData={docsData} keyName={key}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
};

export default PreviewDocument;