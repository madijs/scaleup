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
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import NotificationService from "../../services/NotificationService";
import {returnDateFormat} from "../../tools/returnDateFormat";
import NotificationSystemIcon from "../../assets/icons/notificsystem.svg";
import Badge from '@material-ui/core/Badge';
import getMediaUrls from "../../tools/getMediaUrls";



const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
    root: {
        '& > *': {
            margin: theme.spacing(2),
        },
    },
}));

const AppHeader = ({userData,setMobileMenu}) => {
    const classes = useStyles();
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
            path: '/admin/payment/1',
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
            path: '/admin/questionnaire/tables',
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
    const [notifications,setNotifications] = useState(null);
    console.log(notifications)
    const [notificationCount,setNotificationCount] = useState(0);

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

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        const response = new NotificationService().getNotifications();
        response.then(res=>{
            setNotifications(res.data);
            let cnt = 0;
            for (let i=0;i<res.data.length;i++){
                if (res.data[i].status == '0'){
                    cnt++;
                }
            }
            setNotificationCount(cnt);
        })
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

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

    useEffect(()=>{
        const response = new NotificationService().getNotifications();
        response.then(res=>{
            setNotifications(res.data);
            let cnt = 0;
            for (let i=0;i<res.data.length;i++){
                if (res.data[i].status == '0'){
                    cnt++;
                }
            }
            setNotificationCount(cnt);
        })
    },[]);

    return(
        <>
            <header className={styles.header_container}>
                <div className={styles.header}>
                    <div className={styles.startHeader}>
                        <img className={styles.logo} onClick={()=>{
                            if (userData.roles[0].name === "client"){
                                history.push('/')
                            }else if (userData.roles[0].name === "admin" || userData.roles[0].name === "moderator" || userData.roles[0].name === "sale_department"){
                                history.push('/admin/payment/1')
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
                            <Badge
                                color={'secondary'}
                                badgeContent={notificationCount}
                            >
                                <img onClick={handleClick} src={Bell} alt="bell"/>
                            </Badge>
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                                style={{marginTop:'20px'}}
                            >
                                <div className={styles.notification_content}>
                                    <div className={styles.notification}>
                                        <div className={styles.head}>
                                            <div onClick={handleClose} className={styles.close}>
                                            </div>
                                            <div className={styles.title}>
                                                Уведомления
                                            </div>
                                        </div>
                                        <div className={styles.notification_body}>
                                        {notifications?.map((el,index)=>(
                                            <div key={index} style={el.status == 0 ? {backgroundColor:'rgba(222, 53, 11, 0.05)'} : {}} className={styles.notification_item}>
                                                <div className={styles.img}>
                                                    <img src={(el.from && el.from.avatar) ? getMediaUrls(el.from.avatar): NotificationSystemIcon} alt="sysyemicon"/>
                                                </div>
                                                <div className={styles.notification_item_content}>
                                                    <div className={styles.notification_item_message}>{el.message}</div>
                                                    <div className={styles.notification_item_date}>{returnDateFormat(el.created_at)}</div>
                                                </div>
                                                {el.status == 0 && (
                                                    <div style={{width:'5px',height:'5px',borderRadius:'50%',backgroundColor:'#FF494D',position:'absolute',top:'10px',right:'10px'}}>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                        </div>
                                    </div>
                                </div>
                            </Popover>
                        </div>
                        <div onClick={()=>setModalProfileOpen(!modalProfileOpen)} className={styles.profile} style={{cursor:"pointer"}}>
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