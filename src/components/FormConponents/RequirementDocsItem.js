import React from "react";
import styles from "../../assets/styles/RequirementDocs.module.scss";
import CircularIndeterminate from "./ProgressCircle";
import trashIcon from "../../assets/icons/trashIcon.svg";


const RequirementDocsItem = ({title,file,isPending,handleChange}) => {

    const hiddenFileInput = React.useRef(null);

    const handleClick = () => {
        hiddenFileInput.current.click();
    };


    return(
        <div className={styles.widjet}>
            <input
                type="file"
                ref={hiddenFileInput}
                onChange={(e)=>handleChange(file.type,e)}
                style={{display: 'none'}}/>
            <div className={styles.widjet_title}>
                {title}
            </div>
            {!isPending ? (
                <>
                    {file ? (
                        <div className={styles.download}>
                            {file.name}
                        </div>
                    ):(
                        <div onClick={handleClick} className={styles.download}>
                            Загрузить
                        </div>
                    )}
                </>
            ):(
                <>
                    <CircularIndeterminate/>
                </>
            )}
            <div  onClick={handleClick} className={styles.download} style={{position:"absolute",bottom:15,left:24}}>
                Изменить
            </div>
        </div>
    )
};

export default RequirementDocsItem;