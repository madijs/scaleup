import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import getDocTableAction from "../redux/actions/documents/getDocTableAction";
import AdminTitle from "../components/AdminComponents/AdminTitle";
import DocumentTable from "./admin/DocumentTable";
import getSuccessDocTableAction from "../redux/actions/documents/getSuccessDocTableAction";

const NewDocumentsPage = () => {
    const dispatch = useDispatch();
    const {data} = useSelector(state => state.DocumentPage);

    useEffect(()=>{
        document.title = "ScaleUp | Документы";
        dispatch(getSuccessDocTableAction());
    },[]);

    return(
        <div style={{paddingTop:20, height: '100vh'}}>
            <AdminTitle
                title={"Документы"}
                description={"Общее количество компании"}
                count={data ? data.length : "0"}
            />
            <DocumentTable
                data={data}
            />
        </div>
    )
};

export default NewDocumentsPage