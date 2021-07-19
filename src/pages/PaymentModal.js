import React, {useState} from "react";
import styles from "../assets/styles/PaymentModal.module.scss"
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Comment from "../assets/icons/comment.svg";
import PaymentSerivce from "../services/PaymentService";
import CircularIndeterminate from "../components/FormConponents/ProgressCircle";
import {DOCUMENT_PREVIEW_SUCCESS} from "../types/documentTypes";
import {useDispatch} from "react-redux";

const PaymentModal = ({close,setDownload}) => {
    const dispatch = useDispatch();
    const [focus,setFocus] = useState('');
    const [iin,setIin] = useState('');
    const [fio,setFio] = useState('');
    const [isPending,setPending] = useState(false);


    const save = () => {
        setPending(true);
        const response = new PaymentSerivce().setBinAndFio(iin,fio);
        response.then(res=>{
            window.open(res.data.link);
            const response = new PaymentSerivce().paymentSelect(2);
            response.then(res=>{
                setDownload(true);
                setPending(false);
                close();
            });
            response.catch(err=>{
                setPending(false)
            });
        }).catch(err=>{
            setPending(false)
        })
    };

    return(
        <div className={styles.modal}>
            <div onClick={close} className={styles.close}>
            </div>
            <div className={styles.content}>
                {!isPending ? (
                    <>
                        <TextField
                            autoComplete={"off"}
                            className={focus === 'iin' || iin ? `${styles.textField} on` : `${styles.textField} off`}
                            id="outlined-basic"
                            name="iin"
                            type="text"
                            variant="outlined"
                            label={"БИН/ИИН оплачивающего лица"}
                            value={iin}
                            onFocus={()=>{
                                setFocus('iin')
                            }}
                            onChange={(e)=>setIin(e.target.value)}
                        />
                        <TextField
                            autoComplete={"off"}
                            className={focus === 'fio' || fio ? `${styles.textField} on` : `${styles.textField} off`}
                            id="outlined-basic"
                            name="fio"
                            type="text"
                            variant="outlined"
                            label={"Название компании или ФИО оплачивающего лица"}
                            value={fio}
                            onFocus={()=>{
                                setFocus('fio')
                            }}
                            onChange={(e)=>setFio(e.target.value)}
                        />
                    </>
                ):(
                    <div style={{paddingBottom:'15px'}}>
                        <CircularIndeterminate/>
                        <div>Подождите, счет на оплату формируется</div>
                    </div>
                )}
            </div>
            {!isPending && (
                <div className={styles.footer}>
                    <div onClick={save} className={styles.add_btn}>Сохранить</div>
                    <div onClick={close} className={styles.cancel_btn}>Отмена</div>
                </div>
            )}
        </div>
    )
};

export default PaymentModal