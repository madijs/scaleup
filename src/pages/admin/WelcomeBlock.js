import React, {useEffect, useState} from "react";
import styles from "../../assets/styles/AdminStyles/Welcome.module.scss"
import GoBack from "../../components/OtherComponents/GoBack";
import getMediaUrls from "../../tools/getMediaUrls";
import WelcomeService from "../../services/WelcomeService";
import TextareaAutosize from "@material-ui/core/TextareaAutosize/TextareaAutosize";
import TextField from "@material-ui/core/TextField/TextField";
import trashIcon from "../../assets/icons/trashIcon.svg";
import Modal from "react-modal";
import ErrorPopupModal from "../../components/OtherComponents/ErrorPopupModal";
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
const WelcomeBlock = () => {
    const [info,setInfo] = useState(null);
    const [focusTitle,setFocusTitle] = useState('');
    const [focusDescription,setFocusDescription] = useState('');
    const [focus,setFocus] = useState('');
    const [link,setLink] = useState('');
    const [isChanged,setChanged] = useState(false);
    const [img,setImg] = useState('');
    const [popUpData,setPopUpData] = useState({
        status:'',
        data:''
    });

    const hiddenFileInput = React.useRef(null);


    useEffect(()=>{
        const response = new WelcomeService().getBlockData();
        response.then(res=>{
            setInfo(res.data);
            setLink(res.data.link)
            console.log(res.data);
        })
    },[]);

    const handleGreetingChange = value => {
        const copy = {...info};
        copy.greeting = value;
        setInfo(copy);
    };

    const handleDescriptionChange = value => {
        const copy = {...info};
        copy.description = value;
        setInfo(copy);
    };

    const deleteImg = () => {
        const copy = {...info};
        copy.image = null;
        setInfo(copy);
    };

    const selectFile = () => {
        hiddenFileInput.current.click();
    };

    const handleChange = event => {
        setImg(event.target.files[0]);
    };

    const deleteImgLocal = () => {
        setImg('');
    };

    const openPopUp = (data) => {
        setPopUpData({
            status: true,
            data: data
        })
    };

    const closePopUp = () => {
        setPopUpData({
            status: false,
            data: null
        })
    };

    const update = () => {
        const formData = new FormData();
        if (img){
            formData.append('image',img);
            formData.append('changed',1);
        }else{
            // formData.append('image',getMediaUrls(info.image));
            formData.append('changed',0);
        }
        formData.append('greeting', info.greeting);
        formData.append('description', info.description);
        formData.append('link',link);
        const response = new WelcomeService().updateBlockData(formData);
        response.then(res=>{
            console.log(res);
            openPopUp({
                type: "success",
                title: "Отлично",
                text:"Ваши данные успешно сохранены",
            })
        }).catch(err=>{
            openPopUp({
                type: "error",
                title: "Упс",
                text: "Произошлка ошибка!"
            })
        });
    };

    return(
        <>
            <Modal
                isOpen={popUpData.status}
                onRequestClose={closePopUp}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <ErrorPopupModal data={popUpData.data} closePopupHandleChange={closePopUp}/>
            </Modal>
        <div className={styles.container}>
            <div className={styles.welcome_container}>
                <div className={styles.head}>
                    <GoBack title={"Приветственный блок"}/>
                    <div onClick={update} className={styles.savebtn}>
                        Сохранить
                    </div>
                </div>
                <div className={styles.welcome_block}>
                    <div className={styles.advert}>
                        {info && (
                            <>
                                <div className={styles.block_1}>
                                    {info.image ? (
                                        <img
                                            src={getMediaUrls(info.image)}
                                            alt="advert"/>
                                    ):( img ? (
                                        <img
                                            src={URL.createObjectURL(img)}
                                            alt="advert"/>
                                    ):(
                                        <div className={styles.file_container}>
                                            <div>
                                                <input
                                                    accept="image/*"
                                                    ref={hiddenFileInput}
                                                    type="file"
                                                    onChange={handleChange}
                                                    style={{display: 'none'}}
                                                />
                                                <div className={styles.file_select}><span onClick={selectFile}>Выберите файл</span> или перетащите его сюда</div>
                                                <div className={styles.subtitle}>Файлы не должны превышать 10 мб</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {info && info.image ? (
                                    <div onClick={deleteImg} className={styles.trash}>
                                        <img src={trashIcon} alt="trash"/>
                                    </div>
                                ):(img && (
                                    <div onClick={deleteImgLocal} className={styles.trash}>
                                        <img src={trashIcon} alt="trash"/>
                                    </div>
                                ))}
                                <div className={styles.block_2}>
                                    <div className={styles.block_title}>
                                        <TextareaAutosize
                                            rowsMax={2}
                                            value={info.greeting}
                                            className={focusTitle ? `${styles.focus} ${styles.title}` : `${styles.title}`}
                                            onFocus={()=>{
                                                setFocusTitle(true)
                                            }}
                                            onChange={(e)=>{
                                                handleGreetingChange(e.target.value);
                                            }}
                                            onBlur={()=>{
                                                setFocusTitle(false)
                                            }}
                                            id="standard-basic"/>
                                    </div>

                                    <div className={styles.block_description}>
                                        <TextareaAutosize
                                            rowsMax={4}
                                            value={info.description}
                                            className={focusDescription ? `${styles.focus} ${styles.title}` : `${styles.title}`}
                                            onFocus={()=>{
                                                setFocusDescription(true)
                                            }}
                                            onChange={(e)=>{
                                                handleDescriptionChange(e.target.value);
                                            }}
                                            onBlur={()=>{
                                                setFocusDescription(false)
                                            }}
                                            id="standard-basic"/>
                                    </div>
                                    <div className={styles.block_btnContainer}>
                                        <TextField
                                            className={focus==='link' || link ? `${styles.textField} on` : `${styles.textField} off`}
                                            name="link"
                                            type="link"
                                            onFocus={()=>{
                                                setFocus('link');
                                                setChanged(true)
                                            }}
                                            onBlur={()=>{
                                                setFocus('');
                                            }}
                                            id="outlined-basic"
                                            label="Ссылка на сайт"
                                            variant="outlined"
                                            value={link}
                                            onChange={(e)=>{
                                                setLink(e.target.value)
                                            }}
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
};

export default WelcomeBlock