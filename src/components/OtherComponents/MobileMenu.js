import React, {useState} from "react";
import styles from "../../assets/styles/MobileMenu.module.scss";
import {ReactComponent as Home} from "../../assets/icons/home.svg";
import {ReactComponent as Documents} from "../../assets/icons/documentHeader.svg";
import {ReactComponent as Payments} from "../../assets/icons/payments.svg";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
const MobileMenu = ({setMobileMenu}) => {

    const history = useHistory();
    const {userData} = useSelector(state => state.AuthPage);

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
        },
        {
            icon: <Home width={"100%"} height={"100%"}/>,
            title: "Мой профиль",
            active: false,
            path: "/profile"
        }
    ]);

    const changeClientPage = (index) => {
        const copy = [...clientPath];
        for (let i=0;i<clientPath.length;i++){
            copy[i].active = index === i;
        }
        setClientPath(copy);
        setMobileMenu(false);
        history.push(copy[index].path);
    };

    return(
        <div className={styles.container}>
            <div onClick={() => setMobileMenu(false)} className={styles.close}/>
            <div className={styles.mobileMenu}>
                <div onClick={changeClientPage.bind(this,0)} className={styles.title}>
                    <div className={styles.title_logo}>{clientPath[0].icon}</div>
                    <div className={styles.title_text}>{clientPath[0].title}</div>
                </div>
                {(userData.roles[0].name === "client" && userData.payment) && (
                    <>
                        {clientPath.slice(1).map((el,index)=>(
                            <div onClick={changeClientPage.bind(this,index+1)} key={index} className={styles.title}>
                                <div className={styles.title_logo}>{el.icon}</div>
                                <div className={styles.title_text}>{el.title}</div>
                            </div>
                        ))}
                    </>
                )}
                <div onClick={()=>{
                    localStorage.clear();
                    window.location.href = '/'
                }}  className={styles.exit}>Выйти</div>
            </div>
        </div>
    )
};
export default MobileMenu;