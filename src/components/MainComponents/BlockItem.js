import React from "react";
import styles from "../../assets/styles/MainStyles/MainPage.module.scss";
import getMediaUrls from "../../tools/getMediaUrls";

const BlockItem = ({blockInfo}) => {
    return(
        <>
        <div className={styles.advert}>
            <div className={styles.block_1}>
                <img src={getMediaUrls(blockInfo.image)} alt="advert"/>
            </div>
            <div className={styles.block_2}>
                <div className={styles.block_title}>
                    {blockInfo.greeting}
                </div>
                <div className={styles.block_description}>
                    {blockInfo.description}
                </div>
                <div className={styles.block_btnContainer}>
                    <button onClick={()=>window.open(blockInfo.link,'_blank')} className={styles.block_btn}>
                        Перейти на сайт
                    </button>
                </div>
            </div>
        </div>
        <div className={styles.advert_mobile}>
            <div className={styles.block_2}>
                <div className={styles.block_title}>
                    {blockInfo.greeting}
                </div>
                <div className={styles.block_description}>
                    {blockInfo.description}
                </div>
                <div className={styles.block_btnContainer}>
                    <button className={styles.block_btn}>
                        Перейти на сайт
                    </button>
                </div>
            </div>
            <div style={{marginTop: '32px'}} className={styles.block_1}>
                <img src={getMediaUrls(blockInfo.image)} alt="advert"/>
            </div>
        </div>
        </>
    )
};

export default BlockItem