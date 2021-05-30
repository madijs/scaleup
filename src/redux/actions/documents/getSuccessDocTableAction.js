import React from "react";
import {DOCUMENT_TABLE_ERROR, DOCUMENT_TABLE_PENDING, DOCUMENT_TABLE_SUCCESS} from "../../../types/documentTypes";
import DocumentService from "../../../services/DocumentService";

export const getSuccessDocTableAction = () => async dispatch => {
    dispatch({
        type: DOCUMENT_TABLE_PENDING
    });
    await new DocumentService().getSuccessDocumentTable().then(res=>{
        console.log(res);
        dispatch({
            type: DOCUMENT_TABLE_SUCCESS,
            payload: res.data
        })
    }).catch(err=>{
        dispatch({
            type: DOCUMENT_TABLE_ERROR
        })
    })
};

export default getSuccessDocTableAction;