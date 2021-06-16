import React, {useEffect, useState} from "react";
import styles from "../assets/styles/AuthStyles/LoginPage.module.scss";
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Check from "../assets/icons/check.svg";
import Warning from "../assets/icons/warning.svg";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AuthService from "../services/AuthService";
import Modal from "react-modal";
import ErrorPopupModal from "../components/OtherComponents/ErrorPopupModal";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    btns:{
        marginTop: 20
    }
}));
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
const ForgottenPasswordPage = () => {
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
    const classes = useStyles();
    const history = useHistory();
    const search = new URLSearchParams(useLocation().search);


    const [email,setEmail] = useState('');
    const [focus,setFocus] = useState('');
    const [emailIsChanged,setEmailChanged] = useState(false);
    const [isEmailForgotTrue,setEmailForgot] = useState(false);
    const [isPending,setPending] = useState(false);

    const [step,setStep] = useState(false);

    const [passForm,setForm] = useState({
        password:'',
        confirmPassword:''
    });

    const [passChanged,setPassChanged] = useState({
        password:false,
        confirmPassword:false
    });

    const inputHandleChanged = event => {
        setEmail(event.target.value)
    };

    const passwordChanged = event => {
        const copyForm = {...passForm};
        copyForm[event.target.name] = event.target.value;
        setForm(copyForm);
    };

    const submit = () => {
        const response = new AuthService().forgottenPassword(email);
        setPending(true);
        response.then(res=>{
            setPending(false);
            setEmailForgot(true);
        });
        response.catch(err=>{
            setPending(false);
            openPopupHandleChange({
                title: "Упс!",
                text: "Пользователь не найден. Введите верный логин и пароль или пройдите регистрацию",
                type: "error"
            });
        })
    };

    useEffect(()=>{
        const token = search.get('token');
        if (token){
            setStep(true)
        }
    },[]);

    const changePasswordClicked = () => {
        const token = search.get('token');
        const email = search.get('email');
        setPending(true);
        const response = new AuthService().changePassword(token,passForm.password,passForm.confirmPassword,email)
        response.then(res=>{
            setPending(false);
            history.push('/')
        });
        response.catch(err=>{
            setPending(false);
            console.log(err)
        })
    };


    return(
        <>
            <Modal
                isOpen={errorPopup.status}
                onRequestClose={closePopupHandleChange}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <ErrorPopupModal closePopupHandleChange={closePopupHandleChange} data={errorPopup.data}/>
            </Modal>
        <div className={styles.formContainer}>
            <div className={styles.form}>
                <div className={styles.formTitle}>Восстановление пароль</div>
                <div className={styles.formSubtitle}>
                    <span className={styles.formSubtitle_question}>У вас есть аккаунт?</span>
                    <span onClick={()=>history.push('/')} className={styles.formSubtitle_answer}>Войти</span>
                    {!step ? (
                        <>
                            {isEmailForgotTrue ? (
                                <div className={styles.successEmail}>
                                    На вашу почту <span>{email}</span> отправлена ссылка с восстноволением пароля, проверьте почту!
                                </div>
                            ):(
                                <div className={styles.formFields}>
                                    <TextField
                                        className={focus==='email' || email ? `${styles.textField} on` : `${styles.textField} off`}
                                        id="outlined-basic"
                                        label="Ваш логин"
                                        name="email"
                                        variant="outlined"
                                        onFocus={()=>{
                                            setFocus('email');
                                            setEmailChanged(true)
                                        }}
                                        onBlur={()=>{
                                            setFocus('')
                                        }}
                                        value={email}
                                        onChange={inputHandleChanged.bind(this)}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    {email ? (
                                                        <img src={Check} alt=""/>
                                                    ):(emailIsChanged && (
                                                        <img src={Warning} alt=""/>
                                                    ))}
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                            )}
                            {!isEmailForgotTrue && (
                                <div className={classes.btns}>
                                    {!isPending ? (
                                        <button onClick={submit} className={styles.signInBtn} color="secondary">
                                            Отправить
                                        </button>
                                    ):(
                                        <button className={styles.loadingBtn} color="secondary">
                                            Загрузка...
                                        </button>
                                    )}
                                </div>
                            )}
                        </>
                    ):(
                        <>
                            <TextField
                                className={focus==='password' || passForm.password ? `${styles.textField} on` : `${styles.textField} off`}
                                name="password"
                                type="password"
                                onFocus={()=>{
                                    setFocus('password');
                                    const copy = {...passChanged};
                                    copy.password = true;
                                    setPassChanged(copy)
                                }}
                                onBlur={()=>{
                                    setFocus('');
                                }}
                                id="outlined-basic"
                                label="Пароль"
                                variant="outlined"
                                value={passForm.password}
                                onChange={passwordChanged.bind(this)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {passForm.password ? (
                                                <img src={Check} alt=""/>
                                            ):(passChanged.password && (
                                                <img src={Warning} alt=""/>
                                            ))}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                error={passChanged.confirmPassword && (passForm.password !== passForm.confirmPassword)}
                                className={focus==='confirmPassword' || passChanged.confirmPassword ? `${styles.textField} on` : `${styles.textField} off`}
                                id="outlined-basic"
                                label="Повторите пароль"
                                name="confirmPassword"
                                type="password"
                                onChange={passwordChanged.bind(this)}
                                onFocus={()=>{
                                    setFocus('confirmPassword');
                                    const copy = {...passChanged};
                                    copy.confirmPassword = true;
                                    setPassChanged(copy);
                                }}
                                onBlur={()=>setFocus('')}
                                variant="outlined"
                                helperText={passChanged.confirmPassword && (passForm.password !== passForm.confirmPassword) && "Пароли не совпадают."}
                            />
                            {!isPending ? (
                                <button style={{marginTop:20}} onClick={changePasswordClicked} className={styles.signInBtn} color="secondary">
                                    Восстановить пароль
                                </button>
                            ):(
                                <button style={{marginTop:20}} className={styles.loadingBtn} color="secondary">
                                    Загрузка...
                                </button>
                            )}
                        </>
                    )}

                </div>
            </div>
        </div>
            </>
    )
};
export default ForgottenPasswordPage;