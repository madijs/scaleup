import React, {useEffect, useState} from 'react'
import styles from '../../assets/styles/OtherStyles/AppHeader.module.scss'
import Logo from '../../assets/icons/Logo.svg'
import Bell from '../../assets/icons/Bell.svg'
import {ReactComponent as DashboardIcon} from "../../assets/icons/dashboardIcon.svg";
import {ReactComponent as OplataIcon} from '../../assets/icons/oplataHeader.svg'
import {ReactComponent as AnketaIcon} from '../../assets/icons/anketaHeader.svg'
import {ReactComponent as ProizvodstvoIcon} from '../../assets/icons/proizvodstvoHeader.svg'
import {ReactComponent as DocumentsIcon} from '../../assets/icons/documentHeader.svg'
import {ReactComponent as SettingsIcon} from '../../assets/icons/settingsIcon.svg'
import LetterAvatar from "./Avatar";
import {useHistory} from "react-router-dom"
import {checkPathsForRoles} from "../../tools/checkPathsForRoles";
import {ReactComponent as Bottom} from "../../assets/icons/bottom.svg";
import {ReactComponent as Home} from "../../assets/icons/home.svg";
import {ReactComponent as Documents} from "../../assets/icons/documentHeader.svg";
import {ReactComponent as Payments} from "../../assets/icons/payments.svg";
import MenuBtn from "../../assets/icons/menulines.svg"

const AppHeader = ({userData,setMobileMenu}) => {
    const history = useHistory();
    const [modalProfileOpen,setModalProfileOpen] = useState(false);
    const [path,setPath] = useState([
        {
          icon: <DashboardIcon width={"100%"} height={"100%"}/>,
          title:"",
          active: false,
          path: "/admin/dashboard",
          access: ['admin']
        },
        {
            icon: <OplataIcon width={"100%"} height={"100%"}/>,
            title: "Оплата",
            active: true,
            path: '/admin',
            access: ['sale_department','admin','moderator']
        },
        // {
        //     icon: <AnketaIcon width={"100%"} height={"100%"}/>,
        //     title: "Анкета",
        //     active: false,
        //     path: '/admin/questionnaire',
        //     access: ['moderator','admin']
        // },
        {
            icon: <AnketaIcon width={"100%"} height={"100%"}/>,
            title: "Анкета",
            active: false,
            path: '/admin/questionnaire',
            access: ['moderator','admin','editor','financier','lawyer','marketer']
        },
        {
            icon: <ProizvodstvoIcon width={"100%"} height={"100%"}/>,
            title: "Производство",
            active: false,
            path: '/admin/production',
            access: ['admin','moderator','editor','financier','lawyer','marketer']
        },
            {
                icon: <DocumentsIcon width={"100%"} height={"100%"}/>,
                title: "Документы",
                    active: false,
                path: '/admin/documents',
                access: ['admin','moderator','editor','financier','lawyer','marketer']
            },
        {
            icon: <SettingsIcon width={"100%"} height={"100%"}/>,
            title: "Настройки",
            active: false,
            path: '/admin/settings',
            access: ['admin']
        }
    ]);

    const [clientPath,setClientPath] = useState([
        {
            icon: <Home width={"100%"} height={"100%"}/>,
            title: "Главная",
            active: true,
            path: "/"
        },
        {
            icon: <Documents width={"100%"} height={"100%"}/>,
            title: "Мои документы",
            active: false,
            path: "/my-documents"
        },
        {
            icon: <Payments width={"100%"} height={"100%"}/>,
            title: "Мои платежи",
            active: false,
            path: "/my-payments"
        }
    ]);

    useEffect(()=>{
        const copy = [...path];
        for (let i=0;i<path.length;i++){
            if (history.location.pathname === path[i].path){
                copy[i].active = true;
            }else{
                copy[i].active = false;
            }
        }
        setPath(copy);
    },[]);

    const changePage = (title) => {
        const copy = [...path];
        let active = '';
        for (let i=0;i<path.length;i++){
            copy[i].active = title === path[i].title;
            if (copy[i].active){
                active = i;
            }
        }
        setPath(copy);
        history.push(copy[active].path);
    };

    const changeClientPage = (index) => {
        const copy = [...clientPath];
        for (let i=0;i<clientPath.length;i++){
            copy[i].active = index === i;
        }
        setClientPath(copy);
        history.push(copy[index].path);
    };

    return(
        <>
            <header className={styles.header_container}>
                <div className={styles.header}>
                    <div className={styles.startHeader}>
                        <img className={styles.logo} onClick={()=>{
                            if (userData.roles[0].name === "client"){
                                history.push('/')
                            }else if (userData.roles[0].name === "admin" || userData.roles[0].name === "moderator" || userData.roles[0].name === "sale_department"){
                                history.push('/admin')
                            }else{
                                history.push('/admin/production')
                            }

                        }} src={Logo} alt="logo"/>
                    </div>
                    {userData.roles[0].name !== 'client' && (
                        <>
                            {userData.roles[0].name !== 'sale_department' && (
                                <div className={styles.centerHeader_container}>
                                    {checkPathsForRoles(path,userData.roles[0].name).map((el,index)=>(
                                        <div className={styles.centerHeader}>
                                            <div onClick={changePage.bind(this, el.title)} key={index} className={styles.headerTitle}>
                                                <div className={el.active ? `${styles.headerTitle_logo} ${styles.active}` : `${styles.headerTitle_logo}`}>
                                                    {el.icon}
                                                </div>
                                                <div className={el.active ? `${styles.headerTitle_title} ${styles.active}` : `${styles.headerTitle_title}`}>
                                                    {el.title}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {(userData.roles[0].name === "client" && userData.payment) && (
                        <>
                        <div className={styles.centerHeader_container}>
                        {userData.payment.payment_status_id == 3 && (
                                <div className={styles.centerHeader}>
                                    {clientPath.map((el,index)=>(
                                        <div onClick={changeClientPage.bind(this, index)} key={index} className={styles.headerTitle}>
                                            <div className={el.active ? `${styles.headerTitle_logo} ${styles.active}` : `${styles.headerTitle_logo}`}>
                                                {el.icon}
                                            </div>
                                            <div className={el.active ? `${styles.headerTitle_title} ${styles.active}` : `${styles.headerTitle_title}`}>
                                                {el.title}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        </>
                    )}
                    <div className={styles.endHeader}>
                        <div className={styles.notificationIcon}>
                            <img src={Bell} alt="bell"/>
                        </div>
                        <div className={styles.profile} style={{cursor:"pointer"}}>
                            <LetterAvatar
                                name={userData.fio}
                            />
                            <Bottom onClick={()=>setModalProfileOpen(!modalProfileOpen)}/>
                        </div>
                        <div onClick={()=>setMobileMenu(true)} className={styles.mobile_menu_btn}>
                            <img src={MenuBtn} alt="menu"/>
                        </div>
                    </div>
                    {modalProfileOpen && (
                        <div className={styles.modalProfile}>
                            <div style={{borderBottom: '1px solid #cccccc' }} onClick={()=>{
                                history.push('/profile');
                                setModalProfileOpen(false);
                            }} className={styles.block}>
                                <span>Перейти в профиль</span>
                            </div>
                            <div onClick={()=>{
                                localStorage.clear();
                                window.location.href = '/'
                            }} className={styles.block}>
                                <span>Выйти из аккаунта</span>
                            </div>
                        </div>
                    )}
                </div>

            </header>
        </>
    )
};

export default AppHeader;