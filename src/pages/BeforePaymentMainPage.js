import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import ModalCard from "../components/PaymentComponents/ModalCard";
import styles from "../assets/styles/MainStyles/MainPage.module.scss";
import MainFirstItem from "../components/MainComponents/MainFirstItem";
import MainSecondItem from "../components/MainComponents/MainSecondItem";
import MainThirdItem from "../components/MainComponents/MainThirdItem";
import Faq from "../components/FaqComponents/Faq";
import {useSelector} from "react-redux";
import MainService from "../services/MainService";
import BlockItem from "../components/MainComponents/BlockItem";
import Slider from "react-slick";
import '../assets/styles/Slider.css';
import {useHistory} from "react-router-dom";
import SaveBtn from "../components/OtherComponents/SaveBtn";


const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        // marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        borderRadius          : '32px',
        padding               : 0,
    }
};
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "linear",
    initialSlide: 1,
    arrows:false,
};
const BeforePaymentMainPage = () => {
    const history = useHistory();
    const [blockInfo,setBlock] = useState(null);
    const [servicesInfo,setServices] = useState({
        firstService: null,
        secondService: null,
        thirdService: null
    });
    const [modalIsOpen,setIsOpen] = useState(false);
    const {userData} = useSelector(state => state.AuthPage);
    const [selectedService,setSelectedService] = useState('');

    function openModal(num) {
        setSelectedService(num);
        setIsOpen(true);
    }

    function closeModal(){
        setIsOpen(false);
    }

    useEffect(()=>{
        const response = new MainService().getBlock();
        response.then(res=>{
            setBlock(res.data);
        }).catch(err=>{
            console.log(err)
        });

        const services = new MainService().getServices();
        services.then(res=>{
            const copyService = {services};
            copyService.firstService = res.data[0];
            copyService.secondService = res.data[1];
            copyService.thirdService = res.data[2];
            setServices(copyService);
        }).catch(err=>{
            console.log(err)
        })
    },[]);




    return(
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <ModalCard selectedService={selectedService} closeModal={closeModal}/>
            </Modal>
            <div className={styles.mainPageContainer}>
                <div className={styles.container}>
                    {(userData && userData.payment) && (
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <div className={styles.title}>Привет, {userData.fio}</div>
                        {(userData.payment.payment_type_id == '2' && userData.payment.payment_status_id == '1') && (
                            <div onClick={()=>history.push('/payment')} className={styles.btn_redirect}>
                                Страница оплаты
                            </div>
                        )}
                        {userData.payment.payment_status_id == '2' && (
                            <div onClick={()=>history.push('/payment')} className={styles.btn_redirect}>
                                Страница оплаты
                            </div>
                        )}
                    </div>
                    )}
                    {(!userData.payment || (userData.payment && userData.payment.payment_status_id !==2)) && (
                        <div className={styles.subtitle}>
                            Выберите тариф и оплатите, чтобы получить полный доступ ко всем функциям
                        </div>
                    )}
                    {userData.payment && userData.payment.payment_status_id === 2 && (
                        <div className={styles.subtitle}>
                            Мы проверим сведения о платеже и предоставим Вам весь функционал сервиса
                        </div>
                    )}

                    {blockInfo && (
                        <BlockItem blockInfo={blockInfo}/>
                    )}
                    <div className={styles.service_block}>
                        <div className={styles.service_title}>
                            Получите новый поток прибыли от существующего бизнеса
                        </div>
                        <div className={styles.service_description}>
                            Выберите подходящий тариф и мы подготовим франшизу вашего бизнеса для продажи
                        </div>
                        <div className={styles.service_elements}>
                            {servicesInfo.firstService && (
                                <MainFirstItem
                                    disabled={(userData.payment && userData.payment.payment_status_id==2) ? true : false}
                                    info={servicesInfo.firstService}
                                    openModal={openModal}/>
                            )}
                            {servicesInfo.secondService && (
                                <MainSecondItem
                                    disabled={(userData.payment && userData.payment.payment_status_id==2) ? true : false}
                                    info={servicesInfo.secondService}
                                    openModal={openModal}/>
                            )}
                            {servicesInfo.thirdService && (
                                <MainThirdItem
                                    disabled={(userData.payment && userData.payment.payment_status_id==2) ? true : false}
                                    info={servicesInfo.thirdService}
                                    openModal={openModal}/>
                            )}
                        </div>
                        <div className={styles.slider}>
                            <Slider {...settings}>
                                {servicesInfo.firstService && (
                                    <MainFirstItem
                                        disabled={(userData.payment && userData.payment.payment_status_id==2) ? true : false}
                                        info={servicesInfo.firstService}
                                        openModal={openModal}/>
                                )}
                                {servicesInfo.secondService && (
                                    <MainSecondItem
                                        disabled={(userData.payment && userData.payment.payment_status_id==2) ? true : false}
                                        info={servicesInfo.secondService}
                                        openModal={openModal}/>
                                )}
                                {servicesInfo.thirdService && (
                                    <MainThirdItem
                                        disabled={(userData.payment && userData.payment.payment_status_id==2) ? true : false}
                                        info={servicesInfo.thirdService}
                                        openModal={openModal}/>
                                )}
                            </Slider>
                        </div>
                    </div>
                </div>
                <Faq/>
            </div>
        </>
    )
};

export default BeforePaymentMainPage;