import React, {useState} from 'react'
import styles from '../assets/styles/AuthStyles/LoginPage.module.scss'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import '../assets/styles/OtherStyles/TextField.scss';
import { useHistory } from "react-router-dom";
import '../assets/styles/OtherStyles/TextField.scss';
import InputAdornment from "@material-ui/core/InputAdornment";
import Check from "../assets/icons/check.svg";
import Warning from "../assets/icons/warning.svg";
import {useDispatch} from "react-redux";
import {setUserAction} from "../redux/actions/setUserAction";
import Modal from "react-modal";
import ErrorPopupModal from "../components/OtherComponents/ErrorPopupModal";



const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
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

const labelOffset = -6;
const height = 46;

const LoginPage = () => {
    const [modalIsOpen,setIsOpen] = useState(false);
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
    const history = useHistory();
    const classes = useStyles();
    const [form,setForm] = useState({
        email: '',
        password: ''
    });
    const [focus,setFocus] = useState('');
    const [isChanged,setChanged] = useState({
        email:false,
        password: false
    });

    const inputHandleChanged = event => {
        const copyForm = {...form};
        copyForm[event.target.name] = event.target.value;
        setForm(copyForm);
    };

    const submit = () => {
        const response = dispatch(setUserAction(form.email,form.password));
        response.catch(err=>{
                openPopupHandleChange({
                    title: "Упс!",
                    text: "Введен неверный логин или пароль",
                    type: "error"
                })
        })
    };

    function closeModal(){
        setIsOpen(false);
    }



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
                    <div className={styles.formTitle}>Авторизация</div>
                    <div className={styles.formSubtitle}>
                        <span className={styles.formSubtitle_question}>У вас нет аккаунта?</span>
                        <span onClick={()=>history.push('/registration')} className={styles.formSubtitle_answer}>Зарегистрируйтесь</span>
                        <div className={styles.formFields}>
                            <TextField
                                // autoComplete={"off"}
                                className={focus==='email' || form.email ? `${styles.textField} on` : `${styles.textField} off`}
                                id="outlined-basic"
                                label="Ваш логин"
                                name="email"
                                variant="outlined"
                                onFocus={()=>{
                                    setFocus('email');
                                    const copy = {...isChanged};
                                    copy.email = true;
                                    setChanged(copy)
                                }}
                                onBlur={()=>{
                                    setFocus('')
                                }}
                                value={form.email}
                                onChange={inputHandleChanged.bind(this)}
                                InputLabelProps={{
                                    style: {
                                        height,
                                        fontSize:14,
                                        ...(focus !== 'fullName' && { top: `${labelOffset}px` }),
                                    },
                                }}
                                InputProps={{
                                    style: {
                                        height,
                                        padding: '0 5px',
                                    },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {form.email ? (
                                                <img src={Check} alt=""/>
                                            ):(isChanged.email && (
                                                <img src={Warning} alt=""/>
                                            ))}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                className={focus==='password' || form.password ? `${styles.textField} on` : `${styles.textField} off`}
                                name="password"
                                type="password"
                                onFocus={()=>{
                                    setFocus('password');
                                    const copy = {...isChanged};
                                    copy.password = true;
                                    setChanged(copy)
                                }}
                                onBlur={()=>{
                                    setFocus('');
                                }}
                                id="outlined-basic"
                                label="Пароль"
                                variant="outlined"
                                value={form.password}
                                onChange={inputHandleChanged.bind(this)}
                                InputLabelProps={{
                                    style: {
                                        height,
                                        fontSize:14,
                                        ...(focus !== 'fullName' && { top: `${labelOffset}px` }),
                                    },
                                }}
                                InputProps={{
                                    style: {
                                        height,
                                        padding: '0 5px',
                                    },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {form.password ? (
                                                <img src={Check} alt=""/>
                                            ):(isChanged.password && (
                                                <img src={Warning} alt=""/>
                                            ))}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                        <div className={styles.formFooter}>
                            <div className={styles.check}>
                                <input style={{backgroundColor:'red'}} type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <label htmlFor="vehicle1">Запомнить меня</label>
                            </div>
                            <div onClick={()=>history.push('/forgotten')} className={styles.forgotten}>
                                Забыли пароль?
                            </div>
                        </div>
                        <div className={styles.btn}>
                            <button onClick={submit} className={styles.signInBtn} variant="contained" color="secondary">
                                Войти
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default LoginPage;