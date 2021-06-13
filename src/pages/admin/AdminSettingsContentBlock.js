import React, {useEffect, useState} from "react";
import styles from "../../assets/styles/AdminStyles/AdminSettingsContentBlock.module.scss"
import ContentBlockItem from "../../components/AdminComponents/settings/ContentBlockItem";
import {useDispatch, useSelector} from "react-redux";
import {getContentAnketaAction} from "../../redux/actions/settings/getContentAnketaAction";
import AdminSettingsPage from "./AdminSettingsPage";

const AdminSettingsContentBlock = ({blockData}) => {

    return(
        <div className={styles.container}>
            <div className={styles.content}>
                {/*<Route path={'/settings/welcome'} render={()=><ContentBlockItem*/}
                {/*    title={'Приветсвенный блок'}*/}
                {/*    description={'Какое-то описание для этого блока'}*/}
                {/*    path={'/settings/welcome'}*/}
                {/*/>}/>*/}
                {/*<Route path={'/settings/faqs'} render={()=><ContentBlockItem*/}
                {/*    key={index}*/}
                {/*    title={el.title}*/}
                {/*    description={el.description.length>40 ? el.description.substring(0,40)+"..." : el.description}*/}
                {/*    path={el.path}*/}
                {/*/>}/>*/}
                {blockData.map((el,index)=>(
                    <ContentBlockItem
                        key={index}
                        title={el.title}
                        description={el.description.length>40 ? el.description.substring(0,40)+"..." : el.description}
                        path={el.path}
                    />
                ))}
            </div>
        </div>
    )
};

export default AdminSettingsContentBlock;