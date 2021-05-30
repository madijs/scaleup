import React from "react";
import styles from "../../assets/styles/AdminStyles/CompanyInfo.module.scss";
import {phoneFormat} from "../../tools/phoneForm";
import {returnDateFormat} from "../../tools/returnDateFormat";
import {mediaLink} from "../../tools/medaiLink";

const CompanyInfoModal = (
    {
        companyName,
        address,
        branch,
        fio,
        phone,
        email,
        tarif,
        registration_date,
        file,
        status,
        payment_type,
        closeModal
    }) => {

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
                        {companyName}
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
                        Услуги
                    </div>
                </div>
                <div className={styles.modal_content_item}>
                    <div className={styles.key}>
                        ФИО представителя
                    </div>
                    <div className={styles.value}>
                        {fio}
                    </div>
                </div>
                <div className={styles.modal_content_item}>
                    <div className={styles.key}>
                        Телефон
                    </div>
                    <div className={styles.value}>
                        {phone}
                    </div>
                </div>
                <div className={styles.modal_content_item}>
                    <div className={styles.key}>
                        Email
                    </div>
                    <div className={styles.value}>
                        {email}
                    </div>
                </div>
                <div className={styles.modal_content_item}>
                    <div className={styles.key}>
                        Тариф
                    </div>
                    <div className={styles.value}>
                        {tarif}
                    </div>
                </div>
                <div className={styles.modal_content_item}>
                    <div className={styles.key}>
                        Дата регистрации
                    </div>
                    <div className={styles.value}>
                        {registration_date}
                    </div>
                </div>
                {file && (
                    <div className={styles.modal_content_item}>
                        <div className={styles.key}>
                            Платежное поручение
                        </div>
                        <div onClick={() => window.open(mediaLink + '/' + file)}
                             className={`${styles.value} ${styles.fileName}`}>
                            {file.replace('invoices/', '')}
                        </div>
                    </div>
                )}
                <div style={{borderBottom: 'none'}} className={styles.modal_content_item}>
                    <div className={styles.key}>
                        Статус
                    </div>
                    {(status === 1 && payment_type === 3) && (
                        <div className={styles.dont_paid}>
                            Не оплачено
                        </div>
                    )}
                    {(status === 1 && payment_type === 2) && (
                        <div className={styles.waiting_paid}>
                            Ожидается
                        </div>
                    )}
                    {status === 2 && (
                        <div className={styles.waiting_paid2}>
                            Ждет подтверждение
                        </div>
                    )}
                    {status === 3 && (
                        <div className={styles.successPaid}>
                            Оплачено
                        </div>
                    )}
                </div>
                <div className={styles.closeBtn}>
                    <div onClick={closeModal} className={styles.close_btn}>Закрыть</div>
                </div>
            </div>
        </div>
    )
};

export default CompanyInfoModal;