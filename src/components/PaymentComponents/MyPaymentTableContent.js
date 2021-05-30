import React from "react";
import styles from "../../assets/styles/AdminStyles/AdminSettingsTableContent.module.scss";
import editIcon from "../../assets/icons/editTableIcon.svg";
import trashIcon from "../../assets/icons/trashIcon.svg";
import cashFormat from "../../tools/cashFormat";
import {returnDateFormat} from "../../tools/returnDateFormat";



const MyPaymentTableContent = ({userData}) => {

    function zeroPad(num, places) {
        var zero = places - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;
    }

    return(
        <tr>
            {userData && (
                <>
                    <td>
                        № {zeroPad(userData.payment.id,6)}
                    </td>
                    <td>
                        {cashFormat(userData.payment.service.price)}
                    </td>
                    <td>
                        {returnDateFormat(userData.payment.updated_at)}
                    </td>
                    <td>
                        {userData.payment.service.name}
                    </td>
                    <td>
                        {userData.payment.payment_type.name}
                    </td>
                    <td>
                        <span className={styles.action}>
                        {userData.payment.payment_status.name}
                        </span>
                    </td>
                </>
            )}
        </tr>
    )
};
export default MyPaymentTableContent;