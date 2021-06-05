import MainService from "../../services/MainService";


export const getJustFaqsAction = () => dispatch => {
    const response = new MainService().getJustFaqs();
    return response;
};