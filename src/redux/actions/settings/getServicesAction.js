import {SERVICES_DATA_ERROR, SERVICES_DATA_PENDING, SERVICES_DATA_SUCCESS} from "../../../types/AdminTypes";
import SettingsService from "../../../services/SettingsService";

export const getServicesAction = () => async dispatch => {
    dispatch({
        type: SERVICES_DATA_PENDING
    });
    await new SettingsService().getServicesAPI().then(res=>{
        dispatch({
            type: SERVICES_DATA_SUCCESS,
            payload: res.data
        })
    }).catch(err=>{
        dispatch({
            type: SERVICES_DATA_ERROR
        })
    })
};