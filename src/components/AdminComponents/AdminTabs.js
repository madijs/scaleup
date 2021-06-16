import React, {useState} from "react";
import styles from '../../assets/styles/AdminStyles/AdminTabs.module.scss'
import {useHistory} from "react-router-dom";

const AdminTabs = ({card_paid_count,invoice_paid_count,dont_paid_count,active,setActive}) => {
    const history = useHistory();
    console.log(active);
  return(
      <div className={styles.container}>
          <div className={styles.tabs}>
              <div onClick={()=>{
                  setActive(1);
                  history.push('/admin/payment/1')
              }} className={ active === 1 ? `${styles.tab} ${styles.active}`: `${styles.tab}`}>
                  Неоплаченные <span className={styles.count}>({dont_paid_count})</span>
              </div>
              <div onClick={()=>{
                  setActive(2);
                  history.push('/admin/payment/2')
              }} className={ active === 2 ? `${styles.tab} ${styles.active}`: `${styles.tab}`}>
                  Банковская карта <span className={styles.count}>({card_paid_count})</span>
              </div>
              <div onClick={()=>{
                  setActive(3);
                  history.push('/admin/payment/3')
              }} className={ active === 3 ? `${styles.tab} ${styles.active}`: `${styles.tab}`}>
                  Банковский перевод <span className={styles.count}>({invoice_paid_count})</span>
              </div>
          </div>
      </div>
  )
};

export default AdminTabs