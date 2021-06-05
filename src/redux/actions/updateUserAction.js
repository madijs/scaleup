import AuthService from "../../services/AuthService";
import {UPDATE_USER} from "../../types/authTypes";


export const updateUserAction = (company,fio,email,phone) => dispatch => {
    const response = new AuthService().updateUser(company,fio,email,phone);
    response.then(res=>{
        dispatch({
            type: UPDATE_USER,
            payload: res.data
        })
    }).catch(err=>{
        console.log(err.response)
    })
    return response
};