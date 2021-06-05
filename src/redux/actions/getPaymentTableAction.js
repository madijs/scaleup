import {PAYMENT_TABLE_ERROR, PAYMENT_TABLE_PENDING, PAYMENT_TABLE_SUCCESS} from "../../types/AdminTypes";
import AdminService from "../../services/AdminService";


export const getPaymentTableAction = () => async dispatch =>{
    dispatch({
        type: PAYMENT_TABLE_PENDING
    });
    const response = new AdminService().getPaymentsTableData();
    response.then(res=>{
        dispatch({
            type: PAYMENT_TABLE_SUCCESS,
            payload: res.data
        })
    }).catch(err=>{
        dispatch({
            type: PAYMENT_TABLE_ERROR
        })
    })
};