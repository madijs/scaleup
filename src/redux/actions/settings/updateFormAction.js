import {
   UPDATE_FORM_ERROR,
    UPDATE_FORM_PENDING, UPDATE_FORM_SUCCESS
} from "../../../types/AdminTypes";
import SettingsService from "../../../services/SettingsService";


export const updateFormAction = (body) => dispatch => {
    dispatch({
        type: UPDATE_FORM_PENDING
    });
    const res = new SettingsService().anketaUpdate(body)
        res.then(res=>{
        dispatch({
            type: UPDATE_FORM_SUCCESS,
            payload: res.data
        })
    }).catch(err=>{
        dispatch({
            type: UPDATE_FORM_ERROR
        })
    });
    return res;
};