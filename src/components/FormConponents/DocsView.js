import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom"
import {useSelector} from "react-redux";
import axios from "../../plugins/axios"
import {useLocation} from "react-router-dom"
import styles from "../../assets/styles/ProfileStyles/ProfilePage.module.scss";
import EditAva from "../../assets/icons/editAva.svg";

const DocsView = ({document}) => {
    const search = new URLSearchParams(useLocation().search);
    const {userData} = useSelector(state => state.AuthPage);
    const {id} = useParams();
    const location = useLocation();
    const [link,setLink] = useState(null);
    const token = search.get('token');

    console.log(link)

    useEffect(()=>{
        if (userData && userData.roles[0].name !=="client" && !location.pathname.includes('/admin/settings'))
        axios.get(`/docs/google-document-file-open/${id}?link=${document.key}/${document.file}`).then(res=>{
            console.log(res);
            setLink(res.data.link)
        });
        // if (location.pathname.includes('/shared')){
        //     const token = search.get('token');
        //     axios.get(`/public-document/file?token=${token}&link=${document.key}/${document.file}`,{
        //         params:{
        //             token,
        //             link: document.key+"/"+document.file
        //         }
        //     }).then(res=>{
        //         console.log(res);
        //     });
        // }
    },[]);

    console.log(location.pathname.includes('/preview-document'));
    return(
        <div style={{width:'900px',zIndex:100,position:'relative'}}>
            {/*{(!location.pathname.includes("preview-document") && (userData && userData.roles[0].name !=='client')) && (*/}
            {/*    <div onClick={()=>{*/}
            {/*        if (link){*/}
            {/*            window.open(`https://docs.google.com/document/d/${link}/edit`,'__blank')*/}
            {/*        }else{*/}
            {/*            alert('Подождите несколько секунд и нажмите еще раз!')*/}
            {/*        }*/}
            {/*    }} style={{position:'absolute',top:'12px',right:'10px',backgroundColor:'#FF494D',padding:'15px 20px',color:'#fff',cursor:'pointer'}}>*/}
            {/*        Редактировать*/}
            {/*    </div>*/}
            {/*)}*/}
            {(userData && (userData && userData.roles[0].name !=='client' && !location.pathname.includes('/admin/settings'))) && (
                <div onClick={()=>{
                    if (link){
                        window.open(`https://docs.google.com/document/d/${link}/edit`,'__blank')
                    }else{
                        alert('Подождите несколько секунд и нажмите еще раз!')
                    }
                }} className={styles.avatarIcon_editDiv}>
                    <img src={EditAva} alt="edit"/>
                </div>
            )}
            {userData && (
                <>
                    {(document && userData.roles[0].name !== "client" && !location.pathname.includes('/admin/settings')) && (
                        <iframe
                            src={`https://docs.google.com/viewer?url=https://scaleup.dasspartners.com/api/docs/google-document-file/${id}?link=${document.key}/${document.file}&embedded=true`}
                            title="file"
                            width="100%"
                            height="600"
                        ></iframe>
                    )}
                    {location.pathname.includes('/admin/settings') && (
                        <iframe
                            src={`https://docs.google.com/viewer?url=https://scaleup.dasspartners.com/api/templates/get-file/?link=${document.key}/${document.file}&embedded=true`}
                            title="file"
                            width="100%"
                            height="600"
                        ></iframe>
                    )}
                    {/*{(document && userData.roles[0].name !== "client" && location.pathname.includes("/preview-document")) && (*/}
                    {/*    <iframe*/}
                    {/*        src={`https://docs.google.com/viewer?url=https://scaleup.dasspartners.com/api/docs/document-file/${id}?link=${document.key}/${document.file}&embedded=true`}*/}
                    {/*        title="file"*/}
                    {/*        width="100%"*/}
                    {/*        height="600"*/}
                    {/*    ></iframe>*/}
                    {/*)}*/}
                    {(document && userData.roles[0].name === "client") && (
                        <iframe
                            src={`https://docs.google.com/viewer?url=https://scaleup.dasspartners.com/api/docs/google-document-file/${userData.id}?link=${document.key}/${document.file}&embedded=true`}
                            title="file"
                            width="100%"
                            height="600"
                        ></iframe>
                    )}
                </>
            )}
            {/*{location.pathname.includes('/shared') && (*/}
            {/*    <iframe*/}
            {/*        src={`https://docs.google.com/viewer?url=https://scaleup.dasspartners.com/api/public-document/file?token=${localStorage.getItem('shared_token')}&link=${document.key}/${document.file}&embedded=true`}*/}
            {/*        title="file"*/}
            {/*        width="100%"*/}
            {/*        height="600"*/}
            {/*    ></iframe>*/}
            {/*)}*/}
            {location.pathname.includes('/shared') && (
                <iframe
                    src={`https://docs.google.com/viewer?url=https://scaleup.dasspartners.com/api/docs/google-document-file-public/${localStorage.getItem('shared_token')}?link=${document.key}/${document.file}&embedded=true`}
                    title="file"
                    width="100%"
                    height="600"
                ></iframe>
            )}
        </div>
    )
};

export default DocsView;