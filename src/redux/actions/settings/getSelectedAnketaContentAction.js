import {
    GET_SELECTED_ANKETA_CONTENT_ERROR,
    GET_SELECTED_ANKETA_CONTENT_PENDING,
    GET_SELECTED_ANKETA_CONTENT_SUCCESS
} from "../../../types/AdminTypes";
import SettingsService from "../../../services/SettingsService";


export const getSelectedAnketaContentAction = (id) => async dispatch => {
    dispatch({
        type: GET_SELECTED_ANKETA_CONTENT_PENDING
    });
    await new SettingsService().getSelectedAnketaContent(id).then(res=>{
        dispatch({
            type: GET_SELECTED_ANKETA_CONTENT_SUCCESS,
            payload: res.data
        })
    }).catch(err=>{
        dispatch({
            type: GET_SELECTED_ANKETA_CONTENT_ERROR
        })
    })
};