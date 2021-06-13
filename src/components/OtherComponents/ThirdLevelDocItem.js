import React, {Component} from "react";
import styles from "../../assets/styles/Personal.module.css";
import {ReactComponent as WordIcon} from "../../assets/icons/word.svg";
import {ReactComponent as PdfIcon} from "../../assets/icons/pdf.svg";
import {ReactComponent as XlsIcon} from "../../assets/icons/xls.svg";
import {ReactComponent as PptxIcon} from "../../assets/icons/pptx.svg";
import {ReactComponent as TrashIcon} from "../../assets/icons/trashIcon.svg";
import axios from "../../plugins/axios";
import _ from "lodash";
import {ReactComponent as PngIcon} from "../../assets/icons/png.svg";
import {ReactComponent as JpgIcon} from "../../assets/icons/jpg.svg";
import {ReactComponent as GifIcon} from "../../assets/icons/gif.svg";

class ThirdLevelDocItem extends Component {

    doClick(e) {
        this.clickedOnce = undefined;
        console.log('single click');
    }

    handleClick(e,key4,type,file,key) {
        console.log('qwe');
        if (!this._delayedClick) {
            this._delayedClick = _.debounce(this.doClick, 500);
        }
        if (this.clickedOnce) {
            this._delayedClick.cancel();
            this.clickedOnce = false;
            console.log('double click');
            if (type === 'folder'){
                this.props.history.push(this.props.location.pathname+'/more/'+key4);
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

    deleteDocument(id,file,key){
        if (this.props.location.pathname.includes('/admin/settings')){
            axios.delete(`/docs/templates/delete-file?link=${key}/${file}`,{
                params:{
                    link:key+'/'+file
                }
            }).then(res=>{
                this.props.setDocs(res.data);
            })
        }else{
            axios.delete(`/docs/delete-file/${id}`, {headers:{},data:{link:key+'/'+file}}).then(res=>{
                this.props.setDocs(res.data);
            })
        }
    };
    render() {
        const {docsData,id,name2} = this.props;
        return (
            <>
                {Object.keys(docsData).map((key, index) => (
                    <>
                        {docsData[key].data && Object.keys(docsData[key].data).map((key2, index) => (
                            <>
                                {docsData[key].data[key2].data &&
                                docsData[key].data[key2].data && Object.keys(docsData[key].data[key2].data).map((key3, index) => (
                                    <>
                                        {name2 == key3 && docsData[key].data[key2].data[key3].data && Object.keys(docsData[key].data[key2].data[key3].data)?.map((key4, index) => (
                                            <div
                                                onClick={(e) => {
                                                    // this.handleClicked(
                                                    //     this,
                                                    //     key3,
                                                    //     docsData[key].data[key2].data[key3].data[key4].type,
                                                    //     docsData[key].data[key2].data[key3].name,
                                                    //     key + '/' + key2 + '/' + key3
                                                    // )
                                                    this.handleClick(
                                                        this,
                                                        key4,
                                                        docsData[key].data[key2].data[key3].data[key4].type,
                                                        docsData[key].data[key2].data[key3].data[key4].name,
                                                        key + '/' + key2 + '/' + key3
                                                    )
                                                }
                                                }
                                                className={`${styles.document} ${styles.pdf}`}>
                                                <div className={styles.doc_svg_leftside}>
                                                    <>
                                                        {docsData[key].data[key2].data[key3].data[key4].name.substring(docsData[key].data[key2].data[key3].data[key4].name.length-5).includes('docx') && (
                                                        <WordIcon/>
                                                    )}
                                                        {docsData[key].data[key2].data[key3].data[key4].name.substring(docsData[key].data[key2].data[key3].data[key4].name.length-5).includes('pdf') && (
                                                            <PdfIcon/>
                                                        )}
                                                        {docsData[key].data[key2].data[key3].data[key4].name.substring(docsData[key].data[key2].data[key3].data[key4].name.length-5).includes('xls') && (
                                                            <XlsIcon/>
                                                        )}
                                                        {docsData[key].data[key2].data[key3].data[key4].name.substring(docsData[key].data[key2].data[key3].data[key4].name.length-5).includes('pptx') && (
                                                            <PptxIcon/>
                                                        )}
                                                        {docsData[key].data[key2].data[key3].data[key4].name.substring(docsData[key].data[key2].data[key3].data[key4].name.length-5).includes('pdf') && (
                                                            <PdfIcon/>
                                                        )}
                                                        {docsData[key].data[key2].data[key3].data[key4].name.substring(docsData[key].data[key2].data[key3].data[key4].name.length-5).includes('png') && (
                                                            <PngIcon/>
                                                        )}
                                                        {docsData[key].data[key2].data[key3].data[key4].name.substring(docsData[key].data[key2].data[key3].data[key4].name.length-5).includes('jpg') && (
                                                            <JpgIcon/>
                                                        )}
                                                        {docsData[key].data[key2].data[key3].data[key4].name.substring(docsData[key].data[key2].data[key3].data[key4].name.length-5).includes('jpeg') && (
                                                            <JpgIcon/>
                                                        )}
                                                        {docsData[key].data[key2].data[key3].data[key4].name.substring(docsData[key].data[key2].data[key3].data[key4].name.length-5).includes('gif') && (
                                                            <GifIcon/>
                                                        )}
                                                    </>
                                                </div>
                                                <div className={styles.doc_svg_rightside}>
                                                    <div className={styles.doc_name}>
                                                        <>
                                                            {docsData[key].data[key2].data[key3].data[key4].name.length > 19 ? (
                                                                <>{docsData[key].data[key2].data[key3].data[key4].name.substring(0,16)+"..."}</>
                                                            ):(
                                                                <>{docsData[key].data[key2].data[key3].data[key4].name}</>
                                                            )}
                                                        </>
                                                    </div>
                                                    <div className={styles.doc_count}>
                                                        {docsData[key].data[key2].data[key3].data[key4].size} kb
                                                    </div>
                                                </div>
                                                {this.props.userData && this.props.userData.roles[0].name!=='client' && (
                                                    <div onClick={() => this.deleteDocument(
                                                        id,
                                                        docsData[key].data[key2].data[key3].data[key4].name,
                                                        key + '/' + key2 + '/' + key3
                                                    )} className={styles.trash}>
                                                        <TrashIcon/>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
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

export default ThirdLevelDocItem;