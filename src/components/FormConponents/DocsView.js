import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom"
import {useSelector} from "react-redux";
import axios from "../../plugins/axios"
import {useLocation} from "react-router-dom"
import styles from "../../assets/styles/ProfileStyles/ProfilePage.module.scss";
import EditAva from "../../assets/icons/editAva.svg";
import {mediaLink} from "../../tools/medaiLink";

const DocsView = ({document,tarif='',invoice=false}) => {
    const search = new URLSearchParams(useLocation().search);
    const {userData} = useSelector(state => state.AuthPage);
    const {id} = useParams();
    const location = useLocation();
    const [link,setLink] = useState(null);
    const token = search.get('token');
    const [tarifNum,setTarifNum] = useState('');
    const [pending,setPending] = useState(false);

    console.log(location);
    console.log(tarif);

    useEffect(()=>{
        let a = '';
        if (tarif === 'startup'){
            a = 1
        }else if (tarif === 'scaleforce'){
            a = 2
        }else if (tarif === 'scaleup'){
            a = 3
        }
        setTarifNum(a);
        if (userData && userData.roles[0].name !=="client" && !location.pathname.includes('/admin/settings') && !invoice) {
            // axios.get(`/docs/google-document-file-open/${id}?link=${document.key}/${document.file}`).then(res=>{
            //     console.log(res);
            //     setLink(res.data.link)
            // });
            setPending(true);
            axios.get(`/docs/onedrive-link/${id}?link=${document.key}/${document.file}`).then(res => {
                setLink(res.data.link)
                setPending(false)
            }).catch(() => {
                setPending(false)
            })
        }else if (userData.roles[0].name ==="client"){
            setPending(true);
            axios.get(`/docs/onedrive-link/${userData.id}?link=${document.key}/${document.file}`).then(res => {
                setLink(res.data.link)
                setPending(false)
            }).catch(() => {
                setPending(false)
            })
        }
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
            {(userData && (userData && userData.roles[0].name !=='client' && !location.pathname.includes('/admin/settings'))) && !invoice && (
                <div onClick={()=>{
                    if (link){
                        window.open(link,'__blank')
                    }else{
                        alert('Подождите несколько секунд и нажмите еще раз!')
                    }
                }} className={styles.editIconDoc}>
                    <img src={EditAva} alt="edit"/>
                </div>
            )}
            {userData && (
                <>
                    {(!pending && document && userData.roles[0].name !== "client" && !location.pathname.includes('/admin/settings')) && !invoice && (
                        <>
                        {/*<iframe*/}
                        {/*    src={`https://docs.google.com/viewer?url=https://platformapi.scaleup.plus/api/docs/google-document-file/${id}?link=${document.key}/${document.file}&embedded=true`}*/}
                        {/*    title="file"*/}
                        {/*    width="100%"*/}
                        {/*    height="600"*/}
                        {/*></iframe>*/}
                        <iframe
                        src={`${link}`}
                        title="file"
                        width="100%"
                        height="600"
                        ></iframe>
                        </>
                    )}
                    {location.pathname.includes('/admin/settings/templates') && (
                        <iframe
                            src={`https://docs.google.com/viewer?url=https://platformapi.scaleup.plus/api/templates${tarifNum}/get-file/?link=${document.key}/${document.file}&embedded=true`}
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
                    {(!pending && document && userData.roles[0].name === "client") && (
                        // <iframe
                        //     src={`https://docs.google.com/viewer?url=https://platformapi.scaleup.plus/api/docs/google-document-file/${userData.id}?link=${document.key}/${document.file}&embedded=true`}
                        //     title="file"
                        //     width="100%"
                        //     height="600"
                        // ></iframe>
                        <iframe
                        src={`${link}`}
                        title="file"
                        width="100%"
                        height="600"
                        ></iframe>
                    )}
                    {invoice && (
                        <iframe
                            src={`https://docs.google.com/viewer?url=${mediaLink}/${document}&embedded=true`}
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
                    src={`https://docs.google.com/viewer?url=https://platformapi.scaleup.plus/api/docs/google-document-file-public/${localStorage.getItem('shared_token')}?link=${document.key}/${document.file}&embedded=true`}
                    title="file"
                    width="100%"
                    height="600"
                ></iframe>
            )}
        </div>
    )
};

export default DocsView;