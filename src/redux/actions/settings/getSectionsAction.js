import React from "react";
import {SECTIONS_ERROR, SECTIONS_PENDING, SECTIONS_SUCCESS} from "../../../types/AdminTypes";
import SettingsService from "../../../services/SettingsService";

export const getSectionsAction = () => async dispatch => {
    dispatch({
        type: SECTIONS_PENDING
    });
    await new SettingsService().getSectionsAPI().then(res=>{
        dispatch({
            type: SECTIONS_SUCCESS
        })
    }).catch(err=>{
        dispatch({
            type: SECTIONS_ERROR
        })
    })
};