import React, {useEffect, useState} from "react";
import AdminTitle from "../../components/AdminComponents/AdminTitle";
import AdminTabs from "../../components/AdminComponents/AdminTabs";
import PaymentTable from "../../components/AdminComponents/PaymentTable";
import {getPaymentTableAction} from "../../redux/actions/getPaymentTableAction";
import {useDispatch, useSelector} from "react-redux";
import {useHistory,useLocation,useParams} from "react-router-dom";
import Modal from "react-modal";
import PaymentInfoModal from "../../components/AdminComponents/PaymentInfoModal";
import {Route} from 'react-router-dom'

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

const AdminPage = () => {
    const history = useHistory();
    const location = useLocation();
    const {userData} = useSelector(state => state.AuthPage);
    const dispatch = useDispatch();
    const {id} = useParams();
    const [modalIsOpen,setOpen] = useState(false);
    const {card_paid_data,invoice_paid_data,dont_paid_data,status} = useSelector(state => state.AdminPage);
    const [active,setActive] = useState(localStorage.getItem('payment_tab') ? localStorage.getItem('payment_tab') : 1);
    const [info,setInfo] = useState(null);

    useEffect(()=>{
        document.title = "ScaleUp | Оплата";
        dispatch(getPaymentTableAction())
    },[]);

    const openModal = (info) => {
        setInfo(info);
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false)
    };

    useEffect(()=>{
        let bool = false;
        if (userData.roles[0].name !== "moderator" || userData.roles[0].name !== "sale_department" || userData.roles[0].name !== "admin"){
            bool = true
        }
        if (!bool){
            history.push('/admin/production')
        }

    },[]);

    useEffect(()=>{
        if (id === '1'){
            setActive(1)
        }else if (id === '2'){
            setActive(2)
        }else if (id === '3'){
            setActive(3)
        }
    },[location.pathname]);


    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <PaymentInfoModal
                    info={info}
                    closeModal={closeModal}
                />
            </Modal>
            <div style={{backgroundColor: "#f9f9f9",paddingTop:20, height: '100vh'}}>
                <AdminTitle
                    title={"Оплата"}
                    description={"Общее количество компании:"}
                    count={card_paid_data.length+invoice_paid_data.length+dont_paid_data.length}
                />
                <AdminTabs
                    card_paid_count={card_paid_data.length}
                    invoice_paid_count={invoice_paid_data.length}
                    dont_paid_count={dont_paid_data.length}
                    setActive={setActive}
                    active={active}
                />
                <PaymentTable
                    openModal={openModal}
                    active={active}
                    status={status}
                    dont_paid_data={dont_paid_data}
                    invoice_paid_data={invoice_paid_data}
                    card_paid_data={card_paid_data}
                />
            </div>
        </>
    )
};

export default AdminPage;