import React, {useEffect, useState} from "react";
import styles from '../assets/styles/ProfileStyles/ProfilePage.module.scss'
import EditAva from '../assets/icons/editAva.svg'
import InputAdornment from "@material-ui/core/InputAdornment";
import Check from "../assets/icons/check.svg";
import Warning from "../assets/icons/warning.svg";
import TextField from "@material-ui/core/TextField/TextField";
import '../assets/styles/OtherStyles/TextField.scss';
import {useDispatch, useSelector} from "react-redux";
import {updateUserAction} from "../redux/actions/updateUserAction";
import AuthService from "../services/AuthService";
import Faq from "../components/FaqComponents/Faq";
import ErrorPopupModal from "../components/OtherComponents/ErrorPopupModal";
import Modal from "react-modal";
import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop from 'react-image-crop';
import {getMeInfoAction} from "../redux/actions/getMeInfo";
import getMediaUrls from "../tools/getMediaUrls";
import {useHistory} from "react-router-dom";
import LetterAvatar from "../components/OtherComponents/Avatar";
import {letterAvatarFormat} from "../tools/letterAvatarFormat";
import Avatar from "@material-ui/core/Avatar";


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

const ProfilePage = () => {
    const history = useHistory();
    const [errorPopup,setErrorPopup] = useState({
        status: false,
        data: null
    });
    const openPopupHandleChange = (data) => {
        setErrorPopup({
            status: true,
            data: data
        });
    };

    const closePopupHandleChange = () => {
        setErrorPopup({
            status: false,
            data: null
        });
    };
    const dispatch = useDispatch();
    const {userData} = useSelector(state => state.AuthPage);
    const [img, setImg] = useState(null);
    const [form, setForm] = useState({
        companyName: userData ? userData.company : '',
        fio: userData ? userData.fio : '',
        phoneNumber: userData ? userData.phone : '',
        email: userData ? userData.email : '',
        newPassword: '',
        confirmPassword: ''
    });
    const [focus, setFocus] = useState('');
    const [isChanged, setChanged] = useState({
        companyName: '',
        fio: '',
        phoneNumber: '',
        email: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [isProfileUpdate, setProfileUpdate] = useState(false);
    const [openCropModal,setCropModal] = useState(false);
    const hiddenFileInput = React.useRef(null);

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const handleChange = event => {
        setImg(URL.createObjectURL(event.target.files[0]));
        setCropModal(true)
    };

    const [croppedImg,setCroppedImg] = useState(null);
    const [crop,setCrop] = useState({ aspect : 1});
    const [result,setResult] = useState(userData.avatar);

    console.log(result);

    function getCroppedImg(croppedImg, crop) {
        const canvas = document.createElement('canvas');
        const scaleX = croppedImg.naturalWidth / croppedImg.width;
        const scaleY = croppedImg.naturalHeight / croppedImg.height;
        canvas.width = crop.width ? crop.width : croppedImg.width;
        canvas.height = crop.height ? crop.height : croppedImg.height;
        const ctx = canvas.getContext('2d');

        if (crop.width === 0){
            ctx.drawImage(
                croppedImg,
                0,0
            );
        }else{
            ctx.drawImage(
                croppedImg,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height,
            );
        }
        setCropModal(false);
        setImg(null);
        const base64Image = canvas.toDataURL('image/jpeg');
        const response = new AuthService().saveProfileAvatar({avatar: base64Image});
        response.then(res=>{
            dispatch(getMeInfoAction(localStorage.getItem('token')))
            history.push('/profile')
        })
    }


    const checkUpdates = obj => {
        if (obj.companyName || obj.fio || obj.phoneNumber || obj.email) {
            setProfileUpdate(true)
        }else{
            setProfileUpdate(false)
        }
    };

    const inputHandleChanged = event => {
        const copyForm = {...form};
        copyForm[event.target.name] = event.target.value;

        const copyIsChanged = {...isChanged};

        copyIsChanged.companyName = copyForm.companyName !== userData.company;
        copyIsChanged.fio = copyForm.fio !== userData.fio;
        copyIsChanged.email = copyForm.email !== userData.email;
        if (copyForm.phoneNumber == userData.phone) {
            copyIsChanged.phoneNumber = false;
        } else {
            copyIsChanged.phoneNumber = true
        }
        setChanged(copyIsChanged);
        setForm(copyForm);
        checkUpdates(copyIsChanged)
    };

    const handleUpdateClicked = () => {
        if (isProfileUpdate){
            const response = dispatch(updateUserAction(form.companyName,form.fio,form.email,form.phoneNumber));
            response.then(()=>{
                setProfileUpdate(false);
                openPopupHandleChange({
                    title: "Отлично!",
                    text: "Данные успешно сохранены",
                    type: "success"
                })
            })
        }
    };

    const handleUpdatePassword = () => {
        const response = new AuthService().updatePassword(form.newPassword,form.confirmPassword);
        response.then(res=>{
            console.log(res);
            const copy = {...form};
            copy.newPassword = "";
            copy.confirmPassword = "";
            setForm(copy);
            openPopupHandleChange({
                title: "Отлично!",
                text: "Пароль успешно сохранен",
                type: "success"
            })
        }).catch(err=>{
            console.log(err.response)
        })
    };

    const closeCropModal = () => {
        setCropModal(false);
        setImg(null);
    };

    useEffect(()=>{
        document.title = "ScaleUp | Мой профиль";
        setResult(userData.avatar);
    },[userData.avatar]);

    return (
        <>
            <Modal
                isOpen={errorPopup.status}
                onRequestClose={closePopupHandleChange}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <ErrorPopupModal closePopupHandleChange={closePopupHandleChange} data={errorPopup.data}/>
            </Modal>
            <Modal
                isOpen={openCropModal}
                onRequestClose={closeCropModal}
                style={customStyles}
            >
                    <div className={styles.cropModal}>
                        <ReactCrop style={{width:'100%'}} src={img} onImageLoaded={setCroppedImg} crop={crop} onChange={setCrop}/>
                        <button className={styles.cropSaveBtn} onClick={()=>{
                            getCroppedImg(croppedImg,crop)
                        }}>Сохранить</button>
                    </div>
            </Modal>
        <div className={styles.profilePage_container}>
            <div className={styles.profilePage_title}>
                <div className={styles.profilePage_title_name}>
                    <div className={styles.profilePage_title_name_myProfile}>Мой профиль</div>
                    {userData.roles[0].name === "client" ? (
                        <div className={styles.profilePage_title_name_description}>У вас подписка по типу startUP</div>
                    ):(
                        <div className={styles.profilePage_title_name_description}>{userData.roles[0].name}</div>
                    )}
                </div>
                {userData && userData.roles[0].name === "client" && (
                    <div className={styles.profilePage_changeBtn}>
                        Изменить подписку
                    </div>
                )}
            </div>
            <div className={styles.profilePage}>
                <div className={styles.avatar_container}>
                    <div className={styles.avatarIcon_container}>
                        {result === null ? (
                            <LetterAvatar name={userData.fio}/>
                        ):(
                            <img src={getMediaUrls(result)}/>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            ref={hiddenFileInput}
                            onChange={handleChange}
                            style={{display: 'none'}}/>
                        <div onClick={handleClick} className={styles.avatarIcon_editDiv}>
                            <img src={EditAva} alt="edit"/>
                        </div>
                    </div>
                    <div className={styles.avatar_description}>
                        Поддерживаемые форматы изображений — JPG, JPEG и PNG. Рекомендуемый размер фото профиля —
                        400×400 px
                    </div>
                </div>
                <div className={styles.profilePage_formContainer}>
                    <div className={styles.form}>
                        <div className={styles.formTitle}>
                            Основная информация
                        </div>
                        <div className={styles.formFields}>
                            <TextField
                                className={focus === 'companyName' || form.companyName ? `${styles.textField} on` : `${styles.textField} off`}
                                id="outlined-basic"
                                label="Наименование компании"
                                name="companyName"
                                variant="outlined"
                                onFocus={() => {
                                    setFocus('companyName');
                                    const copy = {...isChanged};
                                    copy.companyName = true;
                                    setChanged(copy)
                                }}
                                onBlur={() => {
                                    setFocus('')
                                }}
                                value={form.companyName}
                                onChange={inputHandleChanged.bind(this)}

                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {form.companyName ? (
                                                <img src={Check} alt=""/>
                                            ) : (isChanged.companyName && (
                                                <img src={Warning} alt=""/>
                                            ))}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                className={focus === 'fio' || form.fio ? `${styles.textField} on` : `${styles.textField} off`}
                                id="outlined-basic"
                                label="ФИО представителя"
                                name="fio"
                                variant="outlined"
                                onFocus={() => {
                                    setFocus('fio');
                                    const copy = {...isChanged};
                                    copy.fio = true;
                                    setChanged(copy)
                                }}
                                onBlur={() => {
                                    setFocus('')
                                }}
                                value={form.fio}
                                onChange={inputHandleChanged.bind(this)}

                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {form.fio ? (
                                                <img src={Check} alt=""/>
                                            ) : (isChanged.fio && (
                                                <img src={Warning} alt=""/>
                                            ))}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                className={focus === 'phoneNumber' || form.phoneNumber ? `${styles.textField} on` : `${styles.textField} off`}
                                id="outlined-basic"
                                label="Номер телефона"
                                name="phoneNumber"
                                variant="outlined"
                                onFocus={() => {
                                    setFocus('phoneNumber');
                                    const copy = {...isChanged};
                                    copy.phoneNumber = true;
                                    setChanged(copy)
                                }}
                                onBlur={() => {
                                    setFocus('')
                                }}
                                value={form.phoneNumber}
                                onChange={inputHandleChanged.bind(this)}

                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {form.phoneNumber ? (
                                                <img src={Check} alt=""/>
                                            ) : (isChanged.phoneNumber && (
                                                <img src={Warning} alt=""/>
                                            ))}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                className={focus === 'email' || form.email ? `${styles.textField} on` : `${styles.textField} off`}
                                id="outlined-basic"
                                label="Email"
                                disabled={true}
                                name="email"
                                variant="outlined"
                                onFocus={() => {
                                    setFocus('email');
                                    const copy = {...isChanged};
                                    copy.email = true;
                                    setChanged(copy)
                                }}
                                onBlur={() => {
                                    setFocus('')
                                }}
                                value={form.email}
                                onChange={inputHandleChanged.bind(this)}

                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {form.email ? (
                                                <img src={Check} alt=""/>
                                            ) : (isChanged.email && (
                                                <img src={Warning} alt=""/>
                                            ))}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <div
                                onClick={handleUpdateClicked}
                                style={isProfileUpdate ? {backgroundColor: "#FF494D"} : {}}
                                className={styles.btn}>
                                <div>
                                    Сохранить
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.profilePage_formContainer}>
                    <div className={styles.form}>
                        <div className={styles.formTitle}>
                            Безопасность
                        </div>
                        <div className={styles.formFields}>
                            <TextField
                                className={focus === 'newPassword' || form.newPassword ? `${styles.textField} on` : `${styles.textField} off`}
                                id="outlined-basic"
                                label="Новый пароль"
                                name="newPassword"
                                variant="outlined"
                                onFocus={() => {
                                    setFocus('newPassword');
                                    const copy = {...isChanged};
                                    copy.newPassword = true;
                                    setChanged(copy)
                                }}
                                onBlur={() => {
                                    setFocus('')
                                }}
                                value={form.newPassword}
                                onChange={inputHandleChanged.bind(this)}

                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {form.newPassword===form.confirmPassword ? (
                                                <img src={Check} alt=""/>
                                            ) : (isChanged.newPassword && (
                                                <img src={Warning} alt=""/>
                                            ))}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                className={focus === 'confirmPassword' || form.confirmPassword ? `${styles.textField} on` : `${styles.textField} off`}
                                id="outlined-basic"
                                label="Повторите пароль"
                                name="confirmPassword"
                                variant="outlined"
                                onFocus={() => {
                                    setFocus('confirmPassword');
                                    const copy = {...isChanged};
                                    copy.confirmPassword = true;
                                    setChanged(copy)
                                }}
                                onBlur={() => {
                                    setFocus('')
                                }}
                                value={form.confirmPassword}
                                onChange={inputHandleChanged.bind(this)}

                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {form.confirmPassword === form.newPassword ? (
                                                <img src={Check} alt=""/>
                                            ) : (isChanged.confirmPassword && (
                                                <img src={Warning} alt=""/>
                                            ))}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <div
                                onClick={handleUpdatePassword}
                                style={(form.newPassword === form.confirmPassword && form.newPassword.length>0 )? {backgroundColor: "#FF494D"} : {}}
                                className={styles.btn}>
                                <div>
                                    Сохранить
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Faq/>
        </div>
            </>
    )
};
export default ProfilePage