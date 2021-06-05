import {WORKERS_DATA_ERROR, WORKERS_DATA_PENDING, WORKERS_DATA_SUCCESS} from "../../../types/AdminTypes";
import SettingsService from "../../../services/SettingsService";


export const getWorkersAction = () => async dispatch => {
    dispatch({
        type: WORKERS_DATA_PENDING
    });
    await new SettingsService().getWorkersAPI().then(res=>{
        dispatch({
            type: WORKERS_DATA_SUCCESS,
            payload: res.data
        })
    }).catch(err=>{
        dispatch({
            type: WORKERS_DATA_ERROR,
        });
    })
};