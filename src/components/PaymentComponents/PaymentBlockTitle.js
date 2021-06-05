import React from "react";
import styles from "../../assets/styles/PaymentStyles/PaymentPage.module.scss";
import MasterCard from "../../assets/icons/mastercard.svg";
import Visa from "../../assets/icons/visa.svg";
import CreditCard from "../../assets/icons/creditcard.svg";
import CashCard from "../../assets/icons/cashcard.svg";
import cashFormat from "../../tools/cashFormat";

const PaymentBlockTitle = ({paymentInfo}) => {
    return(
        <>
            <div className={styles.payment_block_title}>
                <div className={styles.payment_title}>
                    <div>№ ПЛАТЕЖА</div>
                    <div>СТОИМОСТЬ</div>
                    <div>ТАРИФ</div>
                    <div>СТАТУС ОПЛАТЫ</div>
                </div>
                <div className={styles.payment_body}>
                    <div>№ {paymentInfo.id}</div>
                    <div>{cashFormat(paymentInfo.service.price)}</div>
                    <div>{paymentInfo.service.name}</div>
                    <div className={styles.status}>
                        <div>Ожидает</div>
                    </div>
                </div>
            </div>
            <div className={styles.mobile_table_title}>
                <div className={styles.mobile_table_title_row}>
                    <div className={styles.row}>№ ПЛАТЕЖА</div>
                    <div className={styles.ans}>№ {paymentInfo.id}</div>
                </div>
                <div className={styles.mobile_table_title_row}>
                    <div className={styles.row}>СТОИМОСТЬ</div>
                    <div className={styles.ans}>{cashFormat(paymentInfo.service.price)}</div>
                </div>
                <div className={styles.mobile_table_title_row}>
                    <div className={styles.row}>Тариф</div>
                    <div className={styles.ans}>{paymentInfo.service.name}</div>
                </div>
                <div className={styles.mobile_table_title_row}>
                    <div className={styles.row}>Статус оплаты</div>
                    <div className={styles.status}>
                        <div>Ожидает</div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default PaymentBlockTitle