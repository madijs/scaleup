import React, {useState} from "react";
import styles from "../../assets/styles/AddFileModal.module.scss";
import axios from "../../plugins/axios";
import {DOCUMENT_PREVIEW_SUCCESS} from "../../types/documentTypes";
import {useDispatch} from "react-redux";
import {useLocation,useParams} from "react-router-dom";
import trashIcon from "../../assets/icons/trashIcon.svg";
import CircularIndeterminate from "./ProgressCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import Check from "../../assets/icons/check.svg";
import Warning from "../../assets/icons/warning.svg";
import TextField from "@material-ui/core/TextField/TextField";
import SettingsService from "../../services/SettingsService";

const AddModalFile = ({closeAddFileModal,pathLink,id='',folder=true,tarif}) => {
    const [type,setType] = useState(null);
    const [focus,setFocus] = useState('');
    const [folderName,setFolderName] = useState('');

    const location = useLocation();
    const dispatch = useDispatch();
    const hiddenFileInput = React.useRef(null);
    const [file,setFile] = useState(null);
    const [filePending,setFilePending] = useState(false);

    const hiddenFileInput2 = React.useRef(null);

    const handleClick = event => {
        hiddenFileInput2.current.click();
    };
    const handleChange = (event) => {
        setFile(event.target.files[0]);
        console.log(event.target.files[0]);
    };

    const upload = () => {
        const formData = new FormData();
        formData.append('link',pathLink);
        formData.append('file',file);
        if (location.pathname.includes("/admin/settings")){
            setFilePending(true);
            let a = '';
            if (tarif === 'startup'){
                a = 1
            }else if (tarif === 'scaleforce'){
                a = 2
            }else if (tarif === 'scaleup'){
                a = 3
            }
            axios.post(`/docs/templates${a}/upload-file`,formData).then(res=>{
                setFilePending(false);
                dispatch({
                    type: DOCUMENT_PREVIEW_SUCCESS,
                    payload: res.data
                });
                closeAddFileModal();
            }).catch(err=>{
                setFilePending(false);
            });
        }else{
            axios.post(`/docs/upload-file/${id}`,formData).then(res=>{
                console.log(res);
                dispatch({
                    type: DOCUMENT_PREVIEW_SUCCESS,
                    payload: res.data
                });
                closeAddFileModal();
            })
        }
    };

    const deleteFile = () => {
        setFile(null);
    };

    return(
        <div className={styles.modal}>
            <div onClick={closeAddFileModal} className={styles.close}>
            </div>
            <div className={styles.title}>Загрузить файл</div>
            <div className={styles.content}>
                {folder && !type && (
                   <>
                       <div className={styles.footer}>
                           <div onClick={()=>setType('folder')} className={styles.add_btn}>Добавить папку</div>
                           <div onClick={()=>setType('file')} className={styles.cancel_btn}>Добавить файл</div>
                       </div>
                   </>
                )}
                {(type === 'file' || !folder) && (
                    <>
                        {!file ? (
                            <div className={styles.file_container}>
                                <div>
                                    <input
                                        type="file"
                                        ref={hiddenFileInput2}
                                        onChange={handleChange}
                                        style={{display: 'none'}}/>
                                    <div className={styles.file_select}>
                                        <span onClick={handleClick}>Выберите файл </span>

                                    </div>
                                    <div className={styles.subtitle}>Файлы не должны превышать 10 мб</div>
                                </div>
                            </div>
                        ):(
                            <>
                                {!filePending ? (
                                    <div>
                                        <div className={styles.file}>
                                            <div className={styles.file_name}>
                                                {file.name}
                                            </div>
                                            <div onClick={deleteFile}
                                                 style={{display: "flex", alignItems: 'center', marginLeft: 10}}>
                                                <img style={{color: 'red'}} src={trashIcon} alt="trash"/>
                                            </div>
                                        </div>
                                        <div className={styles.btns}>
                                            <div onClick={upload} className={styles.accessBtn}>Загрузить</div>
                                            <div style={{flex:'0.2'}}></div>
                                            <div onClick={closeAddFileModal} className={styles.cancelBtn}>Отмена</div>
                                        </div>
                                    </div>
                                ):(
                                    <div>
                                        <CircularIndeterminate/>
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
                {type === 'folder' && (
                    <>
                        <TextField
                            className={focus === 'folderName' || folderName ? `${styles.textField} on` : `${styles.textField} off`}
                            id="outlined-basic"
                            label="Название папки"
                            name="folderName"
                            variant="outlined"
                            onFocus={()=>setFocus('folderName')}
                            onChange={(e)=>setFolderName(e.target.value)}
                        />
                        <div className={styles.btns}>
                            <div onClick={()=>{
                                if (location.pathname.includes('/finish-document')){
                                    const response = new SettingsService().createFolderInProd(folderName,pathLink,id);
                                    response.then(res=>{
                                        closeAddFileModal();
                                        dispatch({
                                            type: DOCUMENT_PREVIEW_SUCCESS,
                                            payload: res.data
                                        });
                                        console.log(res);
                                    })
                                }else{
                                    let a = '';
                                    if (tarif === 'startup'){
                                        a = 1
                                    }else if (tarif === 'scaleforce'){
                                        a = 2
                                    }else if (tarif === 'scaleup'){
                                        a = 3
                                    }
                                    const response = new SettingsService().createFolder(folderName,pathLink,id,a);
                                    response.then(res=>{
                                        closeAddFileModal();
                                        dispatch({
                                            type: DOCUMENT_PREVIEW_SUCCESS,
                                            payload: res.data
                                        });
                                        console.log(res);
                                    })
                                }
                            }} className={styles.accessBtn}>Сохранить</div>
                            <div onClick={()=>setType(null)} className={styles.cancelBtn}>Отмена</div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
};

export default AddModalFile;