import React, {useState} from "react";
import styles from "../../assets/styles/PaymentStyles/PaymentPage.module.scss";
import MasterCard from "../../assets/icons/mastercard.svg";
import Visa from "../../assets/icons/visa.svg";
import CreditCard from "../../assets/icons/creditcard.svg";
import CashCard from "../../assets/icons/cashcard.svg";
import axios from '../../plugins/axios'
import PaymentSerivce from "../../services/PaymentService";
import {useSelector} from "react-redux";
import Modal from "react-modal";
import ErrorPopupModal from "../OtherComponents/ErrorPopupModal";
import PaymentModal from "../../pages/PaymentModal";

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

const PaymentChoicePay = ({choice,setChoice,checkBoxHover,setCheckBoxHover,setDownload}) => {
    const [open,setOpen] = useState(false);
    const checkDownload = () => {
        // setDownload(true);
        setOpen(true);
        // window.open(axios.defaults.baseURL+'/payments/invoice-file','_self')

    };

    const payByBankCard = () => {
        axios.post('/payments/bank').then(res=>{
            console.log(res.data)
            if (res.data.status === 'success'){
                window.open(res.data.link)
            }
        })
    }

    return(
        <>
            <Modal
                isOpen={open}
                onRequestClose={()=>setOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <PaymentModal setDownload={setDownload} close={()=>setOpen(false)}/>
            </Modal>
        <div className={styles.payment_block_body}>
            <div className={styles.payment_block_body_title}><h3>Выберите способ оплаты</h3></div>
            <div className={styles.payment_block_body_choice}>
                <div
                    style={choice === 1 ? {backgroundColor: '#F3F6F8',transition:'.4s'} : {}}
                    onClick={setChoice.bind(this, 1)}
                    onMouseEnter={()=>setCheckBoxHover( 1)}
                    onMouseLeave={()=>setCheckBoxHover( '')}
                    className={styles.bank_card}>
                    <div className={styles.bank_card_visa_mastercard}>
                        <img src={MasterCard} alt="mastercard"/>
                        <img src={Visa} alt="visa"/>
                    </div>
                    {(checkBoxHover === 1 || choice ===1 ) ? (
                        <div className={styles.checkbox}>
                            <input checked={choice===1 ? true : false} onClick={setChoice.bind(this, 1)}  type="checkbox" id="vehicle1" name="bankcard" value=""/>
                        </div>
                    ):(
                        <div></div>
                    )}
                    <div className={styles.bank_card_body}>
                        <img src={CreditCard} alt="creditcard"/>
                        <div>Банковская карта</div>
                    </div>

                </div>
                <div
                    style={choice === 2 ? {backgroundColor: '#F3F6F8',transition:'.4s'} : {}}
                    onClick={setChoice.bind(this, 2)}
                    onMouseEnter={()=>setCheckBoxHover(2)}
                    onMouseLeave={()=>setCheckBoxHover('')}
                    className={styles.bank_card}>
                    <div className={styles.bank_card_body}>
                        <img src={CashCard} alt="cashcard"/>
                        <div>Банковский перевод</div>
                    </div>
                    {(checkBoxHover === 2 || choice===2) ? (
                        <div className={styles.checkbox}>
                            <input checked={choice===2 ? true : false} onClick={setChoice.bind(this, 2)}  type="checkbox" id="vehicle1" name="cashcard" value=""/>
                        </div>
                    ):(
                        <div></div>
                    )}
                </div>
            </div>
            {choice === 2 ? (
                <div onClick={checkDownload} className={styles.payment_button}>
                    Скачать счет на оплату
                </div>
            ):(
                <div onClick={payByBankCard} className={styles.payment_button}>
                    Оплатить сейчас
                </div>
            )}
        </div>
            </>
    )
};

export default PaymentChoicePay