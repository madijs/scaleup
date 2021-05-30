import React, {useEffect, useState} from 'react'
import BeforePaymentMainPage from "./BeforePaymentMainPage";
import AfterPaymentMainPage from "./AfterPaymentMainPage";





const MainPage = ({userData}) => {

    const [bool,setBool] = useState(userData.payment ? ( userData.payment.payment_status_id == 3 ? true : false ) : false );

    useEffect(()=>{
        document.title = "ScaleUp | Главная"
    },[]);

    return (
        <>
            {bool ? (
                <AfterPaymentMainPage/>
            ): (
                <BeforePaymentMainPage setBool={setBool}/>
            )}
        </>
    )
};
export default MainPage