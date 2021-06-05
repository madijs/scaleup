import React, {Component} from "react";
import _ from "lodash";
import styles from "../../assets/styles/Personal.module.css";
import {ReactComponent as WordIcon} from "../../assets/icons/word.svg";
import {ReactComponent as PdfIcon} from "../../assets/icons/pdf.svg";
import {ReactComponent as XlsIcon} from "../../assets/icons/xls.svg";
import {ReactComponent as PptxIcon} from "../../assets/icons/pptx.svg";
import {ReactComponent as FolderIcon} from "../../assets/icons/folder.svg";
import {ReactComponent as TrashIcon} from "../../assets/icons/trashIcon.svg";
import axios from "../../plugins/axios";

class MoreDocumentItem extends Component{

    handleClick(e,key3,type,file,key) {
        if (!this._delayedClick) {
            this._delayedClick = _.debounce(this.doClick, 500);
        }
        if (this.clickedOnce) {
            this._delayedClick.cancel();
            this.clickedOnce = false;
            console.log('double click');
            if (type === 'folder'){
                this.props.history.push(this.props.location.pathname+'/more/'+key3);
                const copy = [...this.props.folderName];
                copy.push(key3);
                this.props.setFolderName(copy)
            }
            if (type === 'file'){
                this.openFile(file,key);
            }
        } else {
            this._delayedClick(e);
            this.clickedOnce = true;
        }
    }

    openFile(file,key){
        console.log(file);
        console.log(key);
        this.props.setDocument({file:file,key:key});
        this.props.setOpen(true);
    }

    doClick(e) {
        this.clickedOnce = undefined;
        console.log('single click');
    }

    deleteDocument(id,file,key,type,key3){
        console.log(file);
        console.log(type);
        if (this.props.location.pathname.includes('/admin/settings')){
            if (type !== 'folder'){
                axios.delete(`/docs/templates/delete-file?link=${key}/${file}`,{
                    params:{
                        link:key+'/'+file
                    }
                }).then(res=>{
                    this.props.setDocs(res.data);
                })
            }else if (type == 'folder'){
                axios.delete(`/docs/templates/delete-folder`,{
                    params:{
                        link:key+'/'+key3
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
        const {id,docsData,name} = this.props;
        console.log(docsData);
        return(
            <>
            {docsData && Object.keys(docsData).map((key,index)=>(
                    <>
                        {docsData[key].data && Object.keys(docsData[key].data).map((key2,index)=>(
                            <>
                                {key2 == name.split('&')[1] && docsData[key].data[key2].data && Object.keys(docsData[key].data[key2].data).map((key3,index)=>(
                                    <>
                                        {docsData[key].data[key2].data[key3].type == 'file' ? (
                                            <div onClick={()=>{
                                                this.handleClick(
                                                    this,
                                                    key3,
                                                    docsData[key].data[key2].data[key3].type,
                                                    docsData[key].data[key2].data[key3].name,
                                                    key+'/'+key2
                                                )
                                            }} className={`${styles.document} ${styles.pdf}`}>
                                                <div className={styles.doc_svg_leftside}>
                                                    <>
                                                        {docsData[key].data[key2].data[key3].name.split('.')[1] === "docx" && <WordIcon/>}
                                                        {docsData[key].data[key2].data[key3].name.split('.')[1] === "pdf" && <PdfIcon/>}
                                                        {docsData[key].data[key2].data[key3].name.split('.')[1] === "xls" && <XlsIcon/>}
                                                        {docsData[key].data[key2].data[key3].name.split('.')[1] === "pptx" && <PptxIcon/>}
                                                    </>
                                                </div>
                                                <div className={styles.doc_svg_rightside}>
                                                    <div className={styles.doc_name}>
                                                        {docsData[key].data[key2].data[key3].name}
                                                    </div>
                                                    <div className={styles.doc_count}>
                                                        {docsData[key].data[key2].data[key3].size} kb
                                                    </div>
                                                </div>
                                                {this.props.userData && this.props.userData.roles[0].name !== 'client' && (
                                                    <div onClick={()=>this.deleteDocument(
                                                        id,
                                                        docsData[key].data[key2].data[key3].name,
                                                        key+'/'+key2
                                                    )} className={styles.trash}>
                                                        <TrashIcon/>
                                                    </div>
                                                )}
                                            </div>
                                        ):(
                                            <div onClick={()=>{
                                                this.handleClick(
                                                    this,
                                                    key3,
                                                    docsData[key].data[key2].data[key3].type,
                                                    docsData[key].data[key2].data[key3].name,
                                                    key+'/'+key2
                                                )
                                            }}  className={`${styles.document} ${styles.pdf}`}>
                                                <div className={styles.doc_svg_leftside}>
                                                    <FolderIcon/>
                                                </div>
                                                <div className={styles.doc_svg_rightside}>
                                                    <div className={styles.doc_name}>
                                                        {key3}
                                                    </div>
                                                    <div className={styles.doc_count}>
                                                        {docsData[key].data[key2].data[key3].count} файлов
                                                    </div>
                                                </div>
                                                {this.props.userData && this.props.userData.roles[0].name !== 'client' && (
                                                    <div onClick={()=>{
                                                        console.log('123')
                                                        console.log(docsData[key].data[key2].data[key3].type);
                                                        this.deleteDocument(
                                                            id,
                                                            docsData[key].data[key2].data[key3].name,
                                                            key+'/'+key2,
                                                            docsData[key].data[key2].data[key3].type,
                                                            key3
                                                        )
                                                    }} className={styles.trash}>
                                                        <TrashIcon/>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </>
                                ))}
                            </>
                        ))}
                    </>
                ))}
                </>
        )
    }
};

export default MoreDocumentItem;