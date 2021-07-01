import React, {useEffect, useState} from "react";
import styles from "../../assets/styles/AdminStyles/ProductionStyles/ProductionBlocksPage.module.scss";
import Icon1 from '../../assets/icons/mainIcon1.svg'
import Icon2 from '../../assets/icons/mainIcon2.svg'
import Icon3 from '../../assets/icons/mainIcon3.svg'
import Icon4 from '../../assets/icons/mainIcon4.svg'
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import Modal from "react-modal";
import CompanyInfoModal from "../../components/AdminComponents/CompanyInfoModal";
import {getCurrentProductionAction} from "../../redux/actions/getCurrentProductionAction";
import {returnDateFormat} from "../../tools/returnDateFormat";
import GoBack from "../../components/OtherComponents/GoBack";
import ProductionBlockItem from "../../components/AdminComponents/ProductionBlockItem";
import {useHistory} from "react-router-dom";
import axios from "../../plugins/axios"
import ErrorPopupModal from "../../components/OtherComponents/ErrorPopupModal";
import AdminService from "../../services/AdminService";

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
const ProductionBlocksPage = () => {
    const {userData} = useSelector(state=>state.AuthPage);
    const [modalIsOpen,setOpen] = useState(false);
    const dispatch = useDispatch();
    const {id} = useParams();
    const {currentItemData} = useSelector(state => state.ProductionPage);
    const [sections, setSections] = useState(null);


    useEffect(()=>{
        dispatch(getCurrentProductionAction(id));

    },[]);

    useEffect(()=>{
        if (currentItemData!==null) {
            let base = [
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
            ];
            const copy = [...base];
            let arr = [];
            for (let i=0;i<currentItemData.length;i++){
                if (1 == currentItemData[i].id){
                    copy[0].count = currentItemData[i].forms_count;
                    copy[0].percent = Math.ceil(currentItemData[i].answers_count / currentItemData[i].forms_count * 100);
                    copy[0].name = currentItemData[i].name;
                    copy[0].status = currentItemData[i].status;
                    arr.push(copy[0]);
                }
                if (2 == currentItemData[i].id){
                    console.log(copy);
                    console.log(copy[1]);
                    copy[1].count = currentItemData[i].forms_count;
                    copy[1].percent = Math.ceil(currentItemData[i].answers_count / currentItemData[i].forms_count * 100);
                    copy[1].status = currentItemData[i].status;
                    copy[1].name = currentItemData[i].name;
                    arr.push(copy[1]);
                }
                if (3 == currentItemData[i].id){
                    copy[2].count = currentItemData[i].forms_count;
                    copy[2].percent = Math.ceil(currentItemData[i].answers_count / currentItemData[i].forms_count * 100);
                    console.log(copy[2])
                    console.log(currentItemData)
                    copy[2].status = currentItemData[i].status;
                    copy[2].name = currentItemData[i].name;
                    arr.push(copy[2]);
                }
                if (4 == currentItemData[i].id){
                    copy[3].count = currentItemData[i].forms_count;
                    copy[3].percent = Math.ceil(currentItemData[i].answers_count / currentItemData[i].forms_count * 100);
                    copy[3].status = currentItemData[i].status;
                    copy[3].name = currentItemData[i].name;
                    arr.push(copy[3]);
                }
            }
            console.log(arr);
            setSections(arr);
        }
    },[currentItemData]);


    const handleOpen = () => {
        setOpen(true)
    };

    const closeModal = () => {
        setOpen(false);
    };

    const [popUp,setPopUp] = useState(false);
    const [sendErrorData,setSendErrorData] = useState(null);

    const sendDocuments = (id) => {
        axios.get(`/productions/ready/${id}`).then(res=>{
            setPopUp(true);
            setSendErrorData({
                type: 'success',
                title:"Успешно",
                text: 'Документы успешно отправлены. Через 10 минут они появятся на этапе "Производства".'
            });
        }).catch(err=>{
            setPopUp(true);
            setSendErrorData({
                type: 'error',
                title: "Упс!",
                text: err.response.data.message
            })
        })
    };


    return(
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
                isOpen={popUp}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <ErrorPopupModal closePopupHandleChange={()=>setPopUp(false)} data={sendErrorData}/>
            </Modal>
            <div className={styles.container}>
                <div className={styles.blocks_container}>
                    <div className={styles.blocks_header}>
                        <GoBack
                            title={currentItemData && currentItemData[0].payment.user.company}
                            subtitle="Детали компании"
                        />
                        <div className={styles.save_btns}>
                            {userData && (userData.roles[0].name === 'moderator' || userData.roles[0].name === 'admin') && (
                                <div
                                    onClick={()=>sendDocuments(currentItemData[0].prodction.id)}
                                    style={{background:"#FF494D",color:"#fff",marginRight:10}}
                                    className={styles.info_btn}
                                >
                                    Готово
                                </div>
                            )}
                            {/*{userData && (userData.roles[0].name === 'moderator' || userData.roles[0].name === 'admin') && (*/}
                            {/*    <div*/}
                            {/*        onClick={()=> history.push(`/preview-document/${id}`)}*/}
                            {/*        style={{background:"#FF494D",color:"#fff",marginRight:10}}*/}
                            {/*        className={styles.info_btn}*/}
                            {/*    >*/}
                            {/*        Просмотреть документы*/}
                            {/*    </div>*/}
                            {/*)}*/}
                            <div onClick={handleOpen} className={styles.info_btn}>
                                Инфо о компании
                            </div>
                        </div>
                    </div>
                    <div className={styles.mainPageBlocks}>
                        {sections && sections.map((el, index) => (
                            <ProductionBlockItem
                                id={el.id}
                                key={index}
                                icon={el.icon}
                                count={el.count}
                                name={el.name}
                                status={el.status}
                                percent={el.percent}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
};
export default ProductionBlocksPage;