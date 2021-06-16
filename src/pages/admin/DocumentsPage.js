import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import AdminTitle from "../../components/AdminComponents/AdminTitle";
import DocumentTable from "./DocumentTable";
import getDocTableAction from "../../redux/actions/documents/getDocTableAction";


const DocumentsPage = () => {
    const dispatch = useDispatch();
    const {data} = useSelector(state => state.DocumentPage);

    useEffect(() => {
        document.title = "ScaleUp | Производство";
        dispatch(getDocTableAction());
    }, []);

    return (
        <div style={{paddingTop: 20, height: '100vh'}}>
            <AdminTitle
                title={"Производство"}
                description={"Общее количество компании"}
                count={data ? data.length : "0"}
            />
            <DocumentTable
                data={data}
            />
        </div>
    )
};

export default DocumentsPage;