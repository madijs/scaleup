import React from "react";
import styles from "../../assets/styles/AdminStyles/PaymentInfoModal.module.scss"
import {phoneFormat} from "../../tools/phoneForm";
import {returnDateFormat} from "../../tools/returnDateFormat";
import {mediaLink} from "../../tools/medaiLink";
import AdminService from "../../services/AdminService";
import {useDispatch} from "react-redux";
import {getPaymentTableAction} from "../../redux/actions/getPaymentTableAction";

const PaymentInfoModal = ({info, closeModal}) => {
    const dispatch = useDispatch();

    const acceptedPayment = () => {
        const response = new AdminService().agreePayment(info.user.id);
        response.then(result=>{
            dispatch(getPaymentTableAction());
            closeModal()
        }).catch(err=>{
            console.log(err);
            closeModal()
        })
    };
    console.log(info);

    return (
        <div className={styles.container}>
            <div className={styles.modal_header}>
                <div className={styles.title}>
                    Инфо о компании
                </div>
                <div onClick={closeModal} className={styles.close}>
                </div>
            </div>
            <div className={styles.modal_content}>
                <div className={styles.modal_content_item}>
                    <div className={styles.key}>
                        Компания
                    </div>
                    <div className={styles.value}>
                        {info.user.company}
                    </div>
                </div>
                <div className={styles.modal_content_item}>
                    <div className={styles.key}>
                        Страна/Город
                    </div>
                    <div className={styles.value}>
                        Казахстан/Алматы
                    </div>
                </div>
                <div className={styles.modal_content_item}>
                    <div className={styles.key}>
                        Отрасль
                    </div>
                    <div className={styles.value}>
                        {info.user.industry ? info.user.industry.name : ""}
                    </div>
                </div>
                <div className={styles.modal_content_item}>
                    <div className={styles.key}>
                        ФИО представителя
                    </div>
                    <div className={styles.value}>
                        {info.user.fio}
                    </div>
                </div>
                <div className={styles.modal_content_item}>
                    <div className={styles.key}>
                        Телефон
                    </div>
                    <div className={styles.value}>
                        {phoneFormat(info.user.phone)}
                    </div>
                </div>
                <div className={styles.modal_content_item}>
                    <div className={styles.key}>
                        Email
                    </div>
                    <div className={styles.value}>
                        {info.user.email}
                    </div>
                </div>
                <div className={styles.modal_content_item}>
                    <div className={styles.key}>
                        Тариф
                    </div>
                    <div className={styles.value}>
                        {info.service.name}
                    </div>
                </div>
                <div className={styles.modal_content_item}>
                    <div className={styles.key}>
                        Дата регистрации
                    </div>
                    <div className={styles.value}>
                        {returnDateFormat(info.user.created_at)}
                    </div>
                </div>
                {info.invoice && (
                    <div className={styles.modal_content_item}>
                        <div className={styles.key}>
                            Платежное поручение
                        </div>
                        <div onClick={()=>window.open(mediaLink + '/' + info.invoice.link)}
                             className={`${styles.value} ${styles.fileName}`}>
                            {info.invoice.link.replace('invoices/', '')}
                        </div>
                    </div>
                )}
                <div style={{borderBottom:'none'}} className={styles.modal_content_item}>
                    <div className={styles.key}>
                        Статус
                    </div>
                    {(info.payment_status.id === 1 && info.payment_type.id === 3) && (
                        <div className={styles.dont_paid}>
                            Не оплачено
                        </div>
                    )}
                    {(info.payment_status.id === 1 && info.payment_type.id === 2 ) && (
                        <div className={styles.waiting_paid}>
                            Ожидается
                        </div>
                    )}
                    {info.payment_status.id === 2 && (
                        <div className={styles.waiting_paid2}>
                            Ждет подтверждение
                        </div>
                    )}
                    {info.payment_status.id === 3 && (
                        <div className={styles.successPaid}>
                            Оплачено
                        </div>
                    )}
                </div>
                {info.payment_status.id ===2 ? (
                    <div className={styles.btns}>
                        <div onClick={acceptedPayment} className={styles.agree_btn}>Подтвердить оплату</div>
                        <div style={{flex:'0.1'}}></div>
                        <div onClick={closeModal} className={styles.close_btn}>Закрыть</div>
                    </div>
                ):(
                    <div className={styles.closeBtn}>
                        <div onClick={closeModal} className={styles.close_btn}>Закрыть</div>
                    </div>
                )}
            </div>
        </div>
    )
};

export default PaymentInfoModal;