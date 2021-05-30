import {
    GET_CONTENT_ANKETA_ERROR,
    GET_CONTENT_ANKETA_PENDING,
    GET_CONTENT_ANKETA_SUCCESS
} from "../../../types/AdminTypes";
import SettingsService from "../../../services/SettingsService";


export const getContentAnketaAction = () => async dispatch => {
      dispatch({
          type: GET_CONTENT_ANKETA_PENDING
      });
    await new SettingsService().getAnketaContent().then(res=>{
        dispatch({
            type: GET_CONTENT_ANKETA_SUCCESS,
            payload: res.data
        })
    }).catch(err=>{
        dispatch({
            type: GET_CONTENT_ANKETA_ERROR
        })
    })
};