import {USERS_LIST_PENDING, USERS_LIST_SUCCESS} from "../../../types/AdminTypes";
import SettingsService from "../../../services/SettingsService";


export const getUsersAction = () => async dispatch => {
    dispatch({
        type: USERS_LIST_PENDING
    });
    await new SettingsService().getUsersAPI().then(res=>{
        console.log(res);
        dispatch({
            type: USERS_LIST_SUCCESS,
            payload: res.data
        })
    }).catch(err=>{
        console.log(err)
    })
};