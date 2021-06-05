import {
    SAVE_ANKETA_VALUE_ERROR,
    SAVE_ANKETA_VALUE_PENDING,
    SAVE_ANKETA_VALUE_SUCCESS
} from "../../../types/anketaTypes";
import AnketaService from "../../../services/AnketaService";


export const saveAnketaValueAction = (id='',data,type) => async dispatch => {
    dispatch({
        type: SAVE_ANKETA_VALUE_PENDING
    });
    const response = new AnketaService().saveManyAnketa(id,data,type);
    response.then(res=>{
        dispatch({
            type: SAVE_ANKETA_VALUE_SUCCESS
        })
    }).catch(err=>{
        dispatch({
            type: SAVE_ANKETA_VALUE_ERROR
        })
    });
    return response;
};