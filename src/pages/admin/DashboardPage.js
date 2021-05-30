import React, {useEffect, useState} from "react";
import styles from "../../assets/styles/AdminStyles/DashboardPage.module.scss";
import AdminService from "../../services/AdminService";


const DashboardPage = () => {

    const [data,setData] = useState(null);

    const [colors] = useState([
      '#F2F6FC','#F1F9F7','#FFFAF4','#FFF7F6','#F6F6FB','#FFFBFC'
    ]);

    useEffect(()=>{
        const response = new AdminService().getDashboard();
        response.then(res=>{
            console.log(res.data);
            setData(res.data)
        })
    },[]);

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                Dashboard
            </div>
            <div className={styles.widjets_list}>
                {data && data.registred && (
                    <div className={styles.widjet}>
                        <div className={styles.widjet_content}>
                            <div className={styles.widjet_title}>
                                регистрация
                            </div>
                            <div className={styles.widjet_count}>
                                {data.registred}
                            </div>
                            <div className={styles.widjet_description}>
                                Общее количество зарегистрированных компании
                            </div>
                        </div>
                    </div>
                )}
                    <div className={styles.widjet}>
                        <div className={styles.widjet_content}>
                            <div className={styles.widjet_title}>
                                За последний месяц
                            </div>
                            <div className={styles.widjet_count}>
                                {data?.registred_last_month}
                            </div>
                            <div className={styles.widjet_description}>
                                Зарегистрированных компании за {new Date().getDate()}.{new Date().getMonth()}.{new Date().getFullYear()} - {new Date().getDate()}.{new Date().getMonth()+1}.{new Date().getFullYear()}
                                {/*Зарегистрированных компании за 13.03.2021-13.02.2021*/}
                            </div>
                        </div>
                    </div>
                <div className={styles.widjet}>
                    <div className={styles.widjet_content}>
                        <div className={styles.widjet_title}>
                            Франшизы
                        </div>
                        <div className={styles.widjet_count}>
                            {data?.ready}
                        </div>
                        <div className={styles.widjet_description}>
                            Общее количество
                            выданных франшиз
                        </div>
                    </div>
                </div>
                <div className={styles.widjet}>
                    <div className={styles.widjet_content}>
                        <div className={styles.widjet_title}>
                            В работе
                        </div>
                        <div className={styles.widjet_count}>
                            {data?.not_ready}
                        </div>
                        <div className={styles.widjet_description}>
                            Общее количество компаний в работе
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.dashboard}>
                <div className={styles.flex}>
                <div className={styles.dashboard_list}>
                    <div className={styles.content}>
                        <div className={styles.dashboard_list_title}>
                            новые компании
                        </div>
                        <div className={styles.dashboard_list_count}>
                            {data && data.payment_waiting ? data.payment_waiting : "-"}
                        </div>
                        <div className={styles.dashboard_list_description}>
                            Ожидается оплата
                        </div>
                        <div className={styles.dashboard_list_content}>
                            <div className={styles.dashboard_list_content_title}>
                                компании по тарифам
                            </div>
                            <div className={styles.dashboard_list_content_list}>
                                {data && data.payment_types && data.payment_types.map((el,index)=>(
                                    <div className={styles.dashboard_list_content_list_item}>
                                        <div className={styles.dashboard_list_content_list_item_title}>
                                            {el.name}
                                        </div>
                                        <div className={styles.dashboard_list_content_list_item_count}>
                                            {el.users_count}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                    <div className={styles.dashboard_content}>
                        <div className={styles.content}>
                            <div className={styles.title}>
                                компании по отраслям
                            </div>
                            <div className={styles.grids}>
                                {data && data.industries && data.industries.map((el,index)=>(
                                    <div style={{backgroundColor: colors[index] ? colors[index] : colors[0]}} className={styles.grid_item}>
                                        <div className={styles.grid_item_title}>{el.name}</div>
                                        <div className={styles.grid_item_count}>{el.users_count}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DashboardPage