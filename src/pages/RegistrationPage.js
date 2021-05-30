import React, {useState} from 'react'
import styles from '../assets/styles/AuthStyles/RegistrationPage.module.scss'
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import Flag from "../assets/icons/Flag.svg";
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import '../assets/styles/OtherStyles/TextField.scss';
import Check from '../assets/icons/check.svg'
import Warning from '../assets/icons/warning.svg'
import AuthService from "../services/AuthService";
import validateEmail from "../tools/validateEmail";
import Modal from "react-modal";
import ErrorPopupModal from "../components/OtherComponents/ErrorPopupModal";

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


const RegistrationPage = () => {
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
    const history = useHistory();
    const [isPending,setPending] = useState(false);
    const [form,setForm] = useState({
        fullName:'',
        companyName:'',
        phoneNumber:'',
        email:'',
        password:'',
        confirmPassword:''
    });
    const [focus,setFocus] = useState('');
    const [isChanged,setChanged] = useState({
        fullName:false,
        companyName:false,
        phoneNumber:false,
        email:false,
        password:false,
        confirmPassword:false
    });


    const handleChangeCountry = (e) => {
        const copyForm = {...form};
        copyForm.phoneNumber = e.target.value;
        setForm(copyForm)
    };

    const inputHandleChanged = event => {
        const copyForm = {...form};
        if (event.target.name === "phoneNumber" && copyForm[event.target.name].length === 0 && event.target.value[0] !== "+"){
            copyForm[event.target.name] = "+"+event.target.value
        }else{
            copyForm[event.target.name] = event.target.value;
        }
        setForm(copyForm);
    };

    const submit = () => {
        setPending(true);
        const response = new AuthService().signUp(form.fullName,form.companyName,form.phoneNumber,form.email,form.password,form.confirmPassword);
        response.then(res=>{
           setPending(false);
            openPopupHandleChange({
                title: "Отлично!",
                text: `Для подтверждения Вашего аккаунта отправлено письмо на почту ${form.email}`,
                type: "success",
                link: "/",
                action: ()=> history.push('/')
            })
        });
        response.catch(err=>{
            openPopupHandleChange({
                title: "Упс!",
                text: err.response.data.errors[Object.keys(err.response.data.errors)[0]],
                type: "error"
            })
        });
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
                    <div className={styles.formTitle}>Регистрация</div>
                    <div className={styles.formSubtitle}>
                        <span className={styles.formSubtitle_question}>У вас есть аккаунт?</span>
                        <span onClick={()=>history.push('/')} className={styles.formSubtitle_answer}>Авторизуйтесь</span>
                        <div className={styles.formFields}>
                            <TextField
                                autoComplete={"off"}
                                className={focus==='fullName' || form.fullName ? `${styles.textField} on` : `${styles.textField} off`}
                                // style={form.fullName.length>0 ? {backgroundColor:"#fff"} : {backgroundColor:"#f9fafa"}}
                                id="outlined-basic"
                                label="ФИО"
                                name="fullName"
                                variant="outlined"
                                onFocus={()=>{
                                    setFocus('fullName');
                                    const copy = {...isChanged};
                                    copy.fullName = true;
                                    setChanged(copy);
                                }}
                                onBlur={()=>{
                                    setFocus('');
                                }}
                                value={form.fullName}
                                onChange={inputHandleChanged.bind(this)}
                                style={{height}}
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
                                    autoComplete: 'nope',
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {form.fullName ? (
                                                <img src={Check} alt=""/>
                                            ):(isChanged.fullName && (
                                                <img src={Warning} alt=""/>
                                            ))}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                autoComplete={"off"}
                                className={focus==='companyName' || form.companyName ? `${styles.textField} on` : `${styles.textField} off`}
                                id="outlined-basic"
                                label="Наименование компании"
                                name="companyName"
                                value={form.companyName}
                                onChange={inputHandleChanged.bind(this)}
                                onFocus={()=>{
                                    setFocus('companyName')
                                    const copy = {...isChanged};
                                    copy.companyName = true;
                                    setChanged(copy);
                                }}
                                onBlur={()=>setFocus('')}
                                style={{height}}
                                InputLabelProps={{
                                    style: {
                                        height,
                                        fontSize:14,
                                        ...(focus !== 'companyName' && { top: `${labelOffset}px` }),
                                    },
                                }}
                                InputProps={{
                                    style: {
                                        height,
                                        padding: '0 5px',
                                    },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {form.companyName ? (
                                                <img src={Check} alt=""/>
                                            ):(isChanged.companyName && (
                                                <img src={Warning} alt=""/>
                                            ))}
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                            />
                            <TextField
                                autoComplete={"off"}
                                className={focus==='phoneNumber' || form.phoneNumber.length>2 ? `${styles.textField} on` : `${styles.textField} off`}
                                id="outlined-basic"
                                label="Номер телефона"
                                name="phoneNumber"
                                value={form.phoneNumber}
                                onChange={(e)=>{
                                    if (!isNaN(e.target.value) || e.target.value=="+" || e.target.value==""){
                                        if (e.target.value === "+"){
                                            e.target.value = "";
                                            inputHandleChanged(e)
                                        }
                                        else if (e.target.value[0]!=="+"){
                                            e.target.value='+'+e.target.value;
                                            inputHandleChanged(e);
                                        }else{
                                            inputHandleChanged(e);
                                        }
                                    }
                                }}
                                onFocus={()=>{
                                    setFocus('phoneNumber');
                                    const copy = {...isChanged};
                                    copy.phoneNumber = true;
                                    setChanged(copy);
                                }}
                                onBlur={()=>setFocus('')}
                                variant="outlined"
                                style={{height}}
                                InputLabelProps={{
                                    style: {
                                        height,
                                        fontSize:14,
                                        ...(focus !== 'phoneNumber' && { top: `${labelOffset}px` }),
                                    },
                                }}
                                InputProps={{
                                    style: {
                                        height,
                                        padding: '0 5px',
                                    },
                                    autocomplete: 'new-password',
                                    form: {
                                        autocomplete: 'off',
                                    },
                                    // startAdornment: (
                                    //     <InputAdornment position="start">
                                    //         <Select
                                    //             labelId="demo-simple-select-label"
                                    //             id="demo-simple-select"
                                    //             onChange={handleChangeCountry}
                                    //         >
                                    //             <MenuItem style={{width:'64px'}} value={'+'}>
                                    //                 <ListItemIcon>
                                    //                     <img src={Flag} />
                                    //                 </ListItemIcon>
                                    //             </MenuItem>
                                    //         </Select>
                                    //     </InputAdornment>
                                    // ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {form.phoneNumber.length===12 ? (
                                                <img src={Check} alt=""/>
                                            ):(isChanged.phoneNumber && (
                                                <img src={Warning} alt=""/>
                                            ))}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                autoComplete={"off"}
                                className={focus==='email' || form.email ? `${styles.textField} on` : `${styles.textField} off`}
                                id="outlined-basic2"
                                label="Email"
                                name="email"
                                onChange={inputHandleChanged.bind(this)}
                                onFocus={()=>{
                                    setFocus('email');
                                    const copy = {...isChanged};
                                    copy.email = true;
                                    setChanged(copy);
                                }}
                                style={{height}}
                                InputLabelProps={{
                                    style: {
                                        height,
                                        fontSize:14,
                                        ...(focus !== 'email' && { top: `${labelOffset}px` }),
                                    },
                                }}
                                InputProps={{
                                    style: {
                                        height,
                                        padding: '0 5px',
                                    },
                                    autoComplete: "nope",
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {validateEmail(form.email) ? (
                                                <img src={Check} alt=""/>
                                            ):(isChanged.email && (
                                                <img src={Warning} alt=""/>
                                            ))}
                                        </InputAdornment>
                                    ),
                                }}
                                onBlur={()=>setFocus('')}
                                variant="outlined"
                            />
                            <TextField
                                className={focus==='password' || form.password ? `${styles.textField} on` : `${styles.textField} off`}
                                id="outlined-basic"
                                label="Придумайте пароль"
                                name="password"
                                type="password"
                                onChange={inputHandleChanged.bind(this)}
                                onFocus={()=>{
                                    setFocus('password');
                                    const copy = {...isChanged};
                                    copy.password = true;
                                    setChanged(copy);
                                }}
                                style={{height}}
                                InputLabelProps={{
                                    style: {
                                        height,
                                        fontSize:14,
                                        ...(focus !== 'password' && { top: `${labelOffset}px` }),
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
                                onBlur={()=>setFocus('')}
                                variant="outlined"
                            />
                            <TextField
                                error={isChanged.confirmPassword && (form.password !== form.confirmPassword)}
                                className={focus==='confirmPassword' || form.confirmPassword ? `${styles.textField} on` : `${styles.textField} off`}
                                id="outlined-basic"
                                label="Повторите пароль"
                                name="confirmPassword"
                                type="password"
                                style={{height}}
                                InputLabelProps={{
                                    style: {
                                        height,
                                        fontSize:14,
                                        ...(focus !== 'confirmPassword' && { top: `${labelOffset}px` }),
                                    },
                                }}
                                InputProps={{
                                    style: {
                                        height,
                                        padding: '0 5px',
                                    }
                                }}
                                onChange={inputHandleChanged.bind(this)}
                                onFocus={()=>{
                                    setFocus('confirmPassword')
                                    const copy = {...isChanged};
                                    copy.confirmPassword = true;
                                    setChanged(copy);
                                }}
                                onBlur={()=>setFocus('')}
                                variant="outlined"
                                helperText={isChanged.confirmPassword && (form.password !== form.confirmPassword) && "Пароли не совпадают."}
                            />
                        </div>
                        <div className={styles.btn}>
                            <button onClick={submit} className={isPending ? styles.signInBtnPending :styles.signInBtn} variant="contained" color="secondary">
                                Зарегистрироваться
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default RegistrationPage