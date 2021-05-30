import AuthService from "../../services/AuthService";
import {SET_USER} from "../../types/authTypes";
import axios from "../../plugins/axios";


export const setUserAction = (email,password) => dispatch => {
    const response = new AuthService().signIn(email,password);
    response.then(res=>{
        localStorage.setItem('token',res.data.access_token);
        axios.defaults.headers = {
            Authorization: `Bearer ${res.data.access_token}`
        };
        dispatch({
            type: SET_USER,
            payload: res.data.user
        })
    });
    return response
};