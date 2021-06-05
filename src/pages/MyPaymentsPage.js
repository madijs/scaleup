import React, {useEffect} from "react";
import styles from "../assets/styles/MyPaymentsPage.module.scss";
import GoBack from "../components/OtherComponents/GoBack";
import SaveBtn from "../components/OtherComponents/SaveBtn";
import {useSelector} from "react-redux";
import AdminTitle from "../components/AdminComponents/AdminTitle";
import MyPaymentTableContent from "../components/PaymentComponents/MyPaymentTableContent";
import cashFormat from "../tools/cashFormat";
import {returnDateFormat} from "../tools/returnDateFormat";

const MyPaymentsPage = () => {
    const {userData} = useSelector(state => state.AuthPage);

    useEffect(()=>{
       document.title = "ScaleUp | Мои платежи"
    },[]);

    function zeroPad(num, places) {
        var zero = places - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;
    }

    return (
        <div className={styles.container}>
            <div className={styles.mypayments}>
                <div className={styles.head}>
                    <GoBack
                        title={"Мои платежи"}
                        subtitle={"История ваших платежей"}
                    />
                    <div className={styles.btns}>
                        <SaveBtn
                            title={"Скачать КП от Scale Up"}
                            disabled={false}
                        />
                    </div>
                </div>
                <div className={styles.table_title}>
                    <table rules="none">
                    <tr className={styles.container}>
                        <th>
                            № платежа
                        </th>
                        <th>
                            Стоимость
                        </th>
                        <th>
                            дата
                        </th>
                        <th>
                            Тариф
                        </th>
                        <th>
                            Тип оплаты
                        </th>
                        <th>
                            Статус оплаты
                        </th>
                        <th>
                        </th>
                    </tr>
                    <MyPaymentTableContent userData={userData}/>
                    </table>
                </div>
                {userData && (
                    <div className={styles.mobile_table_title}>
                        <div className={styles.mobile_table_title_row}>
                            <div className={styles.row}>№ платежа</div>
                            <div className={styles.ans}>№ {zeroPad(userData.payment.id,6)}</div>
                        </div>
                        <div className={styles.mobile_table_title_row}>
                            <div className={styles.row}>Стоимость</div>
                            <div className={styles.ans}>{cashFormat(userData.payment.service.price)}</div>
                        </div>
                        <div className={styles.mobile_table_title_row}>
                            <div className={styles.row}>дата</div>
                            <div className={styles.ans}>{returnDateFormat(userData.payment.updated_at)}</div>
                        </div>
                        <div className={styles.mobile_table_title_row}>
                            <div className={styles.row}>Тариф</div>
                            <div className={styles.ans}> {userData.payment.service.name}</div>
                        </div>
                        <div className={styles.mobile_table_title_row}>
                            <div className={styles.row}>Тип оплаты</div>
                            <div className={styles.ans}>{userData.payment.payment_type.name}</div>
                        </div>
                        <div className={styles.mobile_table_title_row}>
                            <div className={styles.row}>Статус оплаты</div>
                            <div className={`${styles.ans} ${styles.action}`}>{userData.payment.payment_status.name}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};
export default MyPaymentsPage;