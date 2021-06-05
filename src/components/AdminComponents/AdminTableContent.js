import React from "react";
import styles from '../../assets/styles/AdminStyles/AdminTableContent.module.scss'
import {phoneFormat} from "../../tools/phoneForm";
import {returnDateFormat} from "../../tools/returnDateFormat";


const AdminTableContent = ({data=[],openModal}) => {
  return(
      <>
          {data.map((el,index)=>(
              <tr key={index} className={styles.content}>
                  <td onClick={()=>openModal(el)} className={styles.companyName} style={{fontSize:16}}>{el.user.company}</td>
                  <td>{el.user.phone}</td>
                  <td>
                      {el.user.email}
                  </td>
                  <td>
                      {el.service.name}
                  </td>
                  <td>
                      {returnDateFormat(el.user.created_at)}
                  </td>
                  <td className={styles.dontPaid}>
                      {(el.payment_status.id === 1 && el.payment_type.id === 3) && (
                          <div className={styles.dont_paid}>
                              Не оплачено
                          </div>
                      )}
                      {(el.payment_status.id === 1 && el.payment_type.id === 2 ) && (
                          <div className={styles.waiting_paid}>
                              Ожидается
                          </div>
                      )}
                      {el.payment_status.id === 2 && (
                          <div className={styles.waiting_paid2}>
                              Ждет подтверждение
                          </div>
                      )}
                      {el.payment_status.id === 3 && (
                          <div className={styles.successPaid}>
                              Оплачено
                          </div>
                      )}
                  </td>
              </tr>
          ))}
      </>
  )
};
export default AdminTableContent;