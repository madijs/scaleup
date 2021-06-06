import React, {useEffect, useState} from "react";
import styles from "../../assets/styles/AdminStyles/AdminSettingsPage.module.scss"
import AdminTitle from "../../components/AdminComponents/AdminTitle";
import AdminSettingsTabs from "../../components/AdminComponents/settings/AdminSettingsTabs";
import AdminSettingsTable from "../../components/AdminComponents/settings/AdminSettingsTable";
import {useDispatch, useSelector} from "react-redux";
import {getWorkersAction} from "../../redux/actions/settings/getWorkersAction";
import {getServicesAction} from "../../redux/actions/settings/getServicesAction";
import {getUsersAction} from "../../redux/actions/settings/getUsersAction";
import AdminSettingsContentBlock from "./AdminSettingsContentBlock";
import {getSectionsAction} from "../../redux/actions/settings/getSectionsAction";
import {Route} from 'react-router-dom';
import PreviewDocument from "./PreviewDocument";
import PreviewDocumentDetail from "./PreviewDocumentDetail";
import MorePreviewDocument from "./MorePreviewDocument";
import {useLocation, useHistory} from "react-router-dom";
import {getContentAnketaAction} from "../../redux/actions/settings/getContentAnketaAction";


const AdminSettingsPage = () => {
    const dispatch = useDispatch();
    const [active,setActive] = useState(1);
    const {workers,services,users_list, anketa} = useSelector(state => state.SettingsPage);
    const [folderName,setFolderName] = useState([]);

    const location = useLocation();
    const history = useHistory();

    const [blockData,setBlockData] = useState([
        {
            title:'Приветсвенный блок',
            description:'Какое-то описание для этого блока',
            path:'/settings/welcome'
        },
        {
            title:'Вопросы-ответы',
            description:'Какое-то описание для этого блока',
            path:'/settings/faqs'
        }
        // {
        //     title:'Стратегический раздел',
        //     description:'Какое-то описание для этого блока',
        //     path:'/admin'
        // },
        // {
        //     title:'Финансовый раздел',
        //     description:'Какое-то описание для этого блока',
        //     path:'/admin'
        // },
        // {
        //     title:'Маркетинговый раздел',
        //     description:'Какое-то описание для этого блока',
        //     path:'/admin'
        // },
        // {
        //     title:'Юридический раздел',
        //     description:'Какое-то описание для этого блока',
        //     path:'/admin'
        // }
    ]);

    useEffect(()=>{
        if (anketa){
            for (let i=0;i<anketa.length;i++){
                let obj = {
                    title: anketa[i].name,
                    description: anketa[i].description,
                    path: `/content/anketa/${anketa[i].id}`
                };
                blockData.push(obj);
                setBlockData(blockData)
            }
        }
    },[anketa]);


    useEffect(()=>{
        document.title = "ScaleUp | Настройки";
        dispatch(getWorkersAction());
        dispatch(getServicesAction());
        dispatch(getUsersAction());
        dispatch(getSectionsAction());
        if (!anketa){
            dispatch(getContentAnketaAction());
        }
    },[]);



    return(
        <>
        <div className={styles.container}>
            <AdminTitle
                title={"Настройки"}
                description={"Админская панель"}
                count={""}
            />
            <AdminSettingsTabs
                active={active}
                setActive={setActive}
                history={history}
            />
            {(active === 1 && workers) && (
                <AdminSettingsTable
                    active={active}
                    data={workers}
                    count={workers.length}
                />
            )}
            {(active === 2 &&  services ) && (
                <AdminSettingsTable
                    active={active}
                    data={services}
                    count={services.length}
                />
            )}
            {active === 3 && (
                <AdminSettingsContentBlock
                    blockData={blockData}
                />
            )}
            {(active === 4 && location.pathname==='/admin/settings') && (
                <>
                    <PreviewDocument folderName={folderName} setFolderName={setFolderName}/>
                </>
            )}
            {(active === 5 && users_list) && (
                <AdminSettingsTable
                    active={active}
                    data={users_list}
                    count={users_list.length}
                />
            )}
            <Route exact path={'/admin/settings/detail/:name'} render={()=><PreviewDocumentDetail setFolderName={setFolderName} folderName={folderName}/>}/>
            <Route exact path={'/admin/settings/detail/:name/more/:name2'} render={()=><MorePreviewDocument setFolderName={setFolderName} folderName={folderName}/>}/>
        </div>
        </>
    )
};
export default AdminSettingsPage;