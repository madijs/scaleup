import React, {useEffect, useState} from "react";
import styles from "../../assets/styles/AdminStyles/QuestionnaireBlocksPage.module.scss"
import GoBack from "../../components/OtherComponents/GoBack";
import Icon1 from '../../assets/icons/mainIcon1.svg'
import Icon2 from '../../assets/icons/mainIcon2.svg'
import Icon3 from '../../assets/icons/mainIcon3.svg'
import Icon4 from '../../assets/icons/mainIcon4.svg'
import QuestionnaireBlockItem from "../../components/AdminComponents/QuestionnaireBlockItem";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getCurrentQuestionnaireAction} from "../../redux/actions/getCurrentQuestionnaireAction";
import Modal from "react-modal";
import CompanyInfoModal from "../../components/AdminComponents/CompanyInfoModal";
import {returnDateFormat} from "../../tools/returnDateFormat";
import AdminService from "../../services/AdminService";
import ErrorPopupModal from "../../components/OtherComponents/ErrorPopupModal";


const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        borderRadius          : '32px',
        padding               : 0
    }
};


const QuestionnaireBlocksPage = () => {
    const [modalIsOpen,setOpen] = useState(false);
    const [gotovoModal,setGotovo] = useState(false);
    const [gotovoModalData,setGotovoData] = useState(null);

    const {id} = useParams();
    const dispatch = useDispatch();
    const {currentItemData} = useSelector(state => state.QuestionnairePage);
    const [sections, setSections] = useState([
        {
            id:1,
            icon: Icon1,
            title: "Стратегический раздел",
            count: 20,
            status: "Сохранено",
            name:"",
            percent: 0
        },
        {
            id:2,
            icon: Icon2,
            title: "Финансовый раздел",
            count: 20,
            status: "Сохранено",
            name:"",
            percent: 0
        },
        {
            id:3,
            icon: Icon3,
            title: "Юридический раздел",
            count: 20,
            status: "Сохранено",
            name:"",
            percent: 0
        },
        {
            id:4,
            icon: Icon4,
            title: "Маркетинговый раздел",
            count: 20,
            status: "Сохранено",
            name:"",
            percent: 0
        }
    ]);

    useEffect(() => {
        dispatch(getCurrentQuestionnaireAction(id))
    }, []);

    useEffect(()=>{
        if (currentItemData){
            console.log(currentItemData);
            const copy = [...sections];
            copy[0].count = currentItemData[0].forms_count;
            copy[0].percent = Math.ceil(currentItemData[0].answers_count / currentItemData[0].forms_count * 100);
            copy[0].name = currentItemData[0].name;
            copy[0].status = currentItemData[0].status;
            copy[1].count = currentItemData[1].forms_count;
            copy[1].percent = Math.ceil(currentItemData[1].answers_count / currentItemData[1].forms_count * 100);
            copy[1].status = currentItemData[1].status;
            copy[1].name = currentItemData[1].name;

            copy[2].count = currentItemData[2].forms_count;
            copy[2].percent = Math.ceil(currentItemData[2].answers_count / currentItemData[2].forms_count * 100);
            copy[2].status = currentItemData[2].status;
            copy[2].name = currentItemData[2].name;

            copy[3].count = currentItemData[3].forms_count;
            copy[3].percent = Math.ceil(currentItemData[3].answers_count / currentItemData[3].forms_count * 100);
            copy[3].status = currentItemData[3].status;
            copy[3].name = currentItemData[3].name;
            setSections(copy);
        }
    },[currentItemData]);

    const handleOpen = () => {
        setOpen(true)
    };

    const closeModal = () => {
        setOpen(false);
    };

    const openGotovoModal = () => {
        setGotovo(true);
        setGotovoData({
            type: "pending",
            title: "Загрузка",
            text: "Идет проверка данных"
        })
    };

    const closeGotovoModal = () => {
        setGotovo(false);
    };

    return (
        <>
            {currentItemData && (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <CompanyInfoModal
                        companyName={currentItemData[0].payment.user.company}
                        address={null}
                        branch={null}
                        fio={currentItemData[0].payment.user.fio}
                        phone={currentItemData[0].payment.user.phone}
                        email={currentItemData[0].payment.user.email}
                        tarif={currentItemData[0].payment.service.name}
                        registration_date={returnDateFormat(currentItemData[0].payment.user.created_at)}
                        file={currentItemData[0].payment.invoice ? currentItemData[0].payment.invoice.link : null}
                        status={currentItemData[0].payment.payment_status.id}
                        payment_type={currentItemData[0].payment.payment_type.id}
                        closeModal={closeModal}
                    />
                </Modal>
            )}
            <Modal
                isOpen={gotovoModal}
                onRequestClose={closeGotovoModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <ErrorPopupModal closePopupHandleChange={closeGotovoModal} data={gotovoModalData}/>
            </Modal>
            <div className={styles.container}>
                <div className={styles.blocks_container}>
                    <div className={styles.blocks_header}>
                        <GoBack
                            title={currentItemData && currentItemData[0].payment.user.company}
                            subtitle="Детали компании"
                        />
                        <div onClick={handleOpen} className={styles.info_btn}>
                            Инфо о компании
                        </div>
                    </div>
                    {/*<div className={styles.status_block}>*/}
                    {/*    <div className={styles.changeStatus_txt}>*/}
                    {/*        Чтобы отправить компанию на след. этап “Произдводство” нажмите на “Готово”*/}
                    {/*    </div>*/}
                    {/*    <div onClick={()=>{*/}
                    {/*        openGotovoModal();*/}
                    {/*        const response = new AdminService().acceptQuestionnaire(currentItemData[0].worksheet.id);*/}
                    {/*        response.then(res=>{*/}
                    {/*            console.log(res);*/}
                    {/*            setGotovoData({*/}
                    {/*                type: "success",*/}
                    {/*                title: "Отлично!",*/}
                    {/*                text: "Данные успешно отрпавлены на этап производства!"*/}
                    {/*            })*/}
                    {/*        }).catch(err=>{*/}
                    {/*            setGotovoData({*/}
                    {/*                type: "error",*/}
                    {/*                title: "Упс!",*/}
                    {/*                text: "Произошла ошибка!"*/}
                    {/*            })*/}
                    {/*        })*/}
                    {/*    }} className={styles.changeStatus_btn}>*/}
                    {/*        Готово*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className={styles.mainPageBlocks}>
                        {sections && sections.map((el, index) => (
                            <QuestionnaireBlockItem
                                user_id={id}
                                id={el.id}
                                key={index}
                                icon={el.icon}
                                count={el.count}
                                name={el.name}
                                status={el.status}
                                percent={el.percent}
                                type={"questionnaire"}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
};

export default QuestionnaireBlocksPage;