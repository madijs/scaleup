import MainService from "../../services/MainService";
import {SET_FAQ} from "../../types/faqTypes";



export const getFaqListAction = () => dispatch => {
    const response = new MainService().getFaqs();
    response.then(res=>{
        dispatch({
            type: SET_FAQ,
            payload: res.data
        });
    });
    response.catch(err=>{
        console.log(err)
    });
};