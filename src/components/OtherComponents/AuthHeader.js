import React from 'react'
import styles from '../../assets/styles/AuthStyles/AuthHeader.module.scss'
import Logo from '../../assets/icons/Logo.svg'

const AuthHeader = () => {
    return(
        <>
            <header className={styles.header_container}>
                <div className={styles.header}>
                    <img src={Logo} alt="logo"/>
                </div>
            </header>
        </>
    )
};

export default AuthHeader;