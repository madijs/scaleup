import {UPDATE_ANKETA_ERROR, UPDATE_ANKETA_PENDING, UPDATE_ANKETA_SUCCESS} from "../../../types/AdminTypes";
import SettingsService from "../../../services/SettingsService";


export const updateAnketaAction = (body) => async dispatch => {
    dispatch({
        type: UPDATE_ANKETA_PENDING
    });
    await new SettingsService().anketaUpdate(body).then(res=>{
        dispatch({
            type: UPDATE_ANKETA_SUCCESS,
            payload: res.data
        })
    }).catch(err=>{
        dispatch({
            type: UPDATE_ANKETA_ERROR
        })
    })
};