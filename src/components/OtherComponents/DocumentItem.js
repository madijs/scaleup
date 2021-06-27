import React, {Component} from "react";
import _ from 'lodash'
import styles from "../../assets/styles/Personal.module.css";
import {ReactComponent as FolderIcon} from "../../assets/icons/folder.svg";
import {ReactComponent as WordIcon} from "../../assets/icons/word.svg";
import {ReactComponent as PdfIcon} from "../../assets/icons/pdf.svg";
import {ReactComponent as XlsIcon} from "../../assets/icons/xls.svg";
import {ReactComponent as PptxIcon} from "../../assets/icons/powerpoint.svg";
import {ReactComponent as JpgIcon} from "../../assets/icons/jpg.svg";
import {ReactComponent as PngIcon} from "../../assets/icons/png.svg";
import {ReactComponent as GifIcon} from "../../assets/icons/gif.svg";
import {ReactComponent as TrashIcon} from "../../assets/icons/trashIcon.svg";
import axios from "../../plugins/axios";


class DocumentItem extends Component {

    handleClick(e,key2,type,file,key) {
        if (!this._delayedClick) {
            this._delayedClick = _.debounce(this.doClick, 500);
        }
        if (this.clickedOnce) {
            this._delayedClick.cancel();
            this.clickedOnce = false;
            console.log('double click');
            if (type === 'folder'){
                if (this.props.userData && this.props.userData.roles[0].name !== 'client'){
                    if (this.props.location.pathname.includes('finish')){
                        this.props.history.push(this.props.location.pathname.replace('finish','preview')+'/detail/'+key+'&'+key2);
                    }else if (this.props.location.pathname.includes('success')){
                        this.props.history.push(this.props.location.pathname.replace('success','preview')+'/detail/'+key+'&'+key2);
                    }else{
                        this.props.history.push(this.props.location.pathname+'/detail/'+key+'&'+key2);
                    }
                }else{
                    if (this.props.location.pathname.includes('my-documents')){
                        this.props.history.push(this.props.location.pathname.replace('my-documents','preview-document')+`/${this.props.userData.id}`+'/detail/'+key+'&'+key2);
                    }else{
                        this.props.history.push(this.props.location.pathname+'/detail/'+key+'&'+key2);
                    }
                }
                if (this.props.folderName){
                    const copy = [...this.props.folderName];
                    copy.push(key2);
                    this.props.setFolderName(copy)
                }
            }
            if (type === 'file'){
                this.openFile(file,key);
            }
        } else {
            this._delayedClick(e);
            this.clickedOnce = true;
        }
    }

    doClick(e) {
        this.clickedOnce = undefined;
        console.log('single click');
    }

    openFile(file,key){
        this.props.setDocument({file:file,key:key});
        this.props.setOpen(true);
    }

    deleteDocument(id,file,key,type,key2){
        if (this.props.location.pathname.includes('/admin/settings')){
            if (type === 'file'){
                let a = '';
                if (this.props.tarif === 'startup'){
                    a = 1
                }else if (this.props.tarif === 'scaleforce'){
                    a = 2
                }else if (this.props.tarif === 'scaleup'){
                    a = 3
                }
                axios.delete(`/docs/templates${a}/delete-file?link=${key}/${file}`,{
                    params:{
                        link:key+'/'+file
                    }
                }).then(res=>{
                    this.props.setDocs(res.data);
                })
            }else{
                let a = '';
                if (this.props.tarif === 'startup'){
                    a = 1
                }else if (this.props.tarif === 'scaleforce'){
                    a = 2
                }else if (this.props.tarif === 'scaleup'){
                    a = 3
                }
                axios.delete(`/docs/templates${a}/delete-folder`,{
                    params:{
                        link:key+'/'+key2
                    }
                }).then(res=>{
                    this.props.setDocs(res.data);
                })
            }
        }else{
            axios.delete(`/docs/delete-file/${id}`, {headers:{},data:{link:key+'/'+file}}).then(res=>{
                this.props.setDocs(res.data);
            })
        }
    }

    render() {
        const {docsData,keyName,id,tarif} = this.props;
        let key = keyName;
        return (
            <>
                {docsData[key].data && Object.keys(docsData[key].data).map((key2, index) => (
                    <div onClick={()=>{
                            this.handleClick(this,key2,docsData[key].data[key2].type,docsData[key].data[key2].name,key);
                    }} key={index} className={styles.document}>
                        <div className={styles.doc_svg_leftside}>
                            {docsData[key].data[key2].type === 'folder' ? (
                                <FolderIcon/>
                            ) : (docsData[key].data[key2].type === 'file' && (
                                <>
                                    {docsData[key].data[key2].name.substring(docsData[key].data[key2].name.length-5).toLowerCase().includes('docx') && (
                                        <WordIcon/>
                                    )}
                                    {docsData[key].data[key2].name.substring(docsData[key].data[key2].name.length-5).toLowerCase().includes('pdf') && (
                                        <PdfIcon/>
                                    )}
                                    {docsData[key].data[key2].name.substring(docsData[key].data[key2].name.length-5).toLowerCase().includes('xls') && (
                                        <XlsIcon/>
                                    )}
                                    {docsData[key].data[key2].name.substring(docsData[key].data[key2].name.length-5).toLowerCase().includes('pptx') && (
                                        <PptxIcon/>
                                    )}
                                    {docsData[key].data[key2].name.substring(docsData[key].data[key2].name.length-5).toLowerCase().includes('png') && (
                                        <PngIcon/>
                                    )}
                                    {docsData[key].data[key2].name.substring(docsData[key].data[key2].name.length-5).toLowerCase().includes('jpg') && (
                                        <JpgIcon/>
                                    )}
                                    {docsData[key].data[key2].name.substring(docsData[key].data[key2].name.length-5).toLowerCase().includes('jpeg') && (
                                        <JpgIcon/>
                                    )}
                                    {docsData[key].data[key2].name.substring(docsData[key].data[key2].name.length-5).toLowerCase().includes('gif') && (
                                        <GifIcon/>
                                    )}
                                </>
                            ))}
                        </div>
                        <div className={styles.doc_svg_rightside}>
                            <div className={styles.doc_name}>
                                {docsData[key].data[key2].type === 'folder' ? (
                                    key2
                                ) : (
                                    <>
                                        {docsData[key].data[key2].name.length>19 ? (
                                            <>{docsData[key].data[key2].name.substring(0,16)+"..."}</>
                                        ):(
                                            <>{docsData[key].data[key2].name}</>
                                        )}
                                    </>
                                )}
                            </div>
                            <div className={styles.doc_count}>
                                {docsData[key].data[key2].type === 'folder' ? (
                                    docsData[key].data[key2].count + " файлов"
                                ) : (
                                    docsData[key].data[key2].size + " kb"
                                )}
                            </div>
                        </div>
                        {this.props.userData && this.props.userData.roles[0].name!=='client' && (
                            <div onClick={()=>this.deleteDocument(id,docsData[key].data[key2].type==='file' ? docsData[key].data[key2].name : '',key,docsData[key].data[key2].type,key2)} className={styles.trash}>
                                <TrashIcon/>
                            </div>
                        )}
                    </div>
                ))}
            </>
        )
    }
};

export default DocumentItem;