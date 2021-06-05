import React from "react";
import PropTypes, {bool} from 'prop-types';
import styles from "../../assets/styles/OtherStyles/SaveBtn.module.scss";

const SaveBtn = ({ title = "",disabled=false,save=null,backgroundColor="#FF494D",color="#FFFFFF"}) => {
    return(
        <>
            <div onClick={()=>{
                if (save){
                    save();
                }
            }} style={disabled ? {backgroundColor:backgroundColor, color:color,opacity:'.6'} : {backgroundColor:backgroundColor,color:color}} className={styles.saveBtn}>
                { title }
            </div>
        </>
    )
};

SaveBtn.propTypes = {
    title : PropTypes.string
};

export default SaveBtn