import React, {useState} from "react";
import styles from "../../assets/styles/AdminStyles/AdminProfilePage.module.scss"
import EditAva from "../../assets/icons/editAva.svg";
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Check from "../../assets/icons/check.svg";
import Warning from "../../assets/icons/warning.svg";
import {useDispatch, useSelector} from "react-redux";
import {updateUserAction} from "../../redux/actions/updateUserAction";
import AuthService from "../../services/AuthService";

const AdminProfilePage = () => {
    const dispatch = useDispatch();
    const [img, setImg] = useState('data:image/jpeg;base64,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');
    const hiddenFileInput = React.useRef(null);
    const {userData} = useSelector(state => state.AuthPage);

    const [form, setForm] = useState({
        companyName: userData ? userData.company : '',
        fio: userData ? userData.fio : '',
        phoneNumber: userData ? userData.phone : '',
        roleName: userData ? userData.roles[0].name : '',
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


    const handleChange = event => {
        setImg(URL.createObjectURL(event.target.files[0]));
    };
    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const checkUpdates = obj => {
        if (obj.companyName || obj.fio || obj.phoneNumber || obj.email) {
            setProfileUpdate(true)
        }else{
            setProfileUpdate(false)
        }
    };

    const handleUpdateClicked = () => {
        if (isProfileUpdate){
            const response = dispatch(updateUserAction(form.companyName,form.fio,form.email,form.phoneNumber));
            response.then(()=>{
                setProfileUpdate(false)
            })
        }
    };

    const handleUpdatePassword = () => {
        const response = new AuthService().updatePassword(form.newPassword,form.confirmPassword);
        response.then(res=>{
            const copy = {...form};
            copy.newPassword = "";
            copy.confirmPassword = "";
            setForm(copy)
        }).catch(err=>{
            console.log(err.response)
        })
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


    return(
        <div className={styles.container}>
            <div className={styles.title}>
                <div className={styles.title_name}>
                    <div className={styles.title_name_myProfile}>Мой профиль</div>
                    <div className={styles.title_name_description}>Вы можете изменить свой данные и сменить пароль</div>
                </div>
            </div>
            <div className={styles.profilePage}>
                <div className={styles.avatar_container}>
                    <div className={styles.avatarIcon_container}>
                        <img src={img}/>
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
                                className={focus === 'roleName' || form.roleName ? `${styles.textField} on` : `${styles.textField} off`}
                                id="outlined-basic"
                                label="Должность"
                                name="roleName"
                                variant="outlined"
                                value={form.roleName}
                                onChange={inputHandleChanged.bind(this)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                                <img src={Check} alt=""/>
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
                                style={form.newPassword === form.confirmPassword ? {backgroundColor: "#FF494D"} : {}}
                                className={styles.btn}>
                                <div>
                                    Сохранить
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default AdminProfilePage;