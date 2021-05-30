import React from 'react'
import styles from "../../assets/styles/MainStyles/MainPage.module.scss";
import Icon from "../../assets/icons/Icon.svg";
import PropTypes from 'prop-types'
import cashFormat from "../../tools/cashFormat";


const MainFirstItem = ({openModal, info,disabled}) => {
    console.log(info);
    return (
        <div style={{height: '730px'}} className={styles.block}>
            <div className={styles.block_pad}>
            <div className={styles.block_title}>
                {info.name}
            </div>
            <div className={styles.block_price}>
                {cashFormat(info.price)}
            </div>
            <div className={styles.block_price_subtitle}>
                {info.work} рабочих дней
            </div>
            <div
                style={ disabled ? {opacity:0.1,cursor:'default'} : {}}
                onClick={()=>{
                    if (!disabled){
                        openModal(info.id)
                    }
                }}
                className={styles.block_btn_service}>
                Получить доступ
            </div>
            <div className={styles.block_data}>
                {Object.keys(info.data).map((key, index) => (
                    <div key={index}>
                        <div className={styles.block_data_el}>
                            <div className={styles.block_img}>
                                <img src={Icon} alt=""/>
                            </div>
                            <div className={styles.block_data_title}>
                                <span>{info.data[key].name}</span>
                            </div>
                        </div>
                        {info.data[key].sub_data && (
                            <div className={styles.block_data_desctiption}>
                                {info.data[key].sub_data.map((el,index)=>(
                                    <div style={{marginTop:2.5}} key={index}>
                                        {el}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            </div>
        </div>
    )
};

MainFirstItem.propTypes = {
    openModal: PropTypes.func.isRequired, // функция для открытия модалки при покупке;
    info: PropTypes.string.isRequired // Информация о пакете услуг
};

export default MainFirstItem;