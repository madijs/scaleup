import React, {useEffect, useState} from "react";
import styles from "../../../assets/styles/AdminStyles/AdminSettingsTable.module.scss";
import AdminSettingsTableContent from "./AdminSettingsTableContent";
import AdminSettingsTableTitle from "./AdminSettingsTableTitle";
import Modal from "react-modal";
import CreateAndEditModal from "./CreateAndEditModal";
import SettingsService from "../../../services/SettingsService";
import DeleteModal from "./DeleteModal";
import ServiceModalSettings from "./ServiceModalSettings";
import ErrorPopupModal from "../../OtherComponents/ErrorPopupModal";


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

const AdminSettingsTable = ({active, count = 0, data = []}) => {
    const [txt,setTxt] = useState('');
    const [modalIsOpen,setOpen] = useState(false);
    const [selectedUserForm,setSelectedUserForm] = useState(null);
    const [tableTitle] = useState({
        1: {
            title: "Системные пользователи",
            description: "Общее количество пользователей:",
            data: ["фио", "email", "роль"],
        },
        2: {
            title: "Тарифы",
            description: "Общее количество пользователей:",
            data: ["тип тарифа", "стоимость", "кол. рабочих дней"],
        },
        5: {
            title: "Пользователи",
            description: "Общее количество пользователей:",
            data: ["ФИО", "Компания", "email", "телефон"],
        }
    });
    const [rolesList,setRoles] = useState([]);
    const [client,setClient] = useState(null);

    const openModal = (name=null) => {
        console.log(name);
        if (name === 'client'){
            setTxt("Редактирование");
            setClient(true);
        }else {
            setTxt("Добавление");
            setClient(false);
        }
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
        setSelectedUserForm(null);
    };

    useEffect(()=>{
        const response = new SettingsService().getWorkersRolesList();
        response.then(res=>{
            console.log(res);
            setRoles(res.data)
        });
    },[]);

    const [deleteModalIsOpen,setDeleteModalIsOpen] = useState(false);

    const openDeleteModal = () => {
        setDeleteModalIsOpen(true);
    };
    const closeDeleteModal = () => {
        setDeleteModalIsOpen(false);
    };


    const [serviceModalOpen,setServiceModalOpen] = useState(false);

    const openServiceModal = () => {
        setServiceModalOpen(true)
    };

    const closeServiceModal = () => {
        setServiceModalOpen(false)
    };

    const [errorPopup,setErrorPopup] = useState({
        status: false,
        data: null
    });

    const openPopupHandleChange = (data) => {
        setErrorPopup({
            status: true,
            data: data
        });
    };

    const closePopupHandleChange = () => {
        setErrorPopup({
            status: false,
            data: null
        });
    };


    return (
        <>
            <Modal
                isOpen={errorPopup.status}
                onRequestClose={closePopupHandleChange}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <ErrorPopupModal closePopupHandleChange={closePopupHandleChange} data={errorPopup.data}/>
            </Modal>
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <CreateAndEditModal
                    txt={txt}
                    openPopupHandleChange={openPopupHandleChange}
                    setSelectedUserForm={setSelectedUserForm}
                    selectedUserForm={selectedUserForm}
                    rolesList={client ? null :rolesList}
                    closeModal={closeModal}/>
            </Modal>
            <Modal
                isOpen={deleteModalIsOpen}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <DeleteModal
                    title={"Удаление пользователя"}
                    id={selectedUserForm ? selectedUserForm.id : null}
                    text={`Вы точно хотите удалить пользователя ${selectedUserForm && selectedUserForm.fio}`}
                    closeDeleteModal={closeDeleteModal}
                />
            </Modal>
            <Modal
                isOpen={serviceModalOpen}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <ServiceModalSettings
                    data={selectedUserForm}
                    closeServiceModal={closeServiceModal}
                />
            </Modal>

            <div className={styles.container}>
                <div className={styles.table}>
                    <div className={styles.table_header}>
                        <div className={styles.filter}>
                            <div className={styles.filter_title}>{tableTitle[active].title}</div>
                            <div className={styles.filter_description}>{tableTitle[active].description} {count}</div>
                        </div>
                        {active === 1 && (
                            <div onClick={openModal} className={styles.add_btn}>
                                Добавить
                            </div>
                        )}
                    </div>
                    <div className={styles.admin_table_title}>
                        <table rules="none">
                            <AdminSettingsTableTitle data={tableTitle[active].data}/>
                            <AdminSettingsTableContent
                                openDeleteModal={openDeleteModal}
                                openModal={openModal}
                                openServiceModal={openServiceModal}
                                setSelectedUserForm={setSelectedUserForm}
                                active={active}
                                data={data}/>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
};
export default AdminSettingsTable;