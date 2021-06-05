import React, {useState} from "react";
import styles from "../../../assets/styles/AdminStyles/CreateAndEditModal.module.scss"
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Check from "../../../assets/icons/check.svg";
import Warning from "../../../assets/icons/warning.svg";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import SettingsService from "../../../services/SettingsService";
import {getWorkersAction} from "../../../redux/actions/settings/getWorkersAction";
import {useDispatch} from "react-redux";
import {getUsersAction} from "../../../redux/actions/settings/getUsersAction";
import InputMask from 'react-input-mask';
import validateEmail from "../../../tools/validateEmail";


const CreateAndEditModal = ({closeModal,rolesList,selectedUserForm,setSelectedUserForm,openPopupHandleChange}) => {
    const dispatch = useDispatch();
    const [focus,setFocus] = useState('');
    const [form,setForm] = useState({
       fio: selectedUserForm ? selectedUserForm.fio : '',
       role:selectedUserForm ? selectedUserForm.roles[0].id : '',
       email: selectedUserForm ? selectedUserForm.email : '',
       password:'',
       confirmPassword:''
    });
    const [company,setCompany] = useState(selectedUserForm ? selectedUserForm.company : '');
    const [phone,setPhone] = useState(selectedUserForm ? selectedUserForm.phone : '');

    const [isChanged,setChanged] = useState({
        fio:'',
        role:'',
        email:'',
        password:'',
        company:'',
        phone:'',
        confirmPassword:''
    });

    const inputHandleChanged = event => {
        const copyForm = {...form};
        copyForm[event.target.name] = event.target.value;
        setForm(copyForm);
    };

    const createUser = () => {
        if (form.fio && form.role && form.email && (form.password && (form.password === form.confirmPassword))){
            const response = new SettingsService().createSystemUser(form.fio,form.role,form.email,form.password,form.confirmPassword,phone);
            response.then(res=>{
                dispatch(getWorkersAction());
                closeModal();
            }).catch(err=>{
                closeModal();
                openPopupHandleChange({
                    title: "Упс!",
                    text: err.response.data.errors[Object.keys(err.response.data.errors)[0]],
                    type: "error"
                });
            })
        }
    };

    const updateUser = () => {
        if (form.password === form.confirmPassword){
            console.log(selectedUserForm);
            console.log(selectedUserForm.company);
            if (selectedUserForm.roles[0].client){
                const response = new SettingsService().updateJustUser(selectedUserForm.id,form.fio,phone,company,form.email,form.password,form.confirmPassword);
                response.then(res=>{
                    dispatch(getUsersAction());
                    closeModal();
                })
            }else{
                const response = new SettingsService().updateSystemUser(selectedUserForm.id,form.fio,form.role,form.email,form.password,form.confirmPassword);
                response.then(res=>{
                    dispatch(getWorkersAction());
                    closeModal();
                })
            }
        }
    };

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.header_content}>
                    <div className={styles.header_content_title}>Редактирование</div>
                    <div onClick={closeModal} className={styles.close}></div>
                </div>
            </div>
            <div className={styles.content}>
                <TextField
                    className={focus === 'fio' || form.fio ? `${styles.textField} on` : `${styles.textField} off`}
                    id="outlined-basic"
                    label="ФИО"
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
                    className={focus === 'company' || company ? `${styles.textField} on` : `${styles.textField} off`}
                    id="outlined-basic"
                    label="Компания"
                    name="company"
                    variant="outlined"
                    onFocus={() => {
                        setFocus('company');
                        const copy = {...isChanged};
                        copy.company = true;
                        setChanged(copy)
                    }}
                    onBlur={() => {
                        setFocus('')
                    }}
                    value={company}
                    onChange={(e)=>setCompany(e.target.value)}

                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {company ? (
                                    <img src={Check} alt=""/>
                                ) : (isChanged.company && (
                                    <img src={Warning} alt=""/>
                                ))}
                            </InputAdornment>
                        ),
                    }}
                />
                {rolesList && (
                    <FormControl
                        className={focus === 'role' || form.role ? `${styles.textField} on` : `${styles.textField} off`}
                        variant="outlined">
                        <InputLabel htmlFor="outlined-age-native-simple">Выберите роль</InputLabel>
                        <Select
                            native
                            value={form.role}
                            onChange={inputHandleChanged.bind(this)}
                            label="Age"
                            inputProps={{
                                name: 'role',
                                id: 'outlined-age-native-simple',
                            }}
                        >
                            <option aria-label="None" value="" />
                            {rolesList.map((el,index)=>(
                                <option key={index} value={el.id}>{el.name}</option>
                            ))}
                        </Select>
                    </FormControl>
                )}
                <TextField
                    className={focus === 'email' || form.email ? `${styles.textField} on` : `${styles.textField} off`}
                    id="outlined-basic"
                    label="E-mail"
                    name="email"
                    type="email"
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
                                {validateEmail(form.email) ? (
                                    <img src={Check} alt=""/>
                                ) : (isChanged.email && (
                                    <img src={Warning} alt=""/>
                                ))}
                            </InputAdornment>
                        ),
                    }}
                />
                <InputMask
                    mask="+79999999999"
                    onChange={(e)=>{
                        setPhone(e.target.value)
                    }}
                    onFocus={() => {
                        setFocus('phone');
                        const copy = {...isChanged};
                        copy.phone = true;
                        setChanged(copy)
                    }}
                    onBlur={() => {
                        setFocus('')
                    }}
                    maskChar={null}
                    value={phone}
                >
                    {()=>
                        <TextField
                            className={focus === 'phone' || phone ? `${styles.textField} on` : `${styles.textField} off`}
                            id="outlined-basic"
                            label="Телефон"
                            name="phone"
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {phone ? (
                                            <img src={Check} alt=""/>
                                        ) : (isChanged.phone && (
                                            <img src={Warning} alt=""/>
                                        ))}
                                    </InputAdornment>
                                ),
                            }}
                        />
                    }
                </InputMask>

                <TextField
                    className={focus === 'password' || form.password ? `${styles.textField} on` : `${styles.textField} off`}
                    id="outlined-basic"
                    label="Введите пароль"
                    name="password"
                    type="password"
                    variant="outlined"
                    onFocus={() => {
                        setFocus('password');
                        const copy = {...isChanged};
                        copy.password = true;
                        setChanged(copy)
                    }}
                    onBlur={() => {
                        setFocus('')
                    }}
                    value={form.password}
                    onChange={inputHandleChanged.bind(this)}
                    InputProps={{
                        endAdornment: (
                            <>
                                {(isChanged.password && form.password) && (
                                    <InputAdornment position="end">
                                        {form.confirmPassword === form.password ? (
                                                <img src={Check} alt=""/>
                                            ) :
                                            (
                                                <img src={Warning} alt=""/>
                                            )
                                        }
                                    </InputAdornment>
                                )}
                            </>
                        ),
                    }}
                />
                <TextField
                    className={focus === 'confirmPassword' || form.confirmPassword ? `${styles.textField} on` : `${styles.textField} off`}
                    id="outlined-basic"
                    label="Повторите пароль"
                    name="confirmPassword"
                    type="password"
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
                            <>
                                {(isChanged.confirmPassword && form.confirmPassword) && (
                                    <InputAdornment position="end">
                                        {(form.confirmPassword === form.password) ? (
                                                <img src={Check} alt=""/>
                                            ) :
                                            (
                                                <img src={Warning} alt=""/>
                                            )
                                        }
                                    </InputAdornment>
                                )}
                            </>
                        ),
                    }}
                />
            </div>
            <div className={styles.footer}>
                {selectedUserForm ? (
                    <div onClick={updateUser} className={styles.add_btn}>Сохранить</div>
                ):(
                    <div onClick={createUser} className={styles.add_btn}>Добавить</div>
                )}
                <div onClick={closeModal} className={styles.cancel_btn}>Отмена</div>
            </div>
        </div>
    )
};

export default CreateAndEditModal;