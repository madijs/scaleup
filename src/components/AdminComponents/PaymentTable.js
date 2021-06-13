import React, {useEffect, useState} from "react";
import styles from '../../assets/styles/AdminStyles/PaymentTable.module.scss'
import {ReactComponent as FilterIcon} from "../../assets/icons/filterIcon.svg";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AdminTableTitle from "./AdminTableTitle";
import AdminTableContent from "./AdminTableContent";
import {SUCCESS} from "../../types/types";
import FilterComponent from "../OtherComponents/FIlterComponent";



const PaymentTable = ({dont_paid_data,invoice_paid_data,card_paid_data,active,status,openModal}) => {
    const [open, setOpen] = React.useState(false);
    const [sort, setSort] = React.useState('Наименованию');
    const [updown,setUpDown] = useState('up');

    const [dnt_paid,setDntPaid] = useState(dont_paid_data);
    const [inv_paid,setInvPaid] = useState(invoice_paid_data);
    const [crd_paid,setCrdPaid] = useState(card_paid_data);

    const [sortBy] = useState([
        "Наименованию",
        "Номеру телефона",
        "По email",
        "По дате"
    ]);

    useEffect(()=>{
        console.log('setter');
        setDntPaid(dont_paid_data);
        setCrdPaid(card_paid_data);
        setInvPaid(invoice_paid_data);
    },[dont_paid_data,card_paid_data,invoice_paid_data]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setSort(event.target.value);
        if (updown === 'up'){
            if (active === 1){
                if (event.target.value === "Наименованию"){
                    dnt_paid.sort(function(a, b){
                        if(a.user.company.toLowerCase() < b.user.company.toLowerCase()) {
                            return -1; }
                        if(a.user.company.toLowerCase() > b.user.company.toLowerCase()) {
                            return 1; }
                        return 0;
                    });
                    setDntPaid(dnt_paid);
                }else if (event.target.value === "Номеру телефона"){
                    dnt_paid.sort(function(a, b){
                        console.log(a);
                        if(a.user.phone < b.user.phone) {
                            return -1; }
                        if(a.user.phone > b.user.phone) {
                            return 1; }
                        return 0;
                    });
                    setDntPaid(dnt_paid);
                }else if (event.target.value === "По email"){

                    dnt_paid.sort(function(a, b){
                        console.log(a);
                        if(a.user.email < b.user.email) {
                            return -1; }
                        if(a.user.email > b.user.email) {
                            return 1; }
                        return 0;
                    });
                    setDntPaid(dnt_paid);
                }else if (event.target.value === "По дате"){
                    dnt_paid.sort(function(a, b){
                        console.log(a);
                        if(a.user.created_at < b.user.created_at) {
                            return -1; }
                        if(a.user.created_at > b.user.created_at) {
                            return 1; }
                        return 0;
                    });
                    setDntPaid(dnt_paid);
                }
            }else if (active === 2){
                if (event.target.value === "Наименованию"){
                    crd_paid.sort(function(a, b){
                        if(a.user.company.toLowerCase() < b.user.company.toLowerCase()) {
                            return -1; }
                        if(a.user.company.toLowerCase() > b.user.company.toLowerCase()) {
                            return 1; }
                        return 0;
                    });
                    setInvPaid(crd_paid);
                }else if (event.target.value === "Номеру телефона"){
                    crd_paid.sort(function(a, b){
                        console.log(a);
                        if(a.user.phone < b.user.phone) {
                            return -1; }
                        if(a.user.phone > b.user.phone) {
                            return 1; }
                        return 0;
                    });
                    setCrdPaid(crd_paid);
                }else if (event.target.value === "По email"){
                    crd_paid.sort(function(a, b){
                        console.log(a);
                        if(a.user.email < b.user.email) {
                            return -1; }
                        if(a.user.email > b.user.email) {
                            return 1; }
                        return 0;
                    });
                    setCrdPaid(crd_paid);
                }else if (event.target.value === "По дате"){
                    crd_paid.sort(function(a, b){
                        console.log(a);
                        if(a.user.created_at < b.user.created_at) {
                            return -1; }
                        if(a.user.created_at > b.user.created_at) {
                            return 1; }
                        return 0;
                    });
                    setCrdPaid(crd_paid);
                }
            }else if (active === 3){
                if (event.target.value === "Наименованию"){
                    inv_paid.sort(function(a, b){
                        if(a.user.company.toLowerCase() < b.user.company.toLowerCase()) {
                            return -1; }
                        if(a.user.company.toLowerCase() > b.user.company.toLowerCase()) {
                            return 1; }
                        return 0;
                    });
                    setInvPaid(inv_paid);
                }else if (event.target.value === "Номеру телефона"){
                    inv_paid.sort(function(a, b){
                        console.log(a);
                        if(a.user.phone < b.user.phone) {
                            return -1; }
                        if(a.user.phone > b.user.phone) {
                            return 1; }
                        return 0;
                    });
                    setInvPaid(inv_paid);
                }else if (event.target.value === "По email"){
                    inv_paid.sort(function(a, b){
                        console.log(a);
                        if(a.user.email < b.user.email) {
                            return -1; }
                        if(a.user.email > b.user.email) {
                            return 1; }
                        return 0;
                    });
                    setInvPaid(inv_paid);
                }else if (event.target.value === "По дате"){
                    inv_paid.sort(function(a, b){
                        console.log(a);
                        if(a.user.created_at < b.user.created_at) {
                            return -1; }
                        if(a.user.created_at > b.user.created_at) {
                            return 1; }
                        return 0;
                    });
                    setInvPaid(inv_paid);
                }
            }
        }else{
            if (active === 1){
                if (event.target.value === "Наименованию"){
                    dnt_paid.sort(function(a, b){
                        if(a.user.company.toLowerCase() > b.user.company.toLowerCase()) {
                            return -1; }
                        if(a.user.company.toLowerCase() < b.user.company.toLowerCase()) {
                            return 1; }
                        return 0;
                    });
                    setDntPaid(dnt_paid);
                }else if (event.target.value === "Номеру телефона"){
                    dnt_paid.sort(function(a, b){
                        console.log(a);
                        if(a.user.phone > b.user.phone) {
                            return -1; }
                        if(a.user.phone < b.user.phone) {
                            return 1; }
                        return 0;
                    });
                    setDntPaid(dnt_paid);
                }else if (event.target.value === "По email"){

                    dnt_paid.sort(function(a, b){
                        console.log(a);
                        if(a.user.email > b.user.email) {
                            return -1; }
                        if(a.user.email < b.user.email) {
                            return 1; }
                        return 0;
                    });
                    setDntPaid(dnt_paid);
                }else if (event.target.value === "По дате"){
                    dnt_paid.sort(function(a, b){
                        console.log(a);
                        if(a.user.created_at > b.user.created_at) {
                            return -1; }
                        if(a.user.created_at < b.user.created_at) {
                            return 1; }
                        return 0;
                    });
                    setDntPaid(dnt_paid);
                }
            }else if (active === 2){
                if (event.target.value === "Наименованию"){
                    crd_paid.sort(function(a, b){
                        if(a.user.company.toLowerCase() > b.user.company.toLowerCase()) {
                            return -1; }
                        if(a.user.company.toLowerCase() < b.user.company.toLowerCase()) {
                            return 1; }
                        return 0;
                    });
                    setInvPaid(crd_paid);
                }else if (event.target.value === "Номеру телефона"){
                    crd_paid.sort(function(a, b){
                        console.log(a);
                        if(a.user.phone > b.user.phone) {
                            return -1; }
                        if(a.user.phone < b.user.phone) {
                            return 1; }
                        return 0;
                    });
                    setCrdPaid(crd_paid);
                }else if (event.target.value === "По email"){
                    crd_paid.sort(function(a, b){
                        console.log(a);
                        if(a.user.email > b.user.email) {
                            return -1; }
                        if(a.user.email < b.user.email) {
                            return 1; }
                        return 0;
                    });
                    setCrdPaid(crd_paid);
                }else if (event.target.value === "По дате"){
                    crd_paid.sort(function(a, b){
                        console.log(a);
                        if(a.user.created_at > b.user.created_at) {
                            return -1; }
                        if(a.user.created_at < b.user.created_at) {
                            return 1; }
                        return 0;
                    });
                    setCrdPaid(crd_paid);
                }
            }else if (active === 3){
                if (event.target.value === "Наименованию"){
                    inv_paid.sort(function(a, b){
                        if(a.user.company.toLowerCase() > b.user.company.toLowerCase()) {
                            return -1; }
                        if(a.user.company.toLowerCase() < b.user.company.toLowerCase()) {
                            return 1; }
                        return 0;
                    });
                    setInvPaid(inv_paid);
                }else if (event.target.value === "Номеру телефона"){
                    inv_paid.sort(function(a, b){
                        console.log(a);
                        if(a.user.phone > b.user.phone) {
                            return -1; }
                        if(a.user.phone < b.user.phone) {
                            return 1; }
                        return 0;
                    });
                    setInvPaid(inv_paid);
                }else if (event.target.value === "По email"){
                    inv_paid.sort(function(a, b){
                        console.log(a);
                        if(a.user.email > b.user.email) {
                            return -1; }
                        if(a.user.email < b.user.email) {
                            return 1; }
                        return 0;
                    });
                    setInvPaid(inv_paid);
                }else if (event.target.value === "По дате"){
                    inv_paid.sort(function(a, b){
                        console.log(a);
                        if(a.user.created_at > b.user.created_at) {
                            return -1; }
                        if(a.user.created_at < b.user.created_at) {
                            return 1; }
                        return 0;
                    });
                    setInvPaid(inv_paid);
                }
            }
        }
    };

    const [tableTitle] = useState(['Компания','Телефон','email','Тариф','дата','статус платежа']);


    return (
        <div className={styles.container}>
            <div className={styles.table}>
                <div className={styles.table_header}>
                    <div></div>
                    {/*<div onClick={openFilter}  className={styles.filter}>*/}
                    {/*    <div className={styles.filter_title}>Фильтр</div>*/}
                    {/*    <div className={styles.filter_icon}><FilterIcon/></div>*/}
                    {/*</div>*/}
                    <div className={styles.sort}>
                        <div className={styles.sort_title}>
                            Сортировать по
                        </div>
                        <div className={styles.sort_select}>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={open}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                value={sort}
                                onChange={handleChange}
                            >
                                {sortBy.map((el,index)=>(
                                    <MenuItem key={index} value={el}>{el}</MenuItem>
                                ))}
                            </Select>
                            {updown === 'up' ? (
                                <div onClick={()=>{
                                    setUpDown('down')
                                    handleChange({target:{
                                            value:sort
                                        }})
                                }} className={`${styles.arrow} ${styles.up}`}></div>
                            ):(
                                <div onClick={()=>{
                                    setUpDown('up')
                                    handleChange({target:{
                                        value:sort
                                        }})
                                }} className={`${styles.arrow} ${styles.down}`}></div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.admin_table_title}>
                    <table rules="none">
                        <AdminTableTitle data={tableTitle}/>
                        {status === SUCCESS && (
                            <AdminTableContent
                                openModal={openModal}
                                data={active === 1 ? dnt_paid : (active === 2 ? crd_paid : inv_paid)}
                            />
                        )}
                    </table>
                </div>
                {/*<div className={styles.admin_table_content}>*/}
                {/*</div>*/}
            </div>
        </div>
    )
};
export default PaymentTable