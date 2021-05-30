import React, {useEffect, useState} from "react";
import styles from '../../assets/styles/PaymentStyles/PaymentPage.module.scss'
import Trash from '../../assets/icons/trash.svg'
import Modal from 'react-modal';
import Success from '../../assets/icons/success.svg'
import SupportIcon from '../../assets/icons/supportIcon.svg'
import PaymentSerivce from "../../services/PaymentService";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";


const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        borderRadius          : 32
    }
};

const PaymentCheckDownload = ({setDownload}) => {
    const history = useHistory();
    const {userData} = useSelector(state => state.AuthPage);

    const [isSended,setSend] = useState(false);
    const [isModalOpen,setModalOpen] = useState(false);
    const [file,setFile] = useState(null);

    const hiddenFileInput = React.useRef(null);

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        console.log(fileUploaded);
        setFile(fileUploaded);
    };

    const openModal = () => {
        const formData = new FormData();
        formData.append('link',file);

        const response = new PaymentSerivce().paymentInvoice(formData);
        response.then(res=>{
            setModalOpen(true);
            setSend(true);
        });
        response.catch(err=>{
            console.log(err)
        })
    };

    useEffect(()=>{
        if (userData.payment){
            if (userData.payment.payment_status_id == '2'){
                setSend(true)
            }
        }
    },[]);

    useEffect(()=>{
        if (userData.payment){
            if (userData.payment.payment_status_id == 3){
                history.push('/')
            }
        }
    },[]);

    function closeModal(){
        setModalOpen(false);
    }
    return(
        <>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className={styles.modal}>
                    <div>
                        <img src={Success} alt=""/>
                    </div>
                    <div className={styles.modal_title}>
                        Отлично!
                    </div>
                    <div className={styles.modal_description}>
                        <div>Платежное поручение отправлено!</div>
                        <div>Ожидайте ответа</div>
                    </div>
                    <div onClick={closeModal} className={styles.modal_button}>
                        Закрыть
                    </div>
                </div>
            </Modal>
        <div className={styles.payment_block_body}>
            {!isSended ? (
                <>
                    <div onClick={()=>setDownload(false)} className={styles.payment_block_body_change_title}>Изменить способ оплаты</div>
                    <div className={styles.payment_block_body_title}><h3>Подтвердите платежное поручение</h3></div>
                    <div className={styles.payment_block_body_change_description}>Вам необходимо загрузить файл платежного поручения для подтверждения платежа. Проверка занимает не более 1-го рабочего дня.</div>
                    {!file ? (
                        <div className={styles.payment_file_place}>
                            <div className={styles.payment_file_place_title}>
                                <input
                                    type="file"
                                    ref={hiddenFileInput}
                                    onChange={handleChange}
                                    style={{display: 'none'}}/>
                                <span onClick={handleClick}>Выберите файл</span> или перетащите его сюда
                            </div>
                            <div className={styles.payment_file_place_description}>
                                Файлы не должны превышать 10 мб
                            </div>
                        </div>
                    ):(
                        <div className={styles.file_container}>
                            <div className={styles.file}>
                                <div className={styles.fileName}>{file.name}</div>
                                <div onClick={()=>setFile(null)} className={styles.trashIcon}>
                                    <img src={Trash} alt="trash"/>
                                </div>
                            </div>
                            <div onClick={openModal} className={styles.payment_button}>
                                Отправить
                            </div>
                        </div>
                    )}
                </>
            ):(
                <>
                    <div className={styles.payment_block_body_title}><h3>Ожидайте, идет проверка...</h3></div>
                    <div className={styles.payment_block_body_change_description}>
                        Мы проверим сведения о платеже и предоставим Вам весь функционал сервиса. Вы получите уведомление на указанную почту {userData.email}
                    </div>
                    <div className={styles.supportIcon}>
                        <img src={SupportIcon} alt="supportIcon"/>
                    </div>
                </>
            )}
        </div>
            </>
    )
};

export default PaymentCheckDownload;