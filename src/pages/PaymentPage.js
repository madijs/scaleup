import React, {useEffect, useState} from "react";
import styles from '../assets/styles/PaymentStyles/PaymentPage.module.scss'
import GoBack from "../components/OtherComponents/GoBack";
import Faq from "../components/FaqComponents/Faq";
import PaymentBlockTitle from "../components/PaymentComponents/PaymentBlockTitle";
import PaymentChoicePay from "../components/PaymentComponents/PaymentChoicePay";
import PaymentCheckDownload from "../components/PaymentComponents/PaymentCheckDownload";
import PaymentSerivce from "../services/PaymentService";
import {useSelector} from "react-redux";
import {returnDateFormat} from "../tools/returnDateFormat";

const PaymentPage = () => {
    const [checkBoxHover,setCheckBoxHover] = useState('');
    const {userData} = useSelector(state => state.AuthPage);
    const [isDownload,setDownload] = useState(userData.payment ? ((userData.payment.payment_status_id == '2' || userData.payment.payment_type_id == '2') ? true : false) :false);
    const [choice,setChoice] = useState(userData.payment ? (userData.payment.payment_type_id == '2' ? 2 : 1) : '');

    const [paymentInfo,setPaymentInfo] = useState(null);
    const [date,setDate] = useState('');

    useEffect(()=>{
        window.scroll({top: 0, left: 0, behavior: 'smooth'});
        const response = new PaymentSerivce().userPayments();
        response.then(res=>{
            setPaymentInfo(res.data);
            setDate(res.data.created_at)
        });
        response.catch(err=>{
            console.log(err)
        })
    },[]);

    return (
        <div className={styles.container}>
            <div className={styles.payment_container}>
                <GoBack path={'/'} title="Страница оплаты" subtitle={`Сформирован счет на ${returnDateFormat(date)}`}/>
                <div className={styles.payment_blocks}>
                    {paymentInfo && (
                        <PaymentBlockTitle paymentInfo={paymentInfo}/>
                    )}
                    {(!isDownload) ? (
                        <PaymentChoicePay
                            choice={choice}
                            setChoice={setChoice}
                            checkBoxHover={checkBoxHover}
                            setCheckBoxHover={setCheckBoxHover}
                            setDownload={setDownload}
                        />
                    ):(
                        <PaymentCheckDownload
                            setDownload={setDownload}
                        />
                    )}
                </div>
            </div>
            <Faq/>
        </div>
    )
};

export default PaymentPage;