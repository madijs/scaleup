import {PRODUCTION_TABLE_ERROR, PRODUCTION_TABLE_PENDING, PRODUCTION_TABLE_SUCCESS} from "../../types/AdminTypes";
import AdminService from "../../services/AdminService";


export const getProductionTableAction = () => async dispatch => {
    dispatch({
        type: PRODUCTION_TABLE_PENDING
    });
    const response = new AdminService().getProductionTable();
    response.then(res=>{
        console.log(res.data);
        dispatch({
            type: PRODUCTION_TABLE_SUCCESS,
            payload: res.data
        })
    }).catch(err=>{
        dispatch({
            type: PRODUCTION_TABLE_ERROR
        })
    })
};