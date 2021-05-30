import AuthService from "../../services/AuthService";
import {SET_USER} from '../../types/authTypes'

export const getMeInfoAction = () => dispatch => {
    const response = new AuthService().getMe();
    response.then(res=>{
        console.log(res.data);
        dispatch({
            type: SET_USER,
            payload: res.data
        })
    });
    return response
};