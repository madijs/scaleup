import React, {useEffect} from "react";
import {useHistory,useParams,useLocation} from "react-router-dom"
import AuthService from "../services/AuthService";
import DocumentService from "../services/DocumentService";
import {COMPANY_DATA_SUCCESS, DOCUMENT_PREVIEW_SUCCESS} from "../types/documentTypes";
import {useDispatch} from "react-redux";
import PreviewDocument from "./admin/PreviewDocument";


const UnauthorizedSharedDocuments = () => {
    const search = new URLSearchParams(useLocation().search);
    const dispatch = useDispatch();

    useEffect(()=>{
        localStorage.clear();
        const token = search.get('token');
        localStorage.setItem('shared_token',token);

        const response = new DocumentService().getUnauthorizedSharedDocs(token);
        response.then(res=>{
            console.log(res);
            dispatch({
                type: DOCUMENT_PREVIEW_SUCCESS,
                payload: res.data.data
            });
            dispatch({
                type: COMPANY_DATA_SUCCESS,
                payload: res.data.user
            });
        })
    },[]);

    return(
        <div>
            <PreviewDocument/>
        </div>
    )
};

export default UnauthorizedSharedDocuments