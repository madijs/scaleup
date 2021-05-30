import {PRODUCTION_CURRENT_ERROR, PRODUCTION_CURRENT_PENDING, PRODUCTION_CURRENT_SUCCESS} from "../../types/AdminTypes";
import AdminService from "../../services/AdminService";


export const getCurrentProductionAction = (id) => async dispatch => {
    dispatch({
        type: PRODUCTION_CURRENT_PENDING
    });

    const response = new AdminService().getCurrentProductionItem(id);
    response.then(res=>{
        console.log(res.data);
        dispatch({
            type: PRODUCTION_CURRENT_SUCCESS,
            payload: res.data
        })
    }).catch(err=>{
        dispatch({
            type: PRODUCTION_CURRENT_ERROR
        })
    })
};