import React, {useState} from "react";
import styles from '../../assets/styles/PaymentStyles/ModalCard.module.scss';
import {useHistory} from 'react-router-dom'
import PaymentSerivce from "../../services/PaymentService";
import {getMeInfoAction} from "../../redux/actions/getMeInfo";
import {useDispatch} from "react-redux";

const ModalCard = ({closeModal,selectedService}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isChecked,setCheck] = useState([false,false]);

    const checkIt = (index) => {
        const copy = [...isChecked];
        copy[index] = !isChecked[index];
        setCheck(copy)
    };


    const payHandleChange = () => {

        if (isChecked[0] && isChecked[1]){
            const response = new PaymentSerivce().setServicePay(selectedService);
            response.then(async res=>{
                await dispatch(getMeInfoAction(localStorage.getItem('token')));
                history.push('/payment');
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })

        }
    };




    return(
        <div className={styles.modal_card_container}>
            <span style={{borderBottom:'1px solid #8F92A1'}}>
                <div className={styles.modal_card_title_container}>
                    <div>
                        <h2>
                            Внимание!
                        </h2>
                    </div>
                    <div onClick={closeModal} className={styles.close}>
                    </div>
                </div>
            </span>
            <div className={styles.modal_card_body_container}>
                <div className={styles.modal_card_body}>
                    <div className={styles.modal_card_body_item}>
                        <input onClick={checkIt.bind(this, 0)} checked={isChecked[0]} type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                        <label>Я принимаю <span onClick={()=>history.push('/privacyAgreement')}> условия использования </span> сервиса ScaleUp</label><br/>
                    </div>
                    <div className={styles.modal_card_body_item}>
                        <input onClick={checkIt.bind(this, 1)} checked={isChecked[1]} type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                        <label>Я принимаю <span onClick={()=>window.open('/privacyAgreement')}> соглашение о конфиденциальности </span> </label><br/>
                    </div>
                    <div onClick={payHandleChange} style={isChecked[0] && isChecked[1] ? {transition:'.4s'} : {backgroundColor:'#ccc',transition:'.4s'}} className={styles.modal_btn}>
                        Продолжить
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ModalCard;